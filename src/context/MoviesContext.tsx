import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMoviesPage } from "../modules/movies/api/movies";
import type { Movie, MoviesApiResponse } from "../modules/movies/types/movies";

type MoviesState = {
  allMovies: Movie[];
  isLoading: boolean;
  isError: string | null;
};

const defaultState: MoviesState = {
  allMovies: [],
  isLoading: true,
  isError: null,
};

const MoviesContext = createContext<MoviesState | undefined>(undefined);

export const MoviesProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
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
          const pagesToFetch: Promise<MoviesApiResponse>[] = [];

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
          setIsError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadAllPages();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MoviesContext.Provider value={{ allMovies, isLoading, isError }}>
      {children}
    </MoviesContext.Provider>
  );
};

export function useMoviesContext() {
  const ctx = useContext(MoviesContext);
  if (!ctx) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return ctx;
}

export default MoviesContext;
