import { useState } from "react";
import { LayoutGrid, Search, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

  const filteredAssets = allAssets.filter((asset) => {
    if (domainFilter !== "all" && asset.domain !== domainFilter) return false;
    if (subdomainFilter !== "all" && asset.subdomain !== subdomainFilter) return false;
    if (typeFilter !== "all" && asset.type !== typeFilter) return false;
    if (statusFilter !== "all" && asset.status !== statusFilter) return false;
    if (ownerFilter !== "all" && asset.owner !== ownerFilter) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Critical":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const domains = ["All", ...Array.from(new Set(allAssets.map(a => a.domain)))];
  const subdomains = ["All", ...Array.from(new Set(allAssets.map(a => a.subdomain)))];
  const owners = ["All", ...Array.from(new Set(allAssets.map(a => a.owner)))];

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
            <SelectValue placeholder="Domain" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {domains.map((domain) => (
              <SelectItem key={domain} value={domain.toLowerCase().replace(" ", "-")}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subdomainFilter} onValueChange={setSubdomainFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Subdomain" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {subdomains.map((subdomain) => (
              <SelectItem key={subdomain} value={subdomain.toLowerCase().replace(/\s+/g, "-")}>
                {subdomain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Dashboard">Dashboard</SelectItem>
            <SelectItem value="Explore">Explore</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Operational">Operational</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {owners.map((owner) => (
              <SelectItem key={owner} value={owner.toLowerCase().replace(/\s+/g, "-")}>
                {owner}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Domain</TableHead>
              <TableHead className="font-semibold">Subdomain</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.slice(0, 12).map((asset, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-muted/50 transition-colors h-[72px]"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {asset.type === "Dashboard" ? (
                      <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">{asset.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell className="text-muted-foreground">{asset.domain}</TableCell>
                <TableCell className="text-muted-foreground">{asset.subdomain}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(asset.status)}>
                    {asset.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{asset.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-4">
        <a
          href="#"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View All Assets
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};
