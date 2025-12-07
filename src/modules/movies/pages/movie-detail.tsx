import { useLocation, useNavigate } from "react-router-dom";
import { useAllMovies } from "../hooks/useAllMovies";
import type { Movie } from "../types/movies";
import { Button } from "@/components/ui/button";
import MoviesCard from "../components/movie-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const MovieDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie as Movie | undefined;
  const { allMovies } = useAllMovies();

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-slate-300 text-lg">Oops Movie not found</p>
        <Button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Back to Movies
        </Button>
      </div>
    );
  }

  const relatedMovies = allMovies.filter(
    (m) => m.Director === movie.Director && m.Title !== movie.Title
  );

  console.log("relatedMovies:", relatedMovies);
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("carousel");
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const genres = movie.Genre ? movie.Genre.split(",").map((g) => g.trim()) : [];
  const actors = movie.Actors
    ? movie.Actors.split(",").map((a) => a.trim())
    : [];

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-700/50 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center h-96 bg-linear-to-b from-slate-700 to-slate-800 rounded-xl border border-slate-600 overflow-hidden">
              <span className="text-6xl opacity-30">🎬</span>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2">
                  {movie.Title}
                </h1>
                <p className="text-slate-400 text-lg mb-4">
                  {movie.Year} - {movie.Runtime} - {movie.Rated}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="text-sm font-medium text-blue-300 bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 text-slate-300">
                  <p>
                    <span className="text-slate-400 font-semibold">
                      Director:
                    </span>{" "}
                    <span className="text-blue-400 font-medium">
                      {movie.Director}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-400 font-semibold">
                      Writer:
                    </span>{" "}
                    <span className="text-slate-300">{movie.Writer}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400">Release Date</p>
                <p className="text-lg font-semibold text-slate-200">
                  {movie.Released}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 text-start">
            Cast
          </h2>
          <div className="flex flex-wrap gap-3">
            {actors.map((actor, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-800/60 border border-slate-700 rounded-full text-sm text-slate-300 hover:border-blue-500/50 transition-colors"
              >
                {actor}
              </span>
            ))}
          </div>
        </section>

        {relatedMovies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-4 text-start">
              More of {movie.Director}
            </h2>

            <div className="relative">
              <div
                id="carousel"
                className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
                style={{ scrollBehavior: "smooth" }}
              >
                {relatedMovies.map((relatedMovie, i) => (
                  <div key={i} className="w-80">
                    <MoviesCard
                      key={i}
                      movieDetail={relatedMovie}
                      onClick={() => {
                        navigate("/movie-detail", {
                          state: { movie: relatedMovie },
                        });
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              {relatedMovies.length > 2 && (
                <>
                  <Button
                    onClick={() => handleScroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/80 hover:bg-blue-700 rounded-full transition-colors -ml-4"
                  >
                    <span className="text-white text-xl">
                      <ArrowLeftIcon />
                    </span>
                  </Button>
                  <Button
                    onClick={() => handleScroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/80 hover:bg-blue-700 rounded-full transition-colors -mr-4"
                  >
                    <span className="text-white text-xl">
                      <ArrowRightIcon />
                    </span>
                  </Button>
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
