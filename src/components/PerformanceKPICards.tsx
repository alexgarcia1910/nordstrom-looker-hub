import { useState } from "react";
import { Search, Heart, Eye, Clock, User, ExternalLink, Link as LinkIcon, TrendingUp, PieChart } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DashboardItem {
  id: string;
  type: "Dashboard" | "Explore";
  title: string;
  domain: string;
  subdomain: string;
  description: string;
  status: "Live" | "Updating" | "Deprecated";
  environment: "Production" | "QA" | "Dev";
  views: number;
  favorites: number;
  lastUpdated: string;
  owner: string;
  isFavorited: boolean;
}

const mockDashboards: DashboardItem[] = [
  {
    id: "1",
    type: "Dashboard",
    title: "Financial Performance Dashboard",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Tracks financial performance metrics, profitability, and KPI trends across divisions.",
    status: "Live",
    environment: "Production",
    views: 342,
    favorites: 28,
    lastUpdated: "2 days ago",
    owner: "Finance Analytics Team",
    isFavorited: false,
  },
  {
    id: "2",
    type: "Dashboard",
    title: "Monthly Profit & Loss Overview",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Comprehensive P&L analysis with month-over-month comparisons and variance tracking.",
    status: "Live",
    environment: "Production",
    views: 289,
    favorites: 35,
    lastUpdated: "1 day ago",
    owner: "Finance Analytics Team",
    isFavorited: false,
  },
  {
    id: "3",
    type: "Dashboard",
    title: "KPI Trends by Business Unit",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Key performance indicators segmented by business unit with trend analysis.",
    status: "Live",
    environment: "Production",
    views: 215,
    favorites: 22,
    lastUpdated: "3 days ago",
    owner: "Business Intelligence Team",
    isFavorited: false,
  },
  {
    id: "4",
    type: "Explore",
    title: "Expense Ratio Explore",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Interactive exploration of expense ratios across departments and cost centers.",
    status: "Updating",
    environment: "QA",
    views: 178,
    favorites: 15,
    lastUpdated: "5 days ago",
    owner: "Finance Analytics Team",
    isFavorited: false,
  },
  {
    id: "5",
    type: "Dashboard",
    title: "Budget vs Actuals",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Real-time comparison of budgeted amounts versus actual spending and revenue.",
    status: "Deprecated",
    environment: "Production",
    views: 412,
    favorites: 45,
    lastUpdated: "1 day ago",
    owner: "Finance Planning Team",
    isFavorited: false,
  },
  {
    id: "6",
    type: "Dashboard",
    title: "Cash Flow Summary",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Daily and monthly cash flow analysis with forecasting and trend indicators.",
    status: "Updating",
    environment: "QA",
    views: 298,
    favorites: 31,
    lastUpdated: "2 days ago",
    owner: "Treasury Team",
    isFavorited: false,
  },
  {
    id: "7",
    type: "Dashboard",
    title: "Forecast Accuracy Dashboard",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Measures forecast accuracy and variance for financial planning improvements.",
    status: "Updating",
    environment: "QA",
    views: 156,
    favorites: 12,
    lastUpdated: "4 days ago",
    owner: "FP&A Team",
    isFavorited: false,
  },
  {
    id: "8",
    type: "Dashboard",
    title: "Revenue Variance by Region",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Regional revenue performance with variance analysis and growth trends.",
    status: "Live",
    environment: "Production",
    views: 267,
    favorites: 28,
    lastUpdated: "1 day ago",
    owner: "Regional Finance Team",
    isFavorited: false,
  },
  {
    id: "9",
    type: "Explore",
    title: "GL Account Explore",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Detailed general ledger account exploration with drill-down capabilities.",
    status: "Live",
    environment: "Production",
    views: 198,
    favorites: 18,
    lastUpdated: "3 days ago",
    owner: "Accounting Team",
    isFavorited: false,
  },
  {
    id: "10",
    type: "Dashboard",
    title: "Operating Margin Tracker",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Monitors operating margins across products and business segments.",
    status: "Live",
    environment: "Production",
    views: 245,
    favorites: 26,
    lastUpdated: "2 days ago",
    owner: "Finance Analytics Team",
    isFavorited: false,
  },
  {
    id: "11",
    type: "Dashboard",
    title: "Opex and Capex Insights",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Operating and capital expenditure analysis with budget tracking.",
    status: "Live",
    environment: "Production",
    views: 223,
    favorites: 24,
    lastUpdated: "2 days ago",
    owner: "Finance Planning Team",
    isFavorited: false,
  },
  {
    id: "12",
    type: "Dashboard",
    title: "Headcount and Payroll Summary",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Comprehensive view of headcount trends and payroll expenses by department.",
    status: "Live",
    environment: "Production",
    views: 189,
    favorites: 19,
    lastUpdated: "3 days ago",
    owner: "HR Finance Team",
    isFavorited: false,
  },
  {
    id: "13",
    type: "Dashboard",
    title: "Finance KPI Overview – Q3",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Quarterly snapshot of all key financial indicators and performance metrics.",
    status: "Live",
    environment: "Production",
    views: 334,
    favorites: 38,
    lastUpdated: "1 day ago",
    owner: "Executive Finance Team",
    isFavorited: false,
  },
  {
    id: "14",
    type: "Dashboard",
    title: "Profitability Index Report",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Project and product profitability analysis with ROI calculations.",
    status: "Live",
    environment: "Production",
    views: 201,
    favorites: 21,
    lastUpdated: "4 days ago",
    owner: "Finance Analytics Team",
    isFavorited: false,
  },
  {
    id: "15",
    type: "Dashboard",
    title: "Cost Allocation by Division",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Divisional cost allocation with transparency into shared services and overhead.",
    status: "Deprecated",
    environment: "Production",
    views: 167,
    favorites: 14,
    lastUpdated: "5 days ago",
    owner: "Corporate Finance Team",
    isFavorited: false,
  },
  {
    id: "16",
    type: "Explore",
    title: "Expense Transaction Explore",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Granular exploration of expense transactions with filtering and export options.",
    status: "Live",
    environment: "Production",
    views: 143,
    favorites: 11,
    lastUpdated: "6 days ago",
    owner: "Finance Operations Team",
    isFavorited: false,
  },
  {
    id: "17",
    type: "Dashboard",
    title: "Revenue by Channel Dashboard",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Channel-specific revenue tracking with conversion and growth metrics.",
    status: "Live",
    environment: "Production",
    views: 276,
    favorites: 29,
    lastUpdated: "2 days ago",
    owner: "Revenue Analytics Team",
    isFavorited: false,
  },
  {
    id: "18",
    type: "Dashboard",
    title: "Quarterly Performance Scorecard",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Executive scorecard showing quarterly performance against strategic goals.",
    status: "Live",
    environment: "Production",
    views: 389,
    favorites: 42,
    lastUpdated: "1 day ago",
    owner: "Executive Finance Team",
    isFavorited: false,
  },
  {
    id: "19",
    type: "Dashboard",
    title: "Cash Flow Forecasting Model",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Predictive cash flow model with scenario planning and sensitivity analysis.",
    status: "Updating",
    environment: "QA",
    views: 134,
    favorites: 10,
    lastUpdated: "7 days ago",
    owner: "Treasury Team",
    isFavorited: false,
  },
  {
    id: "20",
    type: "Dashboard",
    title: "Variance Analysis Dashboard",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Detailed variance analysis between forecast, budget, and actuals with root cause insights.",
    status: "Live",
    environment: "Production",
    views: 312,
    favorites: 33,
    lastUpdated: "2 days ago",
    owner: "FP&A Team",
    isFavorited: false,
  },
];

