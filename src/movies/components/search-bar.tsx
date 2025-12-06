import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div>
            <InputGroup className="rounded max-w-200 mb-4 align-middle mx-auto p-8">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>

        </div>
    )
}
export default SearchBar;