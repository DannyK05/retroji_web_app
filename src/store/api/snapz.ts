import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TGetAllCommentsBySnapzIdData,
  TGetAllCommentsBySnapzIdResponse,
  TGetAllSnapzResponse,
  TGetSnapzByIdData,
  TLikeData,
  TLikeResponse,
  TPostCommentData,
  TPostCommentResponse,
  TPostSnapzData,
  TPostSnapzResponse,
} from "../types/snapz";

export const snapzApi = createApi({
  reducerPath: "snapzApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllSnapz: builder.query<TGetAllSnapzResponse, void>({
      query: () => ({
        url: "snapz/",
        method: "GET",
      }),
    }),
    postSnapz: builder.mutation<TPostSnapzResponse, TPostSnapzData>({
      query: (body) => ({
        url: "snapz/post/",
        method: "POST",
        body,
      }),
    }),
    getSnapzById: builder.query<TGetAllSnapzResponse, TGetSnapzByIdData>({
      query: ({ snapz_id }) => ({
        url: `snapz/uuid:${snapz_id}`,
        method: "GET",
      }),
    }),
    getAllCommentsBySnapzId: builder.query<
      TGetAllCommentsBySnapzIdResponse,
      TGetAllCommentsBySnapzIdData
    >({
      query: ({ snapz_id }) => ({
        url: `snapz/uuid:${snapz_id}/comments/`,
        method: "GET",
      }),
    }),
    postComment: builder.mutation<TPostCommentResponse, TPostCommentData>({
      query: (body) => ({
        url: "snapz/comment/post/",
        method: "POST",
        body,
      }),
    }),
    like: builder.mutation<TLikeResponse, TLikeData>({
      query: (body) => ({
        url: "snapz/like/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSnapzQuery,
  useGetAllCommentsBySnapzIdQuery,
  useGetSnapzByIdQuery,
  usePostCommentMutation,
  useLikeMutation,
  usePostSnapzMutation,
} = snapzApi;
