export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
}

export interface MoviesApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
}