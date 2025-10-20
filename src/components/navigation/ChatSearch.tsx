import { useState } from "react";
import { Send, CheckCircle, Lock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchResult {
  id: string;
  name: string;
  description: string;
  domain: string;
  lastUpdated: string;
  environment: "production" | "dev" | "staging";
  requiredRole?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    name: "Sales Dashboard - Merchandising",
    description: "Latest sales performance metrics across all merchandising categories",
    domain: "Merchandising",
    lastUpdated: "2 hours ago",
    environment: "production"
  },
  {
    id: "2",
    name: "Revenue Overview",
    description: "Quarterly revenue analysis with year-over-year comparisons",
    domain: "Finance",
    lastUpdated: "1 day ago",
    environment: "production",
    requiredRole: "Finance Analysts"
  },
];

interface ChatSearchProps {
  isAdminMode: boolean;
  selectedDomain: string | null;
}

export const ChatSearch = ({ isAdminMode, selectedDomain }: ChatSearchProps) => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("all");

  const handleSearch = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div 
      className="rounded-xl p-6 lg:p-8"
      style={{ 
        backgroundColor: "hsl(var(--v2-surface))",
        boxShadow: "var(--shadow-soft)"
      }}
    >
      {/* Title */}
      <h2 
        className="text-xl font-medium mb-6"
        style={{ color: "hsl(var(--v2-text-primary))" }}
      >
        Ask Looker Assistant
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Select value={selectedDomainFilter} onValueChange={setSelectedDomainFilter}>
          <SelectTrigger 
            className="w-full sm:w-[180px]"
            style={{
              backgroundColor: "hsl(var(--v2-background))",
              borderColor: "hsl(var(--v2-border-soft))",
              color: "hsl(var(--v2-text-primary))"
            }}
          >
            <SelectValue placeholder="All Domains" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="merchandising">Merchandising</SelectItem>
            <SelectItem value="store-selling">Store Selling</SelectItem>
            <SelectItem value="supply-chain">Supply Chain</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>

        <div 
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: "hsl(var(--v2-accent-soft))",
            color: "hsl(var(--v2-text-secondary))"
          }}
        >
          <CheckCircle className="h-4 w-4" style={{ color: "#10b981" }} />
          <span>Environment: Production</span>
          {!isAdminMode && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lock className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enable Admin Mode to view all environments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div 
        className="relative mb-6 rounded-lg p-1"
        style={{
          backgroundColor: "hsl(var(--v2-background))",
          border: "1px solid hsl(var(--v2-border-soft))",
        }}
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Try asking: 'Show me the latest sales dashboard for Merchandising.'"
          className="border-0 bg-transparent text-base px-4 py-3 focus-visible:ring-0"
          style={{ color: "hsl(var(--v2-text-primary))" }}
        />
        <Button
          onClick={handleSearch}
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg"
          style={{
            backgroundColor: "hsl(var(--v2-black))",
            color: "hsl(var(--v2-surface))"
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Results Area */}
      <div className="space-y-4">
        {!showResults ? (
          <div 
            className="text-center py-12 rounded-lg"
            style={{ 
              backgroundColor: "hsl(var(--v2-accent-soft))",
              color: "hsl(var(--v2-text-secondary))"
            }}
          >
            <p className="text-sm">
              Ask a question to find relevant dashboards
            </p>
          </div>
        ) : (
          <>
            {mockSearchResults.map((result) => (
              <div
                key={result.id}
                className="rounded-lg p-5 smooth-transition"
                style={{
                  backgroundColor: "hsl(var(--v2-background))",
                  border: "1px solid hsl(var(--v2-border-soft))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 
                        className="text-base font-medium"
                        style={{ color: "hsl(var(--v2-text-primary))" }}
                      >
                        {result.name}
                      </h3>
                      {result.environment === "production" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#10b981" }} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Trusted - Production</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {result.requiredRole && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Lock className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(var(--v2-text-secondary))" }} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Visible to {result.requiredRole} only</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: "hsl(var(--v2-text-secondary))" }}
                    >
                      {result.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "hsl(var(--v2-text-secondary))" }}>
                      <Badge 
                        variant="outline"
                        style={{
                          borderColor: "hsl(var(--v2-border-soft))",
                          color: "hsl(var(--v2-text-secondary))"
                        }}
                      >
                        {result.domain}
                      </Badge>
                      <span>Updated {result.lastUpdated}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="flex-shrink-0 rounded-lg"
                    style={{
                      backgroundColor: "hsl(var(--v2-black))",
                      color: "hsl(var(--v2-surface))"
                    }}
                  >
                    Open in Looker
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Clarity Warning */}
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: "hsl(var(--v2-info-bg))",
                border: "1px solid hsl(var(--v2-border-soft))"
              }}
            >
              <p 
                className="text-sm"
                style={{ color: "hsl(var(--v2-text-secondary))" }}
              >
                Only production-approved dashboards are shown. For dev dashboards, switch to Admin Mode.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