export const PerformanceKPICards = () => {
  const [dashboards, setDashboards] = useState<DashboardItem[]>(mockDashboards);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("views");

  const toggleFavorite = (id: string) => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === id
          ? { ...dashboard, isFavorited: !dashboard.isFavorited }
          : dashboard
      )
    );
  };

  const filteredDashboards = dashboards
    .filter((dashboard) => {
      const matchesSearch =
        dashboard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dashboard.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || dashboard.type === typeFilter;
      const matchesStatus = statusFilter === "all" || dashboard.status === statusFilter;
      const matchesEnvironment =
        environmentFilter === "all" || dashboard.environment === environmentFilter;

      return matchesSearch && matchesType && matchesStatus && matchesEnvironment;
    })
    .sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "favorites") return b.favorites - a.favorites;
      if (sortBy === "updated") return a.lastUpdated.localeCompare(b.lastUpdated);
      return 0;
    });

  const getEnvironmentBadgeColor = (env: string) => {
    if (env === "Production") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (env === "QA") return "bg-amber-50 text-amber-700 border-amber-200";
    if (env === "Dev") return "bg-blue-50 text-blue-700 border-blue-200";
    return "";
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === "Live") return "bg-green-50 text-green-700 border-green-200";
    if (status === "Updating") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (status === "Deprecated") return "bg-red-50 text-red-700 border-red-200";
    return "";
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Finance Performance & KPIs</h1>
        <p className="text-sm text-muted-foreground">
          Dashboards and explores tracking financial KPIs and profitability metrics.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-card p-3 rounded-lg border">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Dashboard">Dashboard</SelectItem>
            <SelectItem value="Explore">Explore</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Live">Live</SelectItem>
            <SelectItem value="Updating">Updating</SelectItem>
            <SelectItem value="Deprecated">Deprecated</SelectItem>
          </SelectContent>
        </Select>

        <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Environments</SelectItem>
            <SelectItem value="Production">Production</SelectItem>
            <SelectItem value="QA">QA</SelectItem>
            <SelectItem value="Dev">Dev</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dashboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="views">Sort by Views</SelectItem>
            <SelectItem value="favorites">Sort by Favorites</SelectItem>
            <SelectItem value="updated">Sort by Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      {filteredDashboards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No dashboards available in this subdomain yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              className="group relative p-5 bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border flex flex-col h-[220px]"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {dashboard.type === "Dashboard" ? (
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <PieChart className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                  <h3 className="font-semibold text-base leading-tight text-foreground truncate">
                    {dashboard.title}
                  </h3>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-3 flex-wrap">
                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-0.5 ${getEnvironmentBadgeColor(dashboard.environment)}`}
                >
                  {dashboard.environment === "Production" && "✅ "}
                  {dashboard.environment === "QA" && "🧪 "}
                  {dashboard.environment === "Dev" && "🛠 "}
                  {dashboard.environment}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-0.5 ${getStatusBadgeColor(dashboard.status)}`}
                >
                  {dashboard.status === "Live" && "🟢 "}
                  {dashboard.status === "Updating" && "🟡 "}
                  {dashboard.status === "Deprecated" && "🔴 "}
                  {dashboard.status}
                </Badge>
              </div>

              {/* Domain / Subdomain */}
              <p className="text-xs text-muted-foreground mb-2">
                {dashboard.domain} / {dashboard.subdomain}
              </p>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-auto line-clamp-2">
                {dashboard.description}
              </p>

              {/* Metadata Row */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t">
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{dashboard.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      dashboard.isFavorited ? "fill-red-600 text-red-600" : ""
                    }`}
                  />
                  <span>{dashboard.favorites}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{dashboard.lastUpdated}</span>
                </div>
              </div>

              {/* Hover Action Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm border-t opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex items-center justify-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                  onClick={() => toggleFavorite(dashboard.id)}
                >
                  <Heart
                    className={`h-3 w-3 mr-1 ${
                      dashboard.isFavorited ? "fill-red-600 text-red-600" : ""
                    }`}
                  />
                  Favorite
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
