import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const backendUrl = import.meta.env.VITE_RETROJI_BACKEND_URL;

const baseQuery = fetchBaseQuery({ baseUrl: backendUrl });

export { baseQuery };
