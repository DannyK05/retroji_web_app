import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TFollowUserDto,
  TProfileResponse,
  TUpdateUserProfileDto,
} from "../types/profile";

export const profileApi = createApi({
  reducerPath: "profileApi",
  tagTypes: ["getUserProfile"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserProfile: builder.query<TProfileResponse, string>({
      query: (user_id) => ({ url: `/profile/${user_id}/`, method: "GET" }),
      providesTags: ["getUserProfile"],
    }),
    updateUserProfile: builder.mutation<
      TProfileResponse,
      TUpdateUserProfileDto
    >({
      query: (payload) => ({
        url: `/profile/update/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["getUserProfile"],
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
} = profileApi;
