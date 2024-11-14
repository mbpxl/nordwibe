import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/slices/user";
import navigationSlice from "@/store/slices/navigation";
import filtersSlice from "@/store/slices/filters";
import { usrApi } from "@/service/userApi.service";
import { hApi } from "@/service/houseApi.service";
import authSlice from "@/store/slices/auth"
import { authApi } from "@/service/auth.service";
import { chatApi } from "@/service/chat.service";
import { storiesSlice } from "./slices/stories";
import { storiesApi } from "@/service/stories.service";
import { favoriteApi } from "@/service/favorite.service";
import { postsApi } from "@/service/articles.service";
import { flatsApi } from "@/service/flats.service";

const reducer = combineReducers({
  userSlice,
  navigationSlice,
  filtersSlice,
  [usrApi.reducerPath]: usrApi.reducer,
  [hApi.reducerPath]:hApi.reducer,
  [storiesApi.reducerPath]: storiesApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [flatsApi.reducerPath]: flatsApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usrApi.middleware).concat(hApi.middleware).concat(authApi.middleware).concat(chatApi.middleware).concat(storiesApi.middleware).concat(favoriteApi.middleware).concat(postsApi.middleware).concat(flatsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
