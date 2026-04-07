import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TGetAllScoopsResponse,
  TLikeScoopsDto,
  TLikeScoopsResponse,
  TPostScoopsDto,
  TPostScoopsResponse,
} from "../types/scoops";

export const scoopsApi = createApi({
  reducerPath: "scoopsApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllScoops: builder.query<TGetAllScoopsResponse, void>({
      query: () => ({
        url: "/scoops/",
        method: "GET",
      }),
    }),
    getAllScoopsById: builder.query<TGetAllScoopsResponse, string>({
      query: (parent_id) => ({
        url: `/scoops/${parent_id}`,
        method: "GET",
      }),
    }),
    postScoops: builder.mutation<TPostScoopsResponse, TPostScoopsDto>({
      query: (payload) => ({
        url: `/scoops/post`,
        method: "POST",
        body: payload,
      }),
    }),
    likeScoops: builder.mutation<TLikeScoopsResponse, TLikeScoopsDto>({
      query: (payload) => ({
        url: `/scoops/like`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllScoopsQuery,
  useLazyGetAllScoopsByIdQuery,
  usePostScoopsMutation,
  useLikeScoopsMutation,
} = scoopsApi;
