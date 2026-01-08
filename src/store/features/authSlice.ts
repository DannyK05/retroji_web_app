import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TAuthState, TUser } from "../types/auth";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../../lib/storage";
import { RETROJI_USER } from "../../lib/constants";

const initialState: TAuthState = getFromLocalStorage(RETROJI_USER)
  ? JSON.parse(getFromLocalStorage(RETROJI_USER) ?? "{}")
  : null;
 
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      { payload: { user } }: PayloadAction<{ user: TUser }>
    ) {
      state.user = user;
      setToLocalStorage(RETROJI_USER, JSON.stringify(user));
    },
    removeCredentials(
      state
    ) {
      state.user = null;
      removeFromLocalStorage(RETROJI_USER);
    },
  },
});

export const {setCredentials, removeCredentials} = authSlice.actions
export default authSlice.reducer;