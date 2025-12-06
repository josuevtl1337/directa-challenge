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

const MoviesPage = () => {
  const { allMovies, isLoading, isError } = useAllMovies();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {isError}</p>;
  }

  console.log(allMovies);
  return (
    <div className="p-4">
      {/* Banner filters */}
      <SearchBar />
      <Filter />
      {/* Banner movie list   */}
      <div className="mb-4 p-2 bg-blue-950 full-w">
        <p>{`There are ${allMovies.length} films.`}</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {allMovies?.map((movie, i) => (
          <MoviesCard key={i} movieDetail={movie} />
        ))}
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
    <Card className="min-h-[150px] flex flex-col justify-between rounded-2xl hover:scale-3d transition-all  cursor-pointer">
      <div>
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-base md:text-xl font-semibold leading-tight text-foreground">
            {movieDetail.Title}
          </CardTitle>

          <CardDescription className="text-center text-sm mt-1 truncate">
            {movieDetail.Actors}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="mt-2 flex flex-wrap gap-2">
            {trimGenres.map((g, idx) => (
              <span
                key={idx}
                className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full border border-border"
              >
                {g}
              </span>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3">
        <p className="text-sm text-muted-foreground">
          Directed by{" "}
          <span className="font-medium text-foreground">
            {movieDetail.Director}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default MoviesPage;
