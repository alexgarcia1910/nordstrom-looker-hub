import { useState, useRef, useEffect } from "react";
import { AlertCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const DASHBOARD_DATA = [
  {"name": "Sales Performance Dashboard", "domain": "Finance", "type": "Dashboard", "environment": "Production"},
  {"name": "Expense Forecast Explorer", "domain": "Finance", "type": "Explore", "environment": "Production"},
  {"name": "P&L Summary", "domain": "Finance", "type": "Dashboard", "environment": "Production"},
  {"name": "Budget Variance Analysis", "domain": "Finance", "type": "Dashboard", "environment": "Development"},
  {"name": "Revenue Trends", "domain": "Finance", "type": "Explore", "environment": "Production"},
  {"name": "Merch Performance Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Inventory Levels Explorer", "domain": "Merchandising", "type": "Explore", "environment": "Production"},
  {"name": "Markdown Optimization Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Product Margin Explorer", "domain": "Merchandising", "type": "Explore", "environment": "Development"},
  {"name": "Assortment Planning Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
];

export const NavbarV8 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredResults = searchQuery.length >= 2
    ? DASHBOARD_DATA.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(value.length >= 2);
  };

  const handleResultClick = (name: string) => {
    alert(name);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredResults.length > 0) {
      handleResultClick(filteredResults[0].name);
    }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="relative flex-1 max-w-3xl mr-4" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Find data..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 h-9 w-full rounded-full border-border"
          />
          
          {showDropdown && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
              <div className="max-h-[300px] overflow-y-auto">
                {filteredResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleResultClick(item.name)}
                    className="px-4 py-2.5 cursor-pointer hover:bg-muted/50 border-b border-border last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">
                        {item.type === "Dashboard" ? "📊" : "🔍"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{item.domain}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            {item.environment === "Production" ? "✅" : "🧪"} {item.environment}
                          </span>
                          <span>·</span>
                          <span>{item.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="https://nordstrom.com" target="_blank" rel="noopener noreferrer">
              <AlertCircle className="mr-2 h-4 w-4" />
              Issue Escalation
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
