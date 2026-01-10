import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./api/auth";

export const store = configureStore({
  reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
