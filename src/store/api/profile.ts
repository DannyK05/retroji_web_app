import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TFollowUserDto,
  TGetUserCommentsResponse,
  TGetUserProfileResponse,
  TGetUserScoopsResponse,
  TGetUserSnapzResponse,
} from "../types/profile";

export const profileApi = createApi({
  reducerPath: "profileApi",
  tagTypes: ["getUserProfile"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserProfile: builder.query<TGetUserProfileResponse, string>({
      query: (user_id) => ({ url: `/profile/${user_id}/`, method: "GET" }),
      providesTags: ["getUserProfile"],
    }),

    updateUserProfile: builder.mutation<TGetUserProfileResponse, FormData>({
      query: (payload) => ({
        url: `/profile/update/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["getUserProfile"],
    }),

    getUserSnapz: builder.query<TGetUserSnapzResponse, number>({
      query: (user_id) => ({
        url: `/profile/snapz/${user_id}/`,
        method: "GET",
      }),
    }),

    getUserScoops: builder.query<TGetUserScoopsResponse, number>({
      query: (user_id) => ({
        url: `/profile/scoops/${user_id}/`,
        method: "GET",
      }),
    }),

    getUserComments: builder.query<TGetUserCommentsResponse, number>({
      query: (user_id) => ({
        url: `/profile/comments/${user_id}/`,
        method: "GET",
      }),
    }),

    followUser: builder.mutation<void, TFollowUserDto>({
      query: (payload) => ({
        url: `/profile/follow/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getUserProfile"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useFollowUserMutation,
  useGetUserSnapzQuery,
  useGetUserScoopsQuery,
  useGetUserCommentsQuery,
} = profileApi;
