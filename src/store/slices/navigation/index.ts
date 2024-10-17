import { createSlice } from '@reduxjs/toolkit'

export type TMenu = "notifications" | "profile" | "flat" | "favourites" | null
export type TSearch = { flats: string, users: string, chats: string }

interface NavigationState {
  menu: TMenu,
  search: TSearch
}

const initialState: NavigationState = {
  menu: null,
  search: {
    flats: "",
    users: "",
    chats: ""
  }
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setMenu: (state, { payload }: { payload: TMenu }) => { state.menu = payload },
    setUsersSearch: (state, { payload }: { payload: string }) => { state.search.users = payload },
    setFlatsSearch: (state, { payload }: { payload: string }) => { state.search.flats = payload },
    setChatsSearch: (state, { payload }: { payload: string }) => { state.search.chats = payload }
  },
})

export const { setMenu, setFlatsSearch, setUsersSearch, setChatsSearch } = navigationSlice.actions

export default navigationSlice.reducer