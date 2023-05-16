import { decompose, decomposeDeep } from "@/lib/kageUtils/decompose";
import { GlyphLine, parseGlyphLine } from "@/lib/kageUtils/glyph";
import { GlyphWikiGlyphResponse } from "@/types";
import { NextResponse } from "next/server";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const glyphName = searchParams.get("glyphName")?.toLocaleLowerCase() || '';

  const glyph = (await getGlyph(glyphName)).data;
  const buhinMap = await getBuhinMap(glyphName);

  const parsed: GlyphLine = parseGlyphLine(glyph);
  const decomposed = decomposeDeep(parsed, buhinMap);

  const decomposedKageData = decomposed.map(line=> line.value.join(':'))

  console.log(decomposedKageData)
  return NextResponse.json({ decomposedKageData });
}
