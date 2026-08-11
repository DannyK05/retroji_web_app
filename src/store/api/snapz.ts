import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TDeleteCommentDto,
  TDeleteCommentResponse,
  TDeleteSnapzDto,
  TDeleteSnapzResponse,
  TGetAllCommentsBySnapzIdDto,
  TGetAllCommentsBySnapzIdResponse,
  TGetAllSnapzResponse,
  TGetSnapzByIdDto,
  TLikeSnapzDto,
  TLikeSnapzResponse,
  TPostCommentDto,
  TPostCommentResponse,
  TPostSnapzResponse,
} from "../types/snapz";
import type { TPaginationParams } from "../types/generic";

export const snapzApi = createApi({
  reducerPath: "snapzApi",
  baseQuery: baseQuery,
  tagTypes: ["getAllSnapz", "getAllComments"],
  endpoints: (builder) => ({
    getAllSnapz: builder.infiniteQuery<
      TGetAllSnapzResponse["data"],
      void,
      TPaginationParams["page"]
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        maxPages: 3,
        getNextPageParam(
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
          _queryArg,
        ) {
          if (lastPage.next !== null && lastPageParam) {
            return lastPageParam + 1;
          }
        },
      },
      query: ({ pageParam }) => `snapz/?page=${pageParam}`,
      transformResponse: (response: TGetAllSnapzResponse) => response.data,
      providesTags: ["getAllSnapz"],
    }),
    postSnapz: builder.mutation<TPostSnapzResponse, FormData>({
      query: (body) => ({
        url: "snapz/post/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllSnapz"],
    }),
    getSnapzById: builder.query<TGetAllSnapzResponse, TGetSnapzByIdDto>({
      query: ({ snapz_id }) => ({
        url: `snapz/${snapz_id}`,
        method: "GET",
      }),
    }),
    getAllCommentsBySnapzId: builder.infiniteQuery<
      TGetAllCommentsBySnapzIdResponse["data"],
      TGetAllCommentsBySnapzIdDto,
      TPaginationParams["page"]
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        maxPages: 3,
        getNextPageParam(
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
          _queryArg,
        ) {
          if (lastPage.next !== null && lastPageParam) {
            return lastPageParam + 1;
          }
        },
      },
      query: ({ queryArg, pageParam }) =>
        `snapz/${queryArg.snapz_id}/comments/?page=${pageParam}`,
      transformResponse: (response: TGetAllCommentsBySnapzIdResponse) =>
        response.data,
      providesTags: ["getAllComments"],
    }),
    postComment: builder.mutation<TPostCommentResponse, TPostCommentDto>({
      query: (body) => ({
        url: "snapz/comment/post/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllComments", "getAllSnapz"],
    }),
    likeSnapz: builder.mutation<TLikeSnapzResponse, TLikeSnapzDto>({
      query: (body) => ({
        url: "snapz/like/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllSnapz"],
    }),
    deleteSnapz: builder.mutation<TDeleteSnapzResponse, TDeleteSnapzDto>({
      query: (body) => ({
        url: "snapz/delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["getAllSnapz"],
    }),
    deleteComment: builder.mutation<TDeleteCommentResponse, TDeleteCommentDto>({
      query: (body) => ({
        url: "snapz/comment/delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["getAllComments"],
    }),
  }),
});

export const {
  useGetAllSnapzInfiniteQuery,
  useGetAllCommentsBySnapzIdInfiniteQuery,
  useGetSnapzByIdQuery,
  usePostCommentMutation,
  useLikeSnapzMutation,
  usePostSnapzMutation,
  useDeleteSnapzMutation,
  useDeleteCommentMutation,
} = snapzApi;
