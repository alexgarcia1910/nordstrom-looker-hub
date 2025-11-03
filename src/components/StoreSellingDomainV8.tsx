import { useState, useEffect } from "react";
import { useLookerSDK } from "@/hooks/useLookerSDK";
import { LayoutGrid, Search, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";

interface DirectoryItem {
  id: string;
  type: "Dashboard" | "Explore";
  name: string;
  domain: string;
  subdomain: string;
  description: string;
  status: "Operational" | "Warning" | "Critical";
  owner: string;
  isFavorite: boolean;
}

const mockData: DirectoryItem[] = [
  {
    id: "1",
    type: "Dashboard",
    name: "Store Operations Dashboard",
    domain: "Store Selling",
    subdomain: "Store Operations",
    description: "Monitor daily operations and key metrics across all stores.",
    status: "Operational",
    owner: "Retail Analytics Team",
    isFavorite: false
  },
  {
    id: "2",
    type: "Dashboard",
    name: "Daily Sales Summary Dashboard",
    domain: "Store Selling",
    subdomain: "Sales & Performance",
    description: "Track daily sales performance and trends by store and region.",
    status: "Warning",
    owner: "Sales Analytics Team",
    isFavorite: false
  },
  {
    id: "3",
    type: "Explore",
    name: "Customer Traffic Explore",
    domain: "Store Selling",
    subdomain: "Customer Experience",
    description: "Analyze customer traffic patterns and peak shopping times.",
    status: "Critical",
    owner: "CX Analytics Team",
    isFavorite: false
  },
  {
    id: "4",
    type: "Dashboard",
    name: "Labor Scheduling Dashboard",
    domain: "Store Selling",
    subdomain: "Workforce Planning",
    description: "Optimize labor scheduling based on traffic and sales forecasts.",
    status: "Operational",
    owner: "Workforce Planning Team",
    isFavorite: false
  },
  {
    id: "5",
    type: "Explore",
    name: "In-Store Conversion Explore",
    domain: "Store Selling",
    subdomain: "Sales & Performance",
    description: "Deep dive into conversion rates and customer journey analytics.",
    status: "Warning",
    owner: "Sales Analytics Team",
    isFavorite: false
  },
  {
    id: "6",
    type: "Dashboard",
    name: "Average Transaction Value Dashboard",
    domain: "Store Selling",
    subdomain: "Sales & Performance",
    description: "Monitor average transaction values and basket size trends.",
    status: "Operational",
    owner: "Sales Analytics Team",
    isFavorite: false
  },
  {
    id: "7",
    type: "Dashboard",
    name: "Inventory Compliance Dashboard",
    domain: "Store Selling",
    subdomain: "Store Operations",
    description: "Track inventory accuracy and compliance across store locations.",
    status: "Critical",
    owner: "Store Operations Team",
    isFavorite: false
  },
  {
    id: "8",
    type: "Explore",
    name: "Workforce Productivity Explore",
    domain: "Store Selling",
    subdomain: "Workforce Planning",
    description: "Analyze employee productivity and sales per labor hour metrics.",
    status: "Operational",
    owner: "Workforce Planning Team",
    isFavorite: false
  }
];

export const StoreSellingDomainV8 = () => {
  const sdk = useLookerSDK();
  const [mockData, setMockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStoreSellingContent = async () => {
      try {
        setLoading(true);
        const dashboards = await sdk.ok(sdk.all_dashboards("id,title,description,folder,updated_at,view_count"));
        const transformed = Array.isArray(dashboards) ? dashboards.map((dash: any, index: number) => ({
          id: dash.id?.toString() || String(index),
          type: "Dashboard",
          name: dash.title || "Untitled",
          domain: "Store Selling",
          subdomain: dash.folder?.name || "Store Operations",
          description: dash.description || "Store dashboard",
          status: (dash.view_count && dash.view_count > 100) ? "Operational" : "Warning",
          owner: "Retail Analytics"
        })) : [];
        setMockData(transformed);
      } catch (error) {
        console.error("Error:", error);
        setMockData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreSellingContent();
  }, [sdk]);
  
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [subdomainFilter, setSubdomainFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  if (loading) return <div className="p-12 text-center text-muted-foreground">Loading...</div>;

  // Get unique values for filters
  const uniqueOwners = Array.from(new Set(mockData.map(item => item.owner))).sort();
  const uniqueSubdomains = [
    "Store Operations",
    "Sales & Performance",
    "Customer Experience",
    "Workforce Planning"
  ];

  const filteredData = mockData.filter(item => {
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesSubdomain = subdomainFilter === "all" || item.subdomain === subdomainFilter;
    const matchesOwner = ownerFilter === "all" || item.owner === ownerFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesType && matchesSubdomain && matchesOwner && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
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
    <div className="p-8 lg:p-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section with Title and Info Cards */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
          {/* Page Title & Subtitle - Left Side */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Store Selling Performance</h2>
            <p className="text-sm text-muted-foreground">
              Explore dashboards and explores tracking store operations, sales, and conversion metrics.
            </p>
          </div>

          {/* Info Cards - Right Side */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 lg:flex-shrink-0">
            <Card className="p-3 lg:p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer w-full sm:max-w-[280px]">
              <BookOpen className="h-5 w-5 text-foreground flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-foreground">Access & Onboarding</h3>
                <p className="text-xs text-muted-foreground">
                  Guides for store performance and retail analytics.
                </p>
              </div>
            </Card>

            <Card className="p-3 lg:p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer w-full sm:max-w-[280px]">
              <GraduationCap className="h-5 w-5 text-foreground flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-foreground">Training & Resources</h3>
                <p className="text-xs text-muted-foreground">
                  Learn how to navigate sales and operations dashboards.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Dashboard">Dashboard</SelectItem>
                <SelectItem value="Explore">Explore</SelectItem>
              </SelectContent>
            </Select>

            <Select value={subdomainFilter} onValueChange={setSubdomainFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Subdomain" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Subdomains</SelectItem>
                {uniqueSubdomains.map(subdomain => (
                  <SelectItem key={subdomain} value={subdomain}>
                    {subdomain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ownerFilter} onValueChange={setOwnerFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Owners</SelectItem>
                {uniqueOwners.map(owner => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Card Layout */}
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No results found. Try adjusting your filters.
            </div>
          ) : (
            filteredData.map(item => (
              <Card
                key={item.id}
                className="p-5 hover:shadow-md transition-all cursor-pointer h-[180px] flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  {/* Icon */}
                  <div className="mt-0.5">
                    {item.type === "Dashboard" ? (
                      <LayoutGrid className="h-5 w-5 text-foreground" />
                    ) : (
                      <Search className="h-5 w-5 text-foreground" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground flex-1 line-clamp-2">
                    {item.name}
                  </h3>
                </div>

                {/* Metadata */}
                <div className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {item.domain} / {item.subdomain}
                </div>

                <div className="text-xs text-muted-foreground mb-3 line-clamp-1">
                  Owner: {item.owner}
                </div>

                {/* Status Badge - Bottom Right */}
                <div className="mt-auto flex justify-end">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", getStatusBadgeColor(item.status))}
                  >
                    {item.status === "Operational" && "🟢 "}
                    {item.status === "Warning" && "🟡 "}
                    {item.status === "Critical" && "🔴 "}
                    {item.status}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
