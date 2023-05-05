import axios from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface GlyphWikiGlyphResponse {
  name: string | null;
  related: string;
  version: number | null;
  data: string | null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
