import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";
const authDetails = process.env.REACT_APP_AUTH_DETAILS||"";

export const flatsApi = createApi({
  reducerPath: "getMyFlatsSukaBlyat",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    // Метод для получения списка квартир (если он уже есть)
    getFlats: builder.query({
      query: () => `house/`,
    }),
    // Новый метод для получения квартиры по ID
    getFlatById: builder.query({
      query: (house_id: any) => ({
        url: `house/${house_id}`,
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { useGetFlatsQuery, useGetFlatByIdQuery } = flatsApi;