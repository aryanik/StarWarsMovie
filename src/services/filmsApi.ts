import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '../constants/api';
export interface Film {
  title: string
  episode_id: number
  director: string
  release_date: string
  opening_crawl: string
  url: string
  producer: string
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

export interface NamedEntity {
  name: string;
  url: string;
}

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getFilms: builder.query<Film[], void>({
      query: () => 'films',
    }),
    getFilm: builder.query<Film, string>({
      query: (id) => `films/${id}`,
    }),


    getEntitiesByUrls: builder.query<NamedEntity[], string[]>({
      async queryFn(urls) {
        try {
          const responses = await Promise.all(
            urls.map((url) =>
              fetch(url).then((res) => res.json())
            )
          );
    
          const data: NamedEntity[] = responses.map((item) => ({
            name: item.name,
            url: item.url,
          }));
    
          return { data };
        } catch (err: unknown) {
          let message = 'Unknown error';
          if (err instanceof Error) {
            message = err.message;
          }
          return { error: { status: 'CUSTOM_ERROR', error: message } };
        }
      },
    }),
    
  }),
});

export const { useGetFilmsQuery, useGetFilmQuery, useGetEntitiesByUrlsQuery } = filmsApi;