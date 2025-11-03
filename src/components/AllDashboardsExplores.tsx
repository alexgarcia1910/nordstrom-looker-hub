import { useState } from "react";
import { LayoutGrid, Search, Heart, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const allAssets = [
  { type: "Dashboard", name: "Sales Performance Dashboard", domain: "Finance", subdomain: "Performance & KPIs", status: "Operational", owner: "Finance Analytics Team" },
  { type: "Explore", name: "Store Traffic Explorer", domain: "Store Selling", subdomain: "Sales & Performance", status: "Warning", owner: "Retail Data Team" },
  { type: "Dashboard", name: "Inventory Insights Dashboard", domain: "Merchandising", subdomain: "Product Lifecycle", status: "Operational", owner: "Merch Analytics" },
  { type: "Dashboard", name: "Labor Cost Breakdown", domain: "Store Selling", subdomain: "Workforce Planning", status: "Critical", owner: "Retail Analytics" },
  { type: "Dashboard", name: "Supply Chain Overview", domain: "Supply Chain", subdomain: "Logistics", status: "Operational", owner: "Ops Insights" },
  { type: "Explore", name: "Tech Performance Monitor", domain: "Technology", subdomain: "Systems Health", status: "Operational", owner: "IT Analytics" },
  { type: "Dashboard", name: "Promotions Summary", domain: "Merchandising", subdomain: "Pricing & Promotions", status: "Warning", owner: "Merch Data Team" },
  { type: "Dashboard", name: "Revenue Forecasting Dashboard", domain: "Finance", subdomain: "Planning & Forecasting", status: "Operational", owner: "Finance Analytics Team" },
  { type: "Explore", name: "Customer Segmentation Explorer", domain: "Merchandising", subdomain: "Buying & Planning", status: "Operational", owner: "Merch Analytics" },
  { type: "Dashboard", name: "Store Operations Dashboard", domain: "Store Selling", subdomain: "Store Operations", status: "Warning", owner: "Retail Analytics" },
  { type: "Dashboard", name: "Vendor Performance Dashboard", domain: "Merchandising", subdomain: "Vendor Performance", status: "Critical", owner: "Merch Data Team" },
  { type: "Explore", name: "Financial Health Explorer", domain: "Finance", subdomain: "Financial Reporting", status: "Operational", owner: "Finance Analytics Team" },
];

export const AllDashboardsExplores = () => {
  const [domainFilter, setDomainFilter] = useState("all");
  const [subdomainFilter, setSubdomainFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const itemsPerPage = 10;

  const filteredAssets = allAssets.filter((asset) => {
    if (domainFilter !== "all" && asset.domain !== domainFilter) return false;
    if (subdomainFilter !== "all" && asset.subdomain !== subdomainFilter) return false;
    if (typeFilter !== "all" && asset.type !== typeFilter) return false;
    if (statusFilter !== "all" && asset.status !== statusFilter) return false;
    if (ownerFilter !== "all" && asset.owner !== ownerFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAssets = filteredAssets.slice(startIndex, endIndex);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(index)) {
        newFavorites.delete(index);
      } else {
        newFavorites.add(index);
      }
      return newFavorites;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-50 text-green-700 border-green-200";
      case "Warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Critical":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };


  return (
    <div className="mt-12 border-t border-border pt-12">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-3xl font-bold text-foreground">All Dashboards & Explores</h2>
          <div className="group relative">
            <span className="text-muted-foreground cursor-help">ⓘ</span>
            <div className="absolute left-0 top-6 hidden group-hover:block bg-popover text-popover-foreground text-sm p-3 rounded-lg shadow-lg border border-border w-64 z-50">
              This section lists all dashboards and explores across Nordstrom's analytics domains.
            </div>
          </div>
        </div>
        <p className="text-base text-muted-foreground">
          Browse every dashboard and explore across all Nordstrom analytics domains.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={domainFilter} onValueChange={setDomainFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Domains" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Domains</SelectItem>
            {Array.from(new Set(allAssets.map(a => a.domain))).map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subdomainFilter} onValueChange={setSubdomainFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Subdomains" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Subdomains</SelectItem>
            {Array.from(new Set(allAssets.map(a => a.subdomain))).map((subdomain) => (
              <SelectItem key={subdomain} value={subdomain}>
                {subdomain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Dashboard">Dashboard</SelectItem>
            <SelectItem value="Explore">Explore</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Operational">Operational</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Owners" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Owners</SelectItem>
            {Array.from(new Set(allAssets.map(a => a.owner))).map((owner) => (
              <SelectItem key={owner} value={owner}>
                {owner}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Card View */}
      <div className="space-y-4">
        {paginatedAssets.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No results found. Try adjusting your filters.
          </div>
        ) : (
          paginatedAssets.map((asset, index) => (
            <Card
              key={startIndex + index}
              className="p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                {/* Left side - Icon and Content */}
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  <div className="mt-1 flex-shrink-0">
                    {asset.type === "Dashboard" ? (
                      <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                    ) : (
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      {asset.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
                      <span>{asset.domain}</span>
                      <span>/</span>
                      <span>{asset.subdomain}</span>
                      <span>|</span>
                      <span className="truncate">{asset.owner}</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Status Badge and Actions */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-3 flex-shrink-0">
                  <Badge
                    variant="outline"
                    className={cn("text-xs whitespace-nowrap", getStatusColor(asset.status))}
                  >
                    {asset.status === "Operational" && "🟢 "}
                    {asset.status === "Warning" && "🟡 "}
                    {asset.status === "Critical" && "🔴 "}
                    {asset.status}
                  </Badge>

                  {/* Hover Actions */}
                  <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(startIndex + index);
                      }}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          favorites.has(startIndex + index) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        )}
                      />
                    </button>
                    <button className="p-1 hover:bg-muted rounded">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
