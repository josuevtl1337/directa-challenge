import { useLocation, useNavigate } from "react-router-dom";
import { useAllMovies } from "../hooks/useAllMovies";
import type { Movie } from "../types/movies";
import { Card, CardTitle } from "@/components/ui/card";

const MovieDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie as Movie | undefined;
    const { allMovies } = useAllMovies();

    if (!movie) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-slate-300 text-lg">Película no encontrada</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Volver al inicio
                </button>
            </div>
        );
    }

    // Películas relacionadas del mismo director
    const relatedMovies = allMovies.filter(
        (m) => m.Director === movie.Director && m.Title !== movie.Title
    );

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
    const actors = movie.Actors ? movie.Actors.split(",").map((a) => a.trim()) : [];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-700/50 mb-8">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Poster placeholder */}
                        <div className="flex items-center justify-center h-96 bg-linear-to-b from-slate-700 to-slate-800 rounded-xl border border-slate-600 overflow-hidden">
                            <span className="text-6xl opacity-30">🎬</span>
                        </div>

                        {/* Movie Info */}
                        <div className="md:col-span-2 flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2">
                                    {movie.Title}
                                </h1>
                                <p className="text-slate-400 text-lg mb-4">
                                    {movie.Year} • {movie.Runtime} • {movie.Rated}
                                </p>

                                {/* Géneros */}
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

                                {/* Director y escritor */}
                                <div className="space-y-3 text-slate-300">
                                    <p>
                                        <span className="text-slate-400 font-semibold">Director:</span>{" "}
                                        <span className="text-blue-400 font-medium">{movie.Director}</span>
                                    </p>
                                    <p>
                                        <span className="text-slate-400 font-semibold">Escritor:</span>{" "}
                                        <span className="text-slate-300">{movie.Writer}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Release date */}
                            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                <p className="text-sm text-slate-400">Estrenado</p>
                                <p className="text-lg font-semibold text-slate-200">{movie.Released}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Cast */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Elenco</h2>
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

                {/* Related Movies Carousel */}
                {relatedMovies.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">
                            Más películas de {movie.Director}
                        </h2>

                        <div className="relative">
                            {/* Carousel container */}
                            <div
                                id="carousel"
                                className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
                                style={{ scrollBehavior: "smooth" }}
                            >
                                {relatedMovies.map((relatedMovie, idx) => (
                                    <div key={idx} className="flex-shrink-0 w-80">
                                        <RelatedMovieCard
                                            movie={relatedMovie}
                                            onClick={() =>
                                                navigate("/movie-detail", { state: { movie: relatedMovie } })
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Scroll buttons */}
                            {relatedMovies.length > 2 && (
                                <>
                                    <button
                                        onClick={() => handleScroll("left")}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/80 hover:bg-blue-700 rounded-full transition-colors -ml-4"
                                    >
                                        <span className="text-white text-xl">←</span>
                                    </button>
                                    <button
                                        onClick={() => handleScroll("right")}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/80 hover:bg-blue-700 rounded-full transition-colors -mr-4"
                                    >
                                        <span className="text-white text-xl">→</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </section>
                )}

                {/* Back button */}
                <div className="mt-12">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
                    >
                        ← Volver al listado
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente para películas relacionadas en el carousel
const RelatedMovieCard = ({
    movie,
    onClick,
}: {
    movie: Movie;
    onClick: () => void;
}) => {
    const genres = movie.Genre
        ? movie.Genre.split(",")
            .map((g) => g.trim())
            .slice(0, 2)
        : [];

    return (
        <Card
            className="group h-96 flex flex-col justify-between rounded-xl overflow-hidden bg-linear-to-b from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden h-40 bg-linear-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-all duration-300"></div>
                <span className="text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                    🎬
                </span>
            </div>

            <div className="flex-1 px-3 pt-3 pb-3">
                <CardTitle className="text-center text-sm font-bold leading-tight text-slate-100 line-clamp-2">
                    {movie.Title}
                </CardTitle>

                <p className="text-center text-xs text-slate-400 mt-1">{movie.Year}</p>

                <div className="flex flex-wrap gap-1 justify-center mt-2">
                    {genres.map((g, idx) => (
                        <span
                            key={idx}
                            className="text-xs text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-full"
                        >
                            {g}
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-3 pb-3 border-t border-slate-700/50">
                <p className="text-xs text-slate-400">
                    Dir: <span className="text-blue-400 font-medium">{movie.Director}</span>
                </p>
            </div>
        </Card>
    );
};

export default MovieDetail;