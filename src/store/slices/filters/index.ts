import { flats, maxFlatPrice, maxUsersAge } from '@/config'
import { createSlice } from '@reduxjs/toolkit'

export type TFrom = {
  from: number,
  to: number
}

export type TFlatsFilters = {
  price: TFrom
}

export type TNeighborsFilters = {
  age: TFrom
}

interface IFiltersState {
  flats: TFlatsFilters,
  neighbors: TNeighborsFilters
}

const initialState: IFiltersState = {
  flats: {
    price: {
      from: 0,
      to: maxFlatPrice
    }
  },
  neighbors: {
    age: {
      from: 0,
      to: maxUsersAge
    }
  }
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFlatsPrice: (state, { payload }: { payload: TFrom }) => { state.flats.price = payload },
    setNeighborsAge: (state, { payload }: { payload: TFrom }) => { state.neighbors.age = payload }
  },
})

export const { setFlatsPrice, setNeighborsAge } = filtersSlice.actions

export default filtersSlice.reducer