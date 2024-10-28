import { IRealUserMe } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";
import { Cookie } from "next/font/google";
import { serialize } from "v8";

export type AuthState = {
  user: IRealUserMe | null | string;
  token: string | null;
  cookie: string | null;
  isAuth: boolean;
};



const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, cookie: null, isAuth: false } as AuthState,
  reducers: {
    setAuth: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: IRealUserMe | null | string; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      state.isAuth = !!user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.cookie = null;
      state.isAuth = false;
    },
    login: (
      state,
      { payload: { cookie } }: PayloadAction<{ cookie: string }>
    ) => {
      state.cookie = cookie;
      state.isAuth = true;
    },
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
