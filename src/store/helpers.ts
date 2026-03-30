import { RootState } from "./index";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const backendUrl = import.meta.env.VITE_TEST_BACKEND_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens?.access;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export { baseQuery };
