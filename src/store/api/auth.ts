import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helpers";
import { TSignupDto, TSignupResponse } from "../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<TSignupResponse, TSignupDto>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
