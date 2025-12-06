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

const Filter = () => {
  return (
    <div className="flex justify-between mb-4">
      <p className="text-2xl mb-4">FILMS</p>

      <div className="flex flex-row  gap-4">
        {/* YEAR */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* GENRE */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {availableGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* DIRECTOR */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Director" />
          </SelectTrigger>
          <SelectContent>
            {availableGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* RATED */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rated" />
          </SelectTrigger>
          <SelectContent>
            {availableGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="ml-4 p-1 bg-blue-500 text-white rounded">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
