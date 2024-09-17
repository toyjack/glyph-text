import { getBuhinMap, getGlyph } from "@/lib/glyphs";
import { decompose, decomposeDeep } from "@/lib/kageUtils/decompose";
import { GlyphLine, parseGlyphLine } from "@/lib/kageUtils/glyph";
import { GlyphWikiGlyphResponse } from "@/types";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const glyphName = searchParams.get("glyphName")?.toLocaleLowerCase() || '';

  const glyph = (await getGlyph(glyphName)).data;
  const buhinMap = await getBuhinMap(glyphName);

  const parsed: GlyphLine = parseGlyphLine(glyph);
  const decomposed = decomposeDeep(parsed, buhinMap);

  const decomposedKageData = decomposed.map(line=> line.value.join(':'))

  return NextResponse.json({ decomposedKageData });
}
