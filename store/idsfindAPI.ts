import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const idsfindApi = createApi({
  reducerPath: "idsfindApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  // tagTypes: ["idsTerm"],
  endpoints: (builder) => ({
    getCharacterByIds: builder.query<string[], string>({
      query: (term) => `idsfind?term=${term}`,
    })
  }),
});

export const { useGetCharacterByIdsQuery } = idsfindApi;
