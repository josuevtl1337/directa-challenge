import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Movie } from "../types/movies";

type MoviesCardProps = {
  movieDetail: Movie;
  onClick?: (movie: Movie) => void;
};

const MoviesCard = ({ movieDetail, onClick }: MoviesCardProps) => {
  const trimGenres = movieDetail.Genre
    ? movieDetail.Genre.split(",").map((g) => g.trim())
    : [];

  return (
    <Card
      className="w-full lg:max-w-70 group min-h-[420px] flex flex-col justify-between rounded-xl overflow-hidden bg-linear-to-b from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick?.(movieDetail)}
    >
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
export default MoviesCard;
