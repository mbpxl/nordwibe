import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_DOMAIN = "https://3133319-bo35045.twc1.net/media/";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({baseUrl: API_BASE}),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: () => "stories/",
    }),
    getStoryById: builder.query({
      query: (storyId) => `stories/${storyId}`,
    }),
  }),
});

export const { useGetStoriesQuery, useGetStoryByIdQuery } = storiesApi;