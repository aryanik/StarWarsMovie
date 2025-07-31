import { useParams } from "react-router-dom";
import { useGetFilmQuery, useGetEntitiesByUrlsQuery } from "../services/filmsApi";

type NamedEntity = { name: string; url: string };

const keys = ['characters', 'planets', 'starships', 'vehicles', 'species'] as const;
type DetailKeys = typeof keys[number];

type FilmDetails = Record<DetailKeys, NamedEntity[]>;

export function useMovieData() {
  const { id } = useParams();

  const {
    data: film,
    isLoading: isFilmLoading,
    isError: isFilmError,
  } = useGetFilmQuery(id || "");

  const urls: string[] = film
    ? keys.flatMap((key) => film[key] ?? [])
    : [];

  const {
    data: fetchedEntities,
    isLoading: isEntitiesLoading,
    isError: isEntitiesError,
  } = useGetEntitiesByUrlsQuery(urls, {
    skip: urls.length === 0,
  });

  const details = keys.reduce((acc, key) => {
    acc[key] = fetchedEntities?.filter((e) => film?.[key]?.includes(e.url)) ?? [];
    return acc;
  }, {} as FilmDetails);

  return {
    film,
    isLoading: isFilmLoading || isEntitiesLoading,
    isError: isFilmError || isEntitiesError,
    details,
  };
}
