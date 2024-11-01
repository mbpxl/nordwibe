import { storiesApi } from "@/service/stories.service";
import { AppDispatch, RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export const storiesSlice = createSlice({
  name: "stories slice",
  initialState: {
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStories(state, { payload }) {
      state.stories = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  }
});

export const { setStories, setLoading, setError } = storiesSlice.actions;

export const selectStories = (state: RootState) => state.stories.stories;
export const selectLoading = (state: RootState) => state.stories.loading;
export const selectError = (state: RootState) => state.stories.error;

export default storiesSlice.reducer;