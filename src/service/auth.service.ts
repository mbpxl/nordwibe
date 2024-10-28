import { ICreateUser, IRealUserMe } from "@/interfaces/user.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegistrationRequest {
  user: ICreateUser;
}

export interface CaptchaRequest {
  username: string;
  captcha_token: string;
}

export interface CaptchaResponse {
  userSecret: string;
}


export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set("authorization", `Basic ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  reducerPath: "authApi",

  endpoints: (build) => ({
    login: build.query<LoginRequest, void>({
      query: () => ({
        url: "login/",
      }),
    }),
    registration: build.mutation<IRealUserMe, ICreateUser>({
      query: (credentials) => ({
        url: "users/",
        method: "POST",
        body: credentials,
      }),
    }),
    captcha: build.mutation<CaptchaResponse, CaptchaRequest>({
        query: (credentials) => ({
          url: "virify_captcha/",
          method: "POST",
          credentials:"include",
          body: credentials,
        }),
      }),
      
  }),

});

export const { useLoginQuery, useRegistrationMutation, useCaptchaMutation } = authApi;
