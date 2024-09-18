import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const glyphfindApi = createApi({
  reducerPath: "glyphfindApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://glyphwiki.org/api/",
  }),
  endpoints: (builder) => ({
    getRelatedGlyphsByCode: builder.query<{ related_glyphs?:string}, string>({
      query: (code) => {
        // remove first character of code with "u" to get related glyphs
        code = code.slice(1);
        return `related?code=${code}`
      },
    }),
  }),
});

export const { useGetRelatedGlyphsByCodeQuery  } = glyphfindApi;
