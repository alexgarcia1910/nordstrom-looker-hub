import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchBarProps {
  onSearch: (query: string, domain: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value, domain);
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    onSearch(query, value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Find Data..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-14 text-base bg-card"
          />
        </div>
        
        <Select value={domain} onValueChange={handleDomainChange}>
          <SelectTrigger className="w-[180px] h-14 bg-card">
            <SelectValue placeholder="All Domains" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="merchandising">Merchandising</SelectItem>
            <SelectItem value="store-selling">Store Selling</SelectItem>
            <SelectItem value="supply-chain">Supply Chain</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {query && (
        <div className="mt-2 text-sm text-muted-foreground">
          Searching for "{query}" {domain !== "all" && `in ${domain}`}
        </div>
      )}
    </div>
  );
};
