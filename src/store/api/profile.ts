import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TFollowUserDto,
  TGetUserCommentsResponse,
  TGetUserProfileResponse,
  TGetUserScoopsResponse,
  TGetUserSnapzResponse,
} from "../types/profile";
import type { TPaginationParams } from "../types/generic";

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

    getUserSnapz: builder.infiniteQuery<
      TGetUserSnapzResponse["data"],
      number,
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
        `/profile/snapz/${queryArg}/?page=${pageParam}`,
      transformResponse: (response: TGetUserSnapzResponse) => response.data,
    }),

    getUserScoops: builder.infiniteQuery<
      TGetUserScoopsResponse["data"],
      number,
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
        `/profile/scoops/${queryArg}/?page=${pageParam}`,
      transformResponse: (response: TGetUserScoopsResponse) => response.data,
    }),

    getUserComments: builder.infiniteQuery<
      TGetUserCommentsResponse["data"],
      number,
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
        `/profile/scoops/${queryArg}/?page=${pageParam}`,
      transformResponse: (response: TGetUserCommentsResponse) => response.data,
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
  useGetUserSnapzInfiniteQuery,
  useGetUserScoopsInfiniteQuery,
  useGetUserCommentsInfiniteQuery,
} = profileApi;
