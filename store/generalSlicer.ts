import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  CharacterGlyphData,
  GlyphData,
  GlyphWikiGlyphResponse,
  TextData,
} from "@/types";
import { getGlyphWikiPngUrl, getGlyphWikiSvgUrl, getUnicodeFromCharacter } from "@/lib/glyphs";

export interface generalState {
  search: string;
  selctedCharacter: string;
  selctedGlyph: string;
  glyphWikiData: string;
  glyphData: GlyphData;
  selectedGlyphDataIndex: number;
  selectedTextDataIndex: number;
  textData: TextData;
  stepState: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
}

const initialState: generalState = {
  search: "",
  selctedCharacter: "",
  selctedGlyph: "",
  glyphWikiData: "",
  glyphData: [],
  selectedGlyphDataIndex: 0,
  selectedTextDataIndex: 0,
  textData: [],
  stepState: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  },
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

    setGlyphDataIndex: (state, action: PayloadAction<number>) => {
      state.selectedGlyphDataIndex = action.payload;
    },
    setTextDataIndex: (state, action: PayloadAction<number>) => {
      state.selectedTextDataIndex = action.payload;
    },
    addCharacter: (state) => {
      const payload: CharacterGlyphData = {
        character: state.selctedCharacter,
        unicode: getUnicodeFromCharacter(state.selctedCharacter),
        glyphwiki_name: state.selctedGlyph,
        glyphwiki_svg: getGlyphWikiSvgUrl(state.selctedGlyph),
        glyphwiki_png: getGlyphWikiPngUrl(state.selctedGlyph),
        glyphwiki_data: state.glyphWikiData,
        kage_data: "",
      };
      state.glyphData.splice(state.selectedGlyphDataIndex, 0, payload);
      state.selectedGlyphDataIndex++;
    },
    removeCharacter: (state) => {
      state.glyphData.splice(state.selectedGlyphDataIndex, 1);
      state.selectedGlyphDataIndex--;
    },

    setGlyphData: (state, action: PayloadAction<GlyphData>) => {
      state.glyphData = action.payload;
      state.selectedGlyphDataIndex = action.payload.length;
      state.stepState.step2 = true;
    },

    clearGlyphData: (state) => {
      state.glyphData = [];
      state.selectedGlyphDataIndex = 0;
    },
    setTextData: (state, action: PayloadAction<string>) => {
      state.textData = Array.from(action.payload).map((character, index) => {
        return {
          index: index,
          character: character,
        };
      });
      state.stepState.step1 = true;
    },
    // TODO: need to refactor this
    setStepPreview: (state, action: PayloadAction<boolean>) => {
      state.stepState.step3 = action.payload;
    },
    updateGlyph(state, action: PayloadAction<string>) {
      // update selected glyph by index
      state.glyphData[state.selectedTextDataIndex].glyphwiki_name =
        action.payload;
      state.glyphData[state.selectedTextDataIndex].glyphwiki_svg = getGlyphWikiSvgUrl(
        action.payload
      );
      state.glyphData[state.selectedTextDataIndex].glyphwiki_png = getGlyphWikiPngUrl(
        action.payload
      );

      // get glyphwiki data
      // state.glyphData[state.selectedGlyphDataIndex].glyphwiki_data = "";      
        
    },
  },
});

export const {
  setIdsSearchTerm,
  setCharacter,
  setGlyphName,
  setGlyphWikiData,
  setGlyphDataIndex,
  setTextDataIndex,
  addCharacter,
  removeCharacter,
  setGlyphData,
  clearGlyphData,
  setTextData,
  setStepPreview,
  updateGlyph,
} = generalSlice.actions;

export default generalSlice.reducer;
