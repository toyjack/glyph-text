import { CharacterGlyphData, GlyphWikiGlyphResponse, TextData } from "@/types";
import { store } from "@/store";
import { setGlyphData } from "@/store/generalSlicer";
import { GlyphLine, parseGlyphLine } from "./kageUtils/glyph";
import { decomposeDeep } from "./kageUtils/decompose";

export async function callSetGlyphData() {
  const dispatch = store.dispatch;
  const textData = store.getState().general.textData;
  const glyphData = await generateGlyphDataAsync(textData);
  dispatch(setGlyphData(glyphData));
}

export function uniqStr(str: string[]) {
  return Array.from(new Set(str));
}

export async function generateGlyphDataAsync(textData: TextData) {
  const filtered = uniqStr(textData.map((item) => item.character)).filter(
    (char) => {
      // skip \r and \n
      if (char === "\r" || char === "\n") {
        return false;
      } else {
        return true;
      }
    }
  );
  const results = await Promise.all(
    filtered.map(async (char) => {
      const code = char.codePointAt(0)?.toString(16) || "";
      const decomposedKage = await decompose("u" + code.toLowerCase());

      return {
        character: char,
        unicode: "U+" + code.toUpperCase(),
        glyphwiki_name: "u" + code.toLowerCase(),
        glyphwiki_svg:
          "https://glyphwiki.org/glyph/" + "u" + code.toLowerCase() + ".svg",
        glyphwiki_png:
          "https://glyphwiki.org/glyph/" + "u" + code.toLowerCase() + ".png",
        glyphwiki_data: "",
        kage_data: decomposedKage.join("$"),
      } as CharacterGlyphData;
    })
  );
  return results;
}

export interface Kage {
  name: string;
  related?: string;
  data: string;
}

export async function getGlyph(glyphName: string): Promise<Kage> {
  const res = await fetch(`https://glyphwiki.org/api/glyph?name=${glyphName}`);
  const json = (await res.json()) as GlyphWikiGlyphResponse;
  return {
    name: json.name || "",
    related: json.related || "",
    data: json.data || "",
  };
}

export async function getBuhinMap(
  glyphName: string,
  buhinMap: Map<string, string> = new Map()
) {
  const glyph = await getGlyph(glyphName);
  if (glyph && glyph.data && glyph.name) {
    buhinMap.set(glyph.name, glyph.data);
    const temp = glyph.data.split("$");
    for (const polygon of temp) {
      if (polygon.startsWith("99")) {
        const childName = polygon.split(":")[7];
        await getBuhinMap(childName, buhinMap);
      }
    }
    return buhinMap;
  }
  return new Map();
}

export async function decompose(glyphName: string) {
  const glyph = (await getGlyph(glyphName)).data;
  const buhinMap = await getBuhinMap(glyphName);

  const parsed: GlyphLine = parseGlyphLine(glyph);
  const decomposed = decomposeDeep(parsed, buhinMap);

  const decomposedKageData = decomposed.map((line) => line.value.join(":"));

  return decomposedKageData;
}
