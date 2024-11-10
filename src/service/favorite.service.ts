import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const authDetails = process.env.REACT_APP_AUTH_DETAILS||""

const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).authSlice.token;
    //   if (token) {
    //     headers.set("authorization", `Basic ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    addHouseToFavorite: builder.mutation({
      query: (house_id: any) => ({
        url: `add_favorite_house/${house_id}/`,
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
        body: house_id,
      })
    }),
    removeFavoriteHouse: builder.mutation({
      query: (house_id: any) => ({
        url: `remove_favorite_house/${house_id}/`,
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
        body: house_id,
      })
    }),
    addPostToFavorite: builder.mutation({
      query: (post_id: any) => ({
        url: `add_favorite_post/${post_id}/`,
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
        body: post_id,
      })
    })
  })
})

export const { useAddHouseToFavoriteMutation, useRemoveFavoriteHouseMutation, useAddPostToFavoriteMutation } = favoriteApi;