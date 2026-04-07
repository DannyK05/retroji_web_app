import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./api/auth";
import { snapzApi } from "./api/snapz";
import { scoopsApi } from "./api/scoops";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [snapzApi.reducerPath]: snapzApi.reducer,
    [scoopsApi.reducerPath]: scoopsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      snapzApi.middleware,
      scoopsApi.middleware,
    );
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
