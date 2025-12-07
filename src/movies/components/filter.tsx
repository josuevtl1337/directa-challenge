import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const availableYears = [
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
];

const availableGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Adventure",
  "Animation",
  "Biography",
  "Crime",
  "Fantasy",
  "History",
  "Mystery",
  "Music",
  "Family",
];

const availableDirectors = [
  "Woody Allen",
  "Quentin Tarantino",
  "Martin Scorsese",
  "Pedro Almodóvar",
  "M. Night Shyamalan",
  "Clint Eastwood",
  "David Fincher",
  "Steven Spielberg",
  "Christopher Nolan",
  "Robert Zemeckis",
  "Damien Chazelle",
];

const availableRatings = ["G", "PG", "PG-13", "R", "NC-17", "Not Rated"];

interface IFilterProps {
  onFilterChange: (filters: {
    year: string | null;
    genre: string | null;
    director: string | null;
    rated: string | null;
  }) => void;
}

const Filter: React.FC<IFilterProps> = ({ onFilterChange }) => {
  const [year, setYear] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [director, setDirector] = useState<string | null>(null);
  const [rated, setRated] = useState<string | null>(null);

  const handleFilterChange = (
    filterType: "year" | "genre" | "director" | "rated",
    value: string | null
  ) => {
    const newFilters = { year, genre, director, rated };

    switch (filterType) {
      case "year":
        setYear(value);
        newFilters.year = value;
        break;
      case "genre":
        setGenre(value);
        newFilters.genre = value;
        break;
      case "director":
        setDirector(value);
        newFilters.director = value;
        break;
      case "rated":
        setRated(value);
        newFilters.rated = value;
        break;
    }

    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    setYear(null);
    setGenre(null);
    setDirector(null);
    setRated(null);
    onFilterChange({ year: null, genre: null, director: null, rated: null });
  };

  return (
    <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
      <p className="text-xl font-semibold text-slate-100">FILMS</p>

      <div className="flex flex-row gap-4 flex-wrap">
        {/* YEAR */}
        <Select
          value={year || ""}
          onValueChange={(value) => handleFilterChange("year", value || null)}
        >
          <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((yr) => (
              <SelectItem key={yr} value={yr}>
                {yr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* GENRE */}
        <Select
          value={genre || ""}
          onValueChange={(value) => handleFilterChange("genre", value || null)}
        >
          <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {availableGenres.map((gen) => (
              <SelectItem key={gen} value={gen}>
                {gen}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* DIRECTOR */}
        <Select
          value={director || ""}
          onValueChange={(value) =>
            handleFilterChange("director", value || null)
          }
        >
          <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
            <SelectValue placeholder="Director" />
          </SelectTrigger>
          <SelectContent>
            {availableDirectors.map((gen) => (
              <SelectItem key={gen} value={gen}>
                {gen}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* RATED */}
        <Select
          value={rated || ""}
          onValueChange={(value) => handleFilterChange("rated", value || null)}
        >
          <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
            <SelectValue placeholder="Rated" />
          </SelectTrigger>
          <SelectContent>
            {availableRatings.map((rate) => (
              <SelectItem key={rate} value={rate}>
                {rate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* RESET BUTTON */}
        <Button
          onClick={handleResetFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
