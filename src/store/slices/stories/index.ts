// storiesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store"; // Убедитесь, что путь правильный

interface StoriesState {
  stories: any[]; // Замените any на ваш тип, если необходимо
  loading: boolean;
  error: string | null;
}

const initialState: StoriesState = {
  stories: [],
  loading: false,
  error: null,
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
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
  },
});

export const { setStories, setLoading, setError } = storiesSlice.actions;

// Селекторы
export const selectStories = (state: RootState) => state.stories.stories;
export const selectLoading = (state: RootState) => state.stories.loading;
export const selectError = (state: RootState) => state.stories.error;

export default storiesSlice.reducer;
