import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarV2Props {
  onSearch: (query: string, domain: string) => void;
}

export const SearchBarV2 = ({ onSearch }: SearchBarV2Props) => {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value, domain);
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    onSearch(query, value);
  };

  return (
    <div className="w-full mb-12">
      <div className="relative flex gap-3">
      <div 
          className={cn(
            "relative flex-1 rounded-xl smooth-transition"
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
        
        <Select value={domain} onValueChange={handleDomainChange}>
          <SelectTrigger 
            className="w-[200px] h-16 rounded-xl border-0"
            style={{ 
              backgroundColor: "hsl(var(--v2-surface))",
              boxShadow: "var(--shadow-soft)",
              color: "hsl(var(--v2-text-primary))"
            }}
          >
            <SelectValue placeholder="All Domains" />
          </SelectTrigger>
          <SelectContent 
            className="rounded-xl"
            style={{ 
              backgroundColor: "hsl(var(--v2-surface))",
              border: "1px solid hsl(var(--v2-border-soft))",
              boxShadow: "var(--shadow-premium)"
            }}
          >
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
        <div className="mt-3 text-sm animate-fade-in" style={{ color: "hsl(var(--v2-text-secondary))" }}>
          Searching for "{query}" {domain !== "all" && `in ${domain}`}
        </div>
      )}
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
