import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type { TSearchResponse } from "../types/search";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    search: builder.query<TSearchResponse, string>({
      query: (query) => ({
        url: `/search/?q=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;
