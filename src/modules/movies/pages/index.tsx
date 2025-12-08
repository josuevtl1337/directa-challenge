import type { Movie } from "../types/movies";
import Filter from "../components/filter";
import { useAllMovies } from "../hooks/useAllMovies";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/search-bar";
import { useState } from "react";
import MoviesCard from "../components/movie-card";

const MoviesPage = () => {
  const navigate = useNavigate();
  const { allMovies, isLoading, isError } = useAllMovies();

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
      <div className="flex items-center justify-center h-screen min-h-screen w-full bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-95 px-6 py-8">
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

  const goToDetailPage = (movie: Movie) => {
    navigate("/movie-detail", { state: { movie } });
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-95 px-6 py-8">
      <div className="mb-8">
        <SearchBar onSearchChange={handleSearchChange} />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <div className="mb-8 p-4 bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg backdrop-blur-sm">
        <p className="text-slate-200 font-medium">
          {`🎬  ${filteredMovies.length} film${allMovies.length !== 1 ? "s" : ""
            } found`}
        </p>
      </div>

      <div className="w-full lg:min-w-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies?.map((movie, i) => (
          <MoviesCard key={i} movieDetail={movie} onClick={goToDetailPage} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
