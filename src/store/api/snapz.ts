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

export const snapzApi = createApi({
  reducerPath: "snapzApi",
  baseQuery: baseQuery,
  tagTypes: ["getAllSnapz", "getAllComments"],
  endpoints: (builder) => ({
    getAllSnapz: builder.query<TGetAllSnapzResponse, void>({
      query: () => ({
        url: "snapz/",
        method: "GET",
      }),
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
    getAllCommentsBySnapzId: builder.query<
      TGetAllCommentsBySnapzIdResponse,
      TGetAllCommentsBySnapzIdDto
    >({
      query: ({ snapz_id }) => ({
        url: `snapz/${snapz_id}/comments/`,
        method: "GET",
      }),
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
  useGetAllSnapzQuery,
  useGetAllCommentsBySnapzIdQuery,
  useGetSnapzByIdQuery,
  usePostCommentMutation,
  useLikeSnapzMutation,
  usePostSnapzMutation,
  useDeleteSnapzMutation,
  useDeleteCommentMutation,
} = snapzApi;
