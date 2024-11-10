import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts/',
    }),
    getPostById: builder.query({
      query: (id: string) => `posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;