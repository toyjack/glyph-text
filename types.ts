export interface GlyphWikiGlyphResponse {
  name: string | null;
  related: string;
  version: number | null;
  data: string | null;
}

export interface CharacterGlyphData {
  character: string;
  unicode: string;
  glyphwiki_name: string;
  glyphwiki_svg: string;
  glyphwiki_png: string;
  glyphwiki_data: string;
  kage_data: string;
}

export type GlyphData = CharacterGlyphData[];

export interface CharacterData {
  index: number;
  character: string;
}

export type TextData = CharacterData[];
