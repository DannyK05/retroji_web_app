import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../helpers";

import type {
  TDeleteScoopsDto,
  TDeleteScoopsResponse,
  TGetAllScoopsResponse,
  TLikeScoopsDto,
  TLikeScoopsResponse,
  TPostScoopsDto,
  TPostScoopsResponse,
} from "../types/scoops";
import type { TPaginationParams } from "../types/generic";

export const scoopsApi = createApi({
  reducerPath: "scoopsApi",
  tagTypes: ["getAllScoops", "getAllScoopsById"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllScoops: builder.infiniteQuery<
      TGetAllScoopsResponse["data"],
      void,
      TPaginationParams["page"]
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        maxPages: 3,
        getNextPageParam: (
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
          _queryArg,
        ) => {
          if (lastPage.next !== null && lastPageParam) {
            return lastPageParam + 1;
          }
        },
      },
      query: ({ pageParam }) => `/scoops/?page=${pageParam}`,
      transformResponse: (data: TGetAllScoopsResponse) => data.data,
      providesTags: ["getAllScoops"],
    }),
    getAllScoopsById: builder.infiniteQuery<
      TGetAllScoopsResponse["data"],
      string,
      TPaginationParams["page"]
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        maxPages: 3,
        getNextPageParam: (
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
          _queryArg,
        ) => {
          if (lastPage.next !== null && lastPageParam) {
            return lastPageParam + 1;
          }
        },
      },
      query: ({ pageParam, queryArg }) =>
        `/scoops/${queryArg}/?page=${pageParam}`,
      transformResponse: (data: TGetAllScoopsResponse) => data.data,
      providesTags: ["getAllScoopsById"],
    }),
    postScoops: builder.mutation<TPostScoopsResponse, TPostScoopsDto>({
      query: (payload) => ({
        url: `/scoops/post/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllScoops", "getAllScoopsById"],
    }),
    likeScoops: builder.mutation<TLikeScoopsResponse, TLikeScoopsDto>({
      query: (payload) => ({
        url: `/scoops/like/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllScoops", "getAllScoopsById"],
    }),
    deleteScoops: builder.mutation<TDeleteScoopsResponse, TDeleteScoopsDto>({
      query: (body) => ({
        url: "scoops/delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["getAllScoops"],
    }),
  }),
});

export const {
  useGetAllScoopsInfiniteQuery,
  useGetAllScoopsByIdInfiniteQuery,
  usePostScoopsMutation,
  useLikeScoopsMutation,
  useDeleteScoopsMutation,
} = scoopsApi;
