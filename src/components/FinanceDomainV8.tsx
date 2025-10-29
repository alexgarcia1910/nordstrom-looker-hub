import { useState } from "react";
import { Heart, LayoutGrid, Search, BookOpen, GraduationCap } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { cn } from "@/lib/utils";
interface DirectoryItem {
  id: string;
  type: "Dashboard" | "Explore";
  name: string;
  domain: string;
  subdomain: string;
  description: string;
  status: "Live" | "Updating" | "Deprecated";
  environment: "Production" | "QA" | "Dev" | "Sandbox" | "Archived";
  access: "Viewer" | "Editor" | "Admin";
  owner: string;
  isFavorite: boolean;
}
const mockData: DirectoryItem[] = [{
  id: "1",
  type: "Dashboard",
  name: "Monthly Budget Performance",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Track monthly budget vs actuals across all departments",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "2",
  type: "Explore",
  name: "Budget Details Explore",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Deep dive into budget line items and allocation details",
  status: "Live",
  environment: "Production",
  access: "Editor",
  owner: "Finance Analytics Team",
  isFavorite: true
}, {
  id: "3",
  type: "Dashboard",
  name: "OPEX Variance by Region",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Regional operating expense variance analysis dashboard",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Regional Finance",
  isFavorite: false
}, {
  id: "4",
  type: "Dashboard",
  name: "Headcount Forecast FY25",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Full-year headcount planning and budget allocation",
  status: "Updating",
  environment: "QA",
  access: "Editor",
  owner: "HR Finance Team",
  isFavorite: true
}, {
  id: "5",
  type: "Explore",
  name: "Cost Center Analysis Explore",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Analyze spending patterns by cost center and department",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "6",
  type: "Dashboard",
  name: "Financial Performance Dashboard",
  domain: "Finance",
  subdomain: "Performance & KPIs",
  description: "Tracks financial performance metrics and KPI trends across divisions",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "7",
  type: "Dashboard",
  name: "Capital Expenditure Tracking",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Monitor capital projects and spending against budget",
  status: "Live",
  environment: "Production",
  access: "Editor",
  owner: "Finance Analytics Team",
  isFavorite: true
}, {
  id: "8",
  type: "Explore",
  name: "Departmental Budget Explore",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Explore budget data by department and time period",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "9",
  type: "Dashboard",
  name: "Accounts Payable Overview",
  domain: "Finance",
  subdomain: "AP & AR",
  description: "Comprehensive view of accounts payable aging and trends",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "AP Team",
  isFavorite: false
}, {
  id: "10",
  type: "Dashboard",
  name: "Accounts Receivable Summary",
  domain: "Finance",
  subdomain: "AP & AR",
  description: "Track receivables, aging, and collection metrics",
  status: "Live",
  environment: "Production",
  access: "Editor",
  owner: "AR Team",
  isFavorite: true
}, {
  id: "11",
  type: "Dashboard",
  name: "Profitability by Product Line",
  domain: "Finance",
  subdomain: "Profitability Analysis",
  description: "Detailed profitability metrics segmented by product",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "12",
  type: "Explore",
  name: "Margin Analysis Explore",
  domain: "Finance",
  subdomain: "Profitability Analysis",
  description: "Interactive exploration of margin trends and drivers",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "13",
  type: "Dashboard",
  name: "Budget Utilization Metrics",
  domain: "Finance",
  subdomain: "Budgeting & Forecasting",
  description: "Track budget utilization rates across all cost centers",
  status: "Deprecated",
  environment: "Production",
  access: "Viewer",
  owner: "Legacy Systems",
  isFavorite: false
}, {
  id: "14",
  type: "Explore",
  name: "Revenue Trend Explore",
  domain: "Finance",
  subdomain: "Performance & KPIs",
  description: "Explore revenue patterns and trends across time periods",
  status: "Live",
  environment: "Production",
  access: "Viewer",
  owner: "Finance Analytics Team",
  isFavorite: false
}, {
  id: "15",
  type: "Dashboard",
  name: "Cash Flow Summary",
  domain: "Finance",
  subdomain: "Performance & KPIs",
  description: "Daily and monthly cash flow analysis with forecasting",
  status: "Updating",
  environment: "QA",
  access: "Editor",
  owner: "Treasury Team",
  isFavorite: false
}];
export const FinanceDomainV8 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [accessFilter, setAccessFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [subdomainFilter, setSubdomainFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(mockData.filter(item => item.isFavorite).map(item => item.id)));
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Get unique values for filters
  const uniqueOwners = Array.from(new Set(mockData.map(item => item.owner))).sort();
  const uniqueSubdomains = Array.from(new Set(mockData.map(item => item.subdomain))).sort();
  const filteredData = mockData.filter(item => {
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesEnvironment = environmentFilter === "all" || item.environment === environmentFilter;
    const matchesAccess = accessFilter === "all" || item.access === accessFilter;
    const matchesOwner = ownerFilter === "all" || item.owner === ownerFilter;
    const matchesSubdomain = subdomainFilter === "all" || item.subdomain === subdomainFilter;
    return matchesSearch && matchesType && matchesStatus && matchesEnvironment && matchesAccess && matchesOwner && matchesSubdomain;
  });
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-50 text-green-700 border-green-200";
      case "Updating":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Deprecated":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  const getEnvironmentBadgeColor = (environment: string) => {
    switch (environment) {
      case "Production":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Sandbox":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Archived":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "QA":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Dev":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  return <div className="p-8 lg:p-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Info Cards - Top Right */}
        <div className="mb-6 flex justify-end gap-4">
          <Card className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer max-w-sm">
            <BookOpen className="h-5 w-5 text-foreground flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">Access & Onboarding</h3>
              <p className="text-xs text-muted-foreground">Finance setup guides and onboarding resources.</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer max-w-sm">
            <GraduationCap className="h-5 w-5 text-foreground flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">Training & Resources</h3>
              <p className="text-xs text-muted-foreground">Learn best practices and access training material.</p>
            </div>
          </Card>
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Deprecated">Deprecated</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Sandbox">Sandbox</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={accessFilter} onValueChange={setAccessFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Access" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Access</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ownerFilter} onValueChange={setOwnerFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Owners</SelectItem>
                {uniqueOwners.map(owner => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={subdomainFilter} onValueChange={setSubdomainFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Subdomain" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Subdomains</SelectItem>
                {uniqueSubdomains.map(subdomain => <SelectItem key={subdomain} value={subdomain}>{subdomain}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Environment</TableHead>
                <TableHead className="font-semibold">Access</TableHead>
                <TableHead className="font-semibold">Owner</TableHead>
                <TableHead className="font-semibold">Subdomain</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                    No results found. Try adjusting your filters.
                  </TableCell>
                </TableRow> : filteredData.map(item => <TableRow key={item.id} className="hover:bg-muted/50 cursor-pointer transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.type === "Dashboard" ? <LayoutGrid className="h-4 w-4 text-foreground" /> : <Search className="h-4 w-4 text-foreground" />}
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground max-w-md text-sm">
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs", getStatusBadgeColor(item.status))}>
                        {item.status === "Live" && "🟢 "}
                        {item.status === "Updating" && "🟡 "}
                        {item.status === "Deprecated" && "🔴 "}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs", getEnvironmentBadgeColor(item.environment))}>
                        {item.environment === "Production" && "✅ "}
                        {item.environment === "QA" && "🧪 "}
                        {item.environment === "Dev" && "🛠 "}
                        {item.environment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.access}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.owner}</TableCell>
                    <TableCell className="text-sm">{item.subdomain}</TableCell>
                    <TableCell className="text-center">
                      {item.type === "Dashboard" && <button onClick={e => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }} className="transition-all duration-150 hover:scale-110">
                          <Heart className={cn("h-5 w-5 transition-colors", favorites.has(item.id) ? "fill-red-600 text-red-600" : "text-gray-300 hover:text-gray-500")} />
                        </button>}
                    </TableCell>
                  </TableRow>)}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>;
};