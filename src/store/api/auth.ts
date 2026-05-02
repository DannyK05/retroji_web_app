import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import type {
  TDeleteUserResponse,
  TIsUsernameTakenResponse,
  TLoginDto,
  TLoginResponse,
  TLogoutDto,
  TLogoutResponse,
  TSignupDto,
  TSignupResponse,
} from "../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<TSignupResponse, TSignupDto>({
      query: (payload) => ({
        url: "/auth/register/",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation<TLoginResponse, TLoginDto>({
      query: (payload) => ({
        url: "/auth/login/",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation<TLogoutResponse, TLogoutDto>({
      query: (payload) => ({
        url: "/auth/logout/",
        method: "POST",
        body: payload,
      }),
    }),
    isUsernameTaken: builder.query<boolean, string>({
      query: (username) => ({
        url: `/auth/username/${username}`,
        method: "GET",
      }),
      transformResponse: (response: TIsUsernameTakenResponse) =>
        response.data.is_taken,
    }),
    deleteUser: builder.mutation<TDeleteUserResponse, void>({
      query: (body) => ({
        url: "auth/delete/",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useIsUsernameTakenQuery,
  useDeleteUserMutation,
} = authApi;
