import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  index: number;
  sort: number;
  asc: number;
  paginationIndex: number;
  search: string;
}

const initialState: FilterState = { index: 0, sort: 0, asc: 0, paginationIndex: 0, search: '' };
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setSortIndex: (state, action: PayloadAction<number>) => {
      state.sort = action.payload;
    },
    setAcsIndex: (state, action: PayloadAction<number>) => {
      state.asc = action.payload;
    },
    setPaginationIndex: (state, action: PayloadAction<number>) => {
      state.paginationIndex = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.sort = Number(action.payload.sort);
      state.index = Number(action.payload.index);
      state.asc = Number(action.payload.asc);
    },
  },
});

export const {
  setActiveIndex,
  setSortIndex,
  setAcsIndex,
  setPaginationIndex,
  setSearch,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
