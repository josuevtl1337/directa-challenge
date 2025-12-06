import type { MoviesApiResponse } from '../types/movies';

const BASE_URL = 'http://localhost:4000/api/movies/search';

export  const fetchMoviesPage = async (page: number): Promise<MoviesApiResponse> => {
  const url = `${BASE_URL}?page=${page}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Fail to fetch ${page}: ${res.status}`);
  }

  const data = (await res.json()) as MoviesApiResponse;
  return data;
}
