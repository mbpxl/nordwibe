import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/slices/user";
import navigationSlice from "@/store/slices/navigation";
import filtersSlice from "@/store/slices/filters";
import { usrApi } from "@/service/userApi.service";
import { hApi } from "@/service/houseApi.service";
import authSlice from "@/store/slices/auth"
import { authApi } from "@/service/auth.service";
import { chatApi } from "@/service/chat.service";

const reducer = combineReducers({
  userSlice,
  navigationSlice,
  filtersSlice,
  [usrApi.reducerPath]: usrApi.reducer,
  [hApi.reducerPath]:hApi.reducer,
  authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usrApi.middleware).concat(hApi.middleware).concat(authApi.middleware).concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
