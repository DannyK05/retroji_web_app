import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./api/auth";
import { snapzApi } from "./api/snapz";
import { scoopsApi } from "./api/scoops";
import { profileApi } from "./api/profile";
import { searchApi } from "./api/search";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [snapzApi.reducerPath]: snapzApi.reducer,
    [scoopsApi.reducerPath]: scoopsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
     [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      snapzApi.middleware,
      scoopsApi.middleware,
      profileApi.middleware,
      searchApi.middleware,
    );
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
