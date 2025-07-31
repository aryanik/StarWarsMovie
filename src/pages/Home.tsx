import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { FilmTable, type SortKey } from '../components/FilmTable';
import type { Film } from '../services/filmsApi';
import { useGetFilmsQuery } from '../services/filmsApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleSort } from '../store/slices/sortSlice';
import { selectSortedFilms } from '../store/slices/filmsSelectors';
import { selectSortKey, selectAsc } from '../store/slices/sortSlice';

export default function Home() {
  const { isLoading, isError } = useGetFilmsQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sortKey     = useAppSelector(selectSortKey);
  const asc         = useAppSelector(selectAsc);
  const sortedFilms = useAppSelector(selectSortedFilms);

  const handleRowClick = (film: Film) => {
    const match = film.url.match(/\/(\d+)(\/)??$/);
    if (match) {
      navigate(`/movie/${match[1]}`);
    }
  };
  

  if (isLoading) return <Loader />;
  if (isError)   return <Error message="Failed to load films." />;

  return (
    <div className="px-6 py-6">
      <FilmTable
        films={sortedFilms}
        sortKey={sortKey}
        asc={asc}
        onSort={(key: SortKey) => dispatch(toggleSort(key))}
        onRowClick={handleRowClick}
      />
    </div>
  );
}