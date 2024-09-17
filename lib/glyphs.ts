import { GlyphWikiGlyphResponse } from "@/types";

// TODO: converter of kage to svg
export interface Kage {
  name: string;
  related?: string;
  data: string;
}

export async function getGlyph(glyphName: string) :Promise<Kage>{
  const res = await fetch(`https://glyphwiki.org/api/glyph?name=${glyphName}`);
  const json=  await res.json() as GlyphWikiGlyphResponse;
  return {
    name: json.name||'',
    related: json.related||'',
    data: json.data||'',
  }
}

export async function getBuhinMap(glyphName: string,  buhinMap:Map<string, string> = new Map()) {
  const glyph = await getGlyph(glyphName);
  if (glyph && glyph.data && glyph.name) {
    buhinMap.set(glyph.name, glyph.data);
    const temp = glyph.data.split('$');
    for (const polygon of temp) {
      if (polygon.startsWith('99')) {
        const childName = polygon.split(':')[7];
        await getBuhinMap(childName, buhinMap);
      }
    }
    return buhinMap;
  }
  return new Map();
}


export function getUnicodeFromCharacter(character: string) {
  return `U+${character.codePointAt(0)?.toString(16).toUpperCase() ?? ""}`;
}

export function getGlyphWikiNameByCharacter(character: string) {
  return `u${character.codePointAt(0)?.toString(16).toLowerCase() ?? ""}`;
}

export function getGlyphWikiSvgUrl(name: string) {
  return `https://glyphwiki.org/glyph/${name}.svg`;
}

export function getGlyphWikiPngUrl(name: string) {
  return `https://glyphwiki.org/glyph/${name}.png`;
}