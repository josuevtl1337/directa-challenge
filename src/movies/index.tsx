import type { Movie } from "./types/movies";
import Filter from "./components/filter";
import { useAllMovies } from "./hooks/useAllMovies";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SearchBar from "./components/search-bar";
import { useState } from "react";

const MoviesPage = () => {
  const { allMovies, isLoading, isError } = useAllMovies();
  console.log("allMovies:", allMovies);
  const [filters, setFilters] = useState({
    year: null as string | null,
    genre: null as string | null,
    director: null as string | null,
    rated: null as string | null,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMovies = allMovies.filter((movie) => {
    if (
      searchTerm &&
      !movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (filters.year && movie.Year !== filters.year) return false;
    if (filters.genre && !movie.Genre?.includes(filters.genre)) return false;
    if (filters.director && !movie.Director?.includes(filters.director))
      return false;
    if (filters.rated && movie.Rated !== filters.rated) return false;
    return true;
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg font-semibold">
          Error: {isError}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-95 relative z-10">
      <div className="border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Directa Challenge
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                This is <b>NOT</b> a copy from letterboxd
              </p>
            </div>

            <div className="w-full max-w-xs">
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className="mb-8 p-4 bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg backdrop-blur-sm">
          <p className="text-slate-200 font-medium">
            {`🎬  ${allMovies.length} film${
              allMovies.length !== 1 ? "s" : ""
            } found`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies?.map((movie, i) => (
            <MoviesCard key={i} movieDetail={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

type MoviesCardProps = {
  movieDetail: Movie;
};

const MoviesCard = ({ movieDetail }: MoviesCardProps) => {
  const trimGenres = movieDetail.Genre
    ? movieDetail.Genre.split(",").map((g) => g.trim())
    : [];

  return (
    <Card className="group min-h-[420px] flex flex-col justify-between rounded-xl overflow-hidden bg-linear-to-b from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden h-32 bg-linear-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-all duration-300"></div>
        <span className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
          🎬
        </span>
      </div>

      <div className="flex-1 px-4 pt-4">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-center text-base md:text-lg font-bold leading-tight text-slate-100 line-clamp-2">
            {movieDetail.Title}
          </CardTitle>

          <CardDescription className="text-center text-xs md:text-sm mt-2 text-slate-400 line-clamp-2">
            {movieDetail.Actors}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {trimGenres.slice(0, 3).map((g, idx) => (
              <span
                key={idx}
                className="text-xs font-medium text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 rounded-full hover:bg-blue-500/30 transition-colors"
              >
                {g}
              </span>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3 px-4 pb-4 border-t border-slate-700/50">
        <p className="text-xs md:text-sm text-slate-400">
          Directed by{" "}
          <span className="font-bold text-blue-400">
            {movieDetail.Director}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default MoviesPage;
