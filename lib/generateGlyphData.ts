import { CharacterGlyphData, TextData } from "@/types";
import { store } from "@/store";
import { setGlyphData } from "@/store/generalSlicer";

export function callSetGlyphData() {
  const dispatch = store.dispatch;
  const textData = store.getState().general.textData;
  const glyphData = generateGlyphData(textData);
  dispatch(setGlyphData(glyphData));
};

export function generateGlyphData(textData: TextData) {
  const results = uniqStr(textData.map(item=> item.character))
    .filter((char) => {
      // skip \r and \n
      if (char === "\r" || char === "\n") {
        return false;
      } else {
        return true;
      }
    })
    .map((char) => {
      const code = char.codePointAt(0)?.toString(16) || "";

      return {
        character: char,
        unicode: "U+" + code.toUpperCase(),
        glyphwiki_name: "u" + code.toLowerCase(),
        glyphwiki_svg:
          "https://glyphwiki.org/glyph/" + "u" + code.toLowerCase() + ".svg",
        glyphwiki_png:
          "https://glyphwiki.org/glyph/" + "u" + code.toLowerCase() + ".png",
        glyphwiki_data: "",
        kage_data: "",
      } as CharacterGlyphData;
    });
  return results;
}

export function uniqStr(str: string[]) {
  return Array.from(new Set(str));
}
