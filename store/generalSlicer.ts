import {
  getGlyphWikiDataByGlyphName,
  getGlyphWikiPngUrl,
  getGlyphWikiSvgUrl,
  getUnicodeFromCharacter,
} from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CharacterData {
  character: string;
  unicode: string;
  glyphwiki_name: string;
  glyphwiki_svg: string;
  glyphwiki_png: string;
  glyphwiki_data: string;
  kage_data: string;
}

export interface GlyphWikiGlyphResponse {
  name: string | null;
  related: string;
  version: number | null;
  data: string | null;
}

export interface IdsSearchState {
  search: string;
  selctedCharacter: string;
  selctedGlyph: string;
  glyphWikiData: string;
  codeData: CharacterData[];
  selectedIndex: number;
}

const initialState: IdsSearchState = {
  search: "",
  selctedCharacter: "",
  selctedGlyph: "",
  glyphWikiData: "",
  codeData: [],
  selectedIndex: 0,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIdsSearchTerm: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCharacter: (state, action: PayloadAction<string>) => {
      state.selctedCharacter = action.payload;
    },
    setGlyphName: (state, action: PayloadAction<string>) => {
      state.selctedGlyph = action.payload;
    },

    setGlyphWikiData: (
      state,
      action: PayloadAction<GlyphWikiGlyphResponse>
    ) => {
      if (action.payload.data) {
        state.glyphWikiData = action.payload.data;
      } else {
        state.glyphWikiData = "";
      }
    },

    setIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    addCharacter: (state) => {
      const payload: CharacterData = {
        character: state.selctedCharacter,
        unicode: getUnicodeFromCharacter(state.selctedCharacter),
        glyphwiki_name: state.selctedGlyph,
        glyphwiki_svg: getGlyphWikiSvgUrl(state.selctedGlyph),
        glyphwiki_png: getGlyphWikiPngUrl(state.selctedGlyph),
        glyphwiki_data: state.glyphWikiData,
        kage_data: "",
      };
      state.codeData.splice(state.selectedIndex, 0, payload);
      state.selectedIndex++;
    },
    removeCharacter: (state) => {
      state.codeData.splice(state.selectedIndex, 1);
      state.selectedIndex--;
    },

    importCodeData: (state, action: PayloadAction<CharacterData[]>) => {
      state.codeData = action.payload;
      state.selectedIndex = action.payload.length ;
    },

    clearCodeData: (state) => {
      state.codeData = [];
      state.selectedIndex = 0;
    }
  },
});

export const {
  setIdsSearchTerm,
  setCharacter,
  setGlyphName,
  setGlyphWikiData,
  setIndex,
  addCharacter,
  removeCharacter,
  importCodeData,
  clearCodeData,
} = generalSlice.actions;

export default generalSlice.reducer;
