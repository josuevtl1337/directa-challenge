import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface ISearchBarProps {
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div>
      <InputGroup className="rounded-full max-w-350 w-full mb-4 p-6 ">
        <InputGroupInput
          placeholder="Title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        {searchTerm && (
          <InputGroupAddon align="inline-end">
            <X
              className="cursor-pointer text-slate-400 hover:text-slate-200 transition-colors"
              size={20}
              onClick={handleClear}
            />
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
};
export default SearchBar;
