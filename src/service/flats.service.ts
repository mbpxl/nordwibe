import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";
const authDetails = process.env.REACT_APP_AUTH_DETAILS||"";

export const flatsApi = createApi({
  reducerPath: "flatsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    // Метод для получения списка квартир (если он уже есть)
    getFlats: builder.query({
      query: () => `house/`,
    }),
    // Новый метод для получения квартиры по ID
    getFlatById: builder.query({
      query: (house_id: string) => ({
        url: `house/${house_id}/`,
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
      }),
    }),
  }),
});

export const { useGetFlatsQuery, useGetFlatByIdQuery } = flatsApi;