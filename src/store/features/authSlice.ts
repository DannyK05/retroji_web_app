import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TAuthState, TToken, TUser } from "../types/auth";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../lib/storage";
import { RETROJI_TOKENS, RETROJI_USER } from "../../lib/constants";

const storedUser = getFromLocalStorage(RETROJI_USER);
const storedToken = getFromLocalStorage(RETROJI_TOKENS);

const initialState: TAuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  tokens: storedToken ? JSON.parse(storedToken) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      {
        payload: { user, tokens },
      }: PayloadAction<{ user: TUser; tokens: TToken }>,
    ) {
      state.user = user;
      state.tokens = tokens;
      setToLocalStorage(RETROJI_USER, JSON.stringify(user));
      setToLocalStorage(RETROJI_TOKENS, JSON.stringify(tokens));
    },
    removeCredentials(state) {
      state.user = null;
      state.tokens = null;
      removeFromLocalStorage(RETROJI_USER);
      removeFromLocalStorage(RETROJI_TOKENS);
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
