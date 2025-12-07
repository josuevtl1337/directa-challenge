import type { Movie } from '../types/movies';
import { useMoviesContext } from '../../../context/MoviesContext';

interface UseAllMoviesResult {
  allMovies: Movie[];
  isLoading: boolean;
  isError: string | null;
}

export function useAllMovies(): UseAllMoviesResult {
  const { allMovies, isLoading, isError } = useMoviesContext();
  return { allMovies, isLoading, isError };
}
