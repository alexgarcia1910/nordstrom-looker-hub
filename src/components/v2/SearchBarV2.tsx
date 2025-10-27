import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarV2Props {
  onSearch: (query: string, domain: string) => void;
}

export const SearchBarV2 = ({ onSearch }: SearchBarV2Props) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value, "all");
  };

  return (
    <div className="w-full mb-12">
      <div 
        className={cn(
          "relative rounded-xl smooth-transition"
        )}
        style={{ 
          boxShadow: isFocused ? "var(--shadow-premium), 0 0 0 2px hsl(var(--v2-black))" : "var(--shadow-soft)"
        }}
      >
        <Search 
          className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5" 
          style={{ color: "hsl(var(--v2-text-secondary))" }}
        />
        <Input
          type="text"
          placeholder="Search dashboards, explores, or datasets..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-14 h-16 text-base border-0 rounded-xl"
          style={{ 
            backgroundColor: "hsl(var(--v2-surface))",
            color: "hsl(var(--v2-text-primary))"
          }}
        />
      </div>
      
      {query && (
        <div className="mt-3 text-sm animate-fade-in" style={{ color: "hsl(var(--v2-text-secondary))" }}>
          Searching for "{query}"
        </div>
      )}
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
