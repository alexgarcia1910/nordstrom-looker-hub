import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  onSearch: (query: string, domain: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value, "all");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Find Data..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 h-14 text-base bg-card"
        />
      </div>
      
      {query && (
        <div className="mt-2 text-sm text-muted-foreground">
          Searching for "{query}"
        </div>
      )}
    </div>
  );
};
