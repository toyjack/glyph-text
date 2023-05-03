import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GlyphWikiGlyphData {
  data:string,
  name:string,
  version:number,
  related:string
}

export const glyphDataApi = createApi({
  reducerPath: "glyphDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://glyphwiki.org/api/",
  }),
  endpoints: (builder) => ({
    getGlyphData: builder.query<GlyphWikiGlyphData, string>({
      query: (glyphName) => `glyph?name=${glyphName}`,
    }),
  }),
});

export const { useGetGlyphDataQuery } = glyphDataApi;
