import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const glyphfindApi = createApi({
  reducerPath: "glyphfindApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://glyphwiki.org/api/",
  }),
  endpoints: (builder) => ({
    getRelatedGlyphsByCode: builder.query<{ related_glyphs?:string}, string>({
      query: (code) => `related?code=${code}`,
    }),
  }),
});

export const { useGetRelatedGlyphsByCodeQuery  } = glyphfindApi;
