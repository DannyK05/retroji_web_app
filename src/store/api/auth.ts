import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import {
  TLoginDto,
  TLoginResponse,
  TSignupDto,
  TSignupResponse,
} from "../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<TSignupResponse["data"], TSignupDto>({
      query: (payload) => ({
        url: "/auth/register/",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: TSignupResponse) => response.data,
    }),
    login: builder.mutation<TLoginResponse["data"], TLoginDto>({
      query: (payload) => ({
        url: "/auth/login/",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: TLoginResponse) => response.data,
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;
