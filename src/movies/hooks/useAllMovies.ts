import { useEffect, useState } from 'react';
import { fetchMoviesPage } from '../api/movies';
import type { Movie } from '../types/movies';

interface UseAllMoviesResult {
  allMovies: Movie[];
  isLoading: boolean;
  isError: string | null;
}

export function useAllMovies(): UseAllMoviesResult {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAllPages() {
      try {
        setIsLoading(true);
        setIsError(null);

        const firstPage = await fetchMoviesPage(1);
        if (cancelled) return;

        const movies: Movie[] = [...firstPage.data];

        const totalPages = firstPage.total_pages;

        if (totalPages > 1) {
          const pagesToFetch = [];

          for (let page = 2; page <= totalPages; page++) {
            pagesToFetch.push(fetchMoviesPage(page));
          }

          const results = await Promise.all(pagesToFetch);
          if (cancelled) return;

          for (const result of results) {
            movies.push(...result.data);
          }
        }

        setAllMovies(movies);
      } catch (err) {
        if (!cancelled) {
          setIsError(err instanceof Error ? err.message : 'unknown');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAllPages();

    return () => {
      cancelled = true;
    };
  }, []);

  return { allMovies, isLoading, isError };
}
