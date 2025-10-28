import { useState } from "react";
import { Search, Heart, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface DirectoryItem {
  id: string;
  type: "Dashboard" | "Explore";
  name: string;
  domain: string;
  subdomain: string;
  description: string;
  status: "Live" | "Updating" | "Deprecated";
  environment: "Production" | "QA" | "Dev";
  access: "Viewer" | "Editor" | "Admin";
  owner: string;
  lastUpdated: string;
  isFavorite: boolean;
}

const mockData: DirectoryItem[] = [
  {
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
    lastUpdated: "2025-10-27",
    isFavorite: false,
  },
  {
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
    lastUpdated: "2025-10-26",
    isFavorite: true,
  },
  {
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
    lastUpdated: "2025-10-25",
    isFavorite: false,
  },
  {
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
    lastUpdated: "2025-10-24",
    isFavorite: true,
  },
  {
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
    lastUpdated: "2025-10-23",
    isFavorite: false,
  },
  {
    id: "6",
    type: "Dashboard",
    name: "Quarterly Budget Summary",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "High-level quarterly budget performance overview",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-22",
    isFavorite: false,
  },
  {
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
    lastUpdated: "2025-10-21",
    isFavorite: true,
  },
  {
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
    lastUpdated: "2025-10-20",
    isFavorite: false,
  },
  {
    id: "9",
    type: "Dashboard",
    name: "Budget Forecast Accuracy",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Measure accuracy of budget forecasts vs actual results",
    status: "Updating",
    environment: "QA",
    access: "Admin",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-19",
    isFavorite: false,
  },
  {
    id: "10",
    type: "Dashboard",
    name: "Annual Budget Planning",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Strategic planning dashboard for annual budget cycles",
    status: "Live",
    environment: "Production",
    access: "Editor",
    owner: "Strategic Finance",
    lastUpdated: "2025-10-18",
    isFavorite: true,
  },
  {
    id: "11",
    type: "Explore",
    name: "Variance Analysis Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Detailed variance analysis between budget and actuals",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-17",
    isFavorite: false,
  },
  {
    id: "12",
    type: "Dashboard",
    name: "Rolling Forecast Dashboard",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "12-month rolling forecast with scenario planning",
    status: "Live",
    environment: "Production",
    access: "Editor",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-16",
    isFavorite: false,
  },
  {
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
    lastUpdated: "2025-09-15",
    isFavorite: false,
  },
  {
    id: "14",
    type: "Explore",
    name: "Budget Allocation Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Explore how budgets are allocated across the organization",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-15",
    isFavorite: true,
  },
  {
    id: "15",
    type: "Dashboard",
    name: "Budget vs Actual Comparison",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Side-by-side comparison of budgeted vs actual spending",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-14",
    isFavorite: false,
  },
  {
    id: "16",
    type: "Dashboard",
    name: "FY25 Budget Overview",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Executive-level overview of FY25 budget performance",
    status: "Live",
    environment: "Production",
    access: "Admin",
    owner: "Finance Leadership",
    lastUpdated: "2025-10-13",
    isFavorite: true,
  },
  {
    id: "17",
    type: "Explore",
    name: "Scenario Planning Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Model different budget scenarios and their impact",
    status: "Updating",
    environment: "Dev",
    access: "Editor",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-12",
    isFavorite: false,
  },
  {
    id: "18",
    type: "Dashboard",
    name: "Budget Approval Workflow",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Track status of budget approvals across departments",
    status: "Live",
    environment: "Production",
    access: "Editor",
    owner: "Finance Operations",
    lastUpdated: "2025-10-11",
    isFavorite: false,
  },
  {
    id: "19",
    type: "Dashboard",
    name: "Multi-Year Budget Trends",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Historical budget trends and year-over-year analysis",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-10",
    isFavorite: false,
  },
  {
    id: "20",
    type: "Explore",
    name: "Budget Timeline Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Explore budget changes and adjustments over time",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-09",
    isFavorite: true,
  },
  {
    id: "21",
    type: "Dashboard",
    name: "Budget Reforecasting Dashboard",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Manage and track budget reforecast cycles",
    status: "Live",
    environment: "Production",
    access: "Editor",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-08",
    isFavorite: false,
  },
  {
    id: "22",
    type: "Dashboard",
    name: "Zero-Based Budget Analysis",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Zero-based budgeting approach and analysis dashboard",
    status: "Updating",
    environment: "QA",
    access: "Admin",
    owner: "Strategic Finance",
    lastUpdated: "2025-10-07",
    isFavorite: false,
  },
  {
    id: "23",
    type: "Explore",
    name: "Budget Category Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Explore spending by budget category and subcategory",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Analytics Team",
    lastUpdated: "2025-10-06",
    isFavorite: false,
  },
  {
    id: "24",
    type: "Dashboard",
    name: "Budget Compliance Dashboard",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Monitor budget compliance and policy adherence",
    status: "Live",
    environment: "Production",
    access: "Viewer",
    owner: "Finance Compliance",
    lastUpdated: "2025-10-05",
    isFavorite: false,
  },
];

interface SubdomainDirectoryProps {
  domain: string;
  subdomain: string;
  onBack: () => void;
}

export const SubdomainDirectory = ({ domain, subdomain, onBack }: SubdomainDirectoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockData.filter(item => item.isFavorite).map(item => item.id))
  );

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

  const filteredData = mockData.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesEnvironment = environmentFilter === "all" || item.environment === environmentFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesEnvironment;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200";
      case "Updating":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Deprecated":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getEnvironmentBadgeColor = (environment: string) => {
    switch (environment) {
      case "Production":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "QA":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Dev":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={onBack}
                className="cursor-pointer hover:text-foreground"
              >
                {domain}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subdomain}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-light mb-2 text-foreground">{subdomain}</h1>
          <p className="text-muted-foreground">
            {filteredData.length} items • Last updated Oct 28, 2025 • Owner: Finance Analytics Team
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dashboards and explores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Dashboard">Dashboard</SelectItem>
              <SelectItem value="Explore">Explore</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
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
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Environment</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Access</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-16"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredData.map((item, index) => (
                  <tr 
                    key={item.id}
                    className={cn(
                      "transition-colors duration-150 hover:bg-gray-50 cursor-pointer",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.type === "Dashboard" ? "📊" : "🔍"}</span>
                        <span className="text-sm font-medium text-foreground">{item.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground hover:text-primary">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground max-w-md">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        getStatusBadgeColor(item.status)
                      )}>
                        {item.status === "Live" && "🟢"}
                        {item.status === "Updating" && "🟡"}
                        {item.status === "Deprecated" && "🔴"}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        getEnvironmentBadgeColor(item.environment)
                      )}>
                        {item.environment === "Production" && "✅"}
                        {item.environment === "QA" && "🧪"}
                        {item.environment === "Dev" && "🛠"}
                        {item.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-foreground">{item.access}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">{item.owner}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">{item.lastUpdated}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="transition-all duration-150 hover:scale-110"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5 transition-colors duration-150",
                            favorites.has(item.id) 
                              ? "fill-red-600 text-red-600" 
                              : "text-gray-300 hover:text-gray-400"
                          )}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
