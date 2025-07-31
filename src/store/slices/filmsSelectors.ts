import { createSelector } from '@reduxjs/toolkit';
import { filmsApi } from '../../services/filmsApi';
import { selectSortKey, selectAsc } from './sortSlice';
import type { Film } from '../../services/filmsApi';


const selectGetFilmsResult = filmsApi.endpoints.getFilms.select();


const selectFilmsData = createSelector(
  selectGetFilmsResult,
  (result) => result.data ?? [] as Film[]
);

export const selectSortedFilms = createSelector(
  [selectFilmsData, selectSortKey, selectAsc],
  (films, sortKey, asc) => {
    const dir = asc ? 1 : -1;
    return [...films].sort((a, b) => {
      const aVal = a[sortKey]!;
      const bVal = b[sortKey]!;

      if (sortKey === 'episode_id') {
        return dir * (Number(aVal) - Number(bVal));
      }
      if (sortKey === 'release_date') {
        return dir * (new Date(aVal).getTime() - new Date(bVal).getTime());
      }
      return dir * String(aVal).localeCompare(String(bVal));
    });
  }
);