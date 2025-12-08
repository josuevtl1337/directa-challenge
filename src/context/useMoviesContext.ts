import { useContext } from "react";
import MoviesContext from "./MoviesContext";

export function useMoviesContext() {
  const ctx = useContext(MoviesContext);
  if (!ctx) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return ctx;
}
