import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TAuthState, TUser } from "../types/auth";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../lib/storage";
import { RETROJI_USER } from "../../lib/constants";

const storedUser = getFromLocalStorage(RETROJI_USER);

const initialState: TAuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      { payload}: PayloadAction<TUser>
    ) {
      state.user = payload;
      setToLocalStorage(RETROJI_USER, JSON.stringify(payload));
    },
    removeCredentials(state) {
      state.user = null;
      removeFromLocalStorage(RETROJI_USER);
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
