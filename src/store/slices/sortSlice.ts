import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortKey } from '../../components/FilmTable';
import type { RootState } from '../../store';

interface SortState {
  sortKey: SortKey;
  asc: boolean;
}

const initialState: SortState = {
  sortKey: 'episode_id',
  asc: true,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortKey(state, action: PayloadAction<SortKey>) {
      state.sortKey = action.payload;
    },
    setAsc(state, action: PayloadAction<boolean>) {
      state.asc = action.payload;
    },
    toggleSort(state, action: PayloadAction<SortKey>) {
      if (state.sortKey === action.payload) {
        state.asc = !state.asc;
      } else {
        state.sortKey = action.payload;
        state.asc = true;
      }
    },
  },
});

export const selectSortKey = (state: RootState) => state.sort.sortKey;
export const selectAsc     = (state: RootState) => state.sort.asc;

export const { setSortKey, setAsc, toggleSort } = sortSlice.actions;
export default sortSlice.reducer;