import { useState } from "react";
import { ChevronDown, ChevronRight, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Dashboard {
  id: string;
  name: string;
  description: string;
  environment: "production" | "dev" | "staging";
  requiredRole?: string;
  lastUpdated: string;
}

interface Domain {
  id: string;
  name: string;
  dashboards: Dashboard[];
}

const mockDomains: Domain[] = [
  {
    id: "finance",
    name: "Finance",
    dashboards: [
      { id: "f1", name: "Revenue Overview", description: "Quarterly revenue analysis", environment: "production", lastUpdated: "2 hours ago" },
      { id: "f2", name: "P&L Summary", description: "Profit and loss statements", environment: "production", requiredRole: "Finance Analysts", lastUpdated: "1 day ago" },
      { id: "f3", name: "Budget Tracking", description: "Real-time budget tracking", environment: "dev", lastUpdated: "3 days ago" },
    ],
  },
  {
    id: "merchandising",
    name: "Merchandising",
    dashboards: [
      { id: "m1", name: "Inventory Health", description: "Stock levels and turnover", environment: "production", lastUpdated: "4 hours ago" },
      { id: "m2", name: "Markdown Tracker", description: "Price optimization insights", environment: "production", lastUpdated: "6 hours ago" },
    ],
  },
  {
    id: "store-selling",
    name: "Store Selling",
    dashboards: [
      { id: "s1", name: "Sales Performance", description: "Store-by-store analysis", environment: "production", lastUpdated: "1 hour ago" },
      { id: "s2", name: "Associate Metrics", description: "Team performance tracking", environment: "production", requiredRole: "Store Managers", lastUpdated: "3 hours ago" },
    ],
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    dashboards: [
      { id: "sc1", name: "Distribution Overview", description: "Logistics and fulfillment", environment: "production", lastUpdated: "2 hours ago" },
      { id: "sc2", name: "Supplier Performance", description: "Vendor metrics", environment: "staging", lastUpdated: "1 week ago" },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    dashboards: [
      { id: "t1", name: "System Health", description: "Infrastructure monitoring", environment: "production", lastUpdated: "30 minutes ago" },
    ],
  },
];

interface HierarchicalNavProps {
  isAdminMode: boolean;
  selectedDomain: string | null;
  onDomainSelect: (domain: string | null) => void;
}

export const HierarchicalNav = ({ isAdminMode, selectedDomain, onDomainSelect }: HierarchicalNavProps) => {
  const [expandedDomains, setExpandedDomains] = useState<string[]>(["finance"]);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(["Home"]);

  const toggleDomain = (domainId: string) => {
    if (expandedDomains.includes(domainId)) {
      setExpandedDomains(expandedDomains.filter(id => id !== domainId));
    } else {
      setExpandedDomains([...expandedDomains, domainId]);
    }
  };

  const handleDashboardClick = (domain: Domain, dashboard: Dashboard) => {
    setBreadcrumb(["Home", domain.name, dashboard.name]);
  };

  const filterDashboards = (dashboards: Dashboard[]) => {
    if (isAdminMode) return dashboards;
    return dashboards.filter(d => d.environment === "production");
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
        Browse by Domain
      </h2>

      {/* Breadcrumb */}
      <div 
        className="text-sm mb-6 pb-4"
        style={{ 
          color: "hsl(var(--v2-text-secondary))",
          borderBottom: "1px solid hsl(var(--v2-border-soft))"
        }}
      >
        {breadcrumb.join(" › ")}
      </div>

      {/* Domain List */}
      <div className="space-y-2">
        {mockDomains.map((domain) => {
          const isExpanded = expandedDomains.includes(domain.id);
          const visibleDashboards = filterDashboards(domain.dashboards);

          return (
            <div key={domain.id}>
              {/* Domain Header */}
              <Button
                variant="ghost"
                className="w-full justify-between px-4 py-3 h-auto hover:bg-transparent"
                style={{
                  backgroundColor: isExpanded ? "hsl(var(--v2-accent-soft))" : "transparent"
                }}
                onClick={() => {
                  toggleDomain(domain.id);
                  onDomainSelect(isExpanded ? null : domain.id);
                }}
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" style={{ color: "hsl(var(--v2-text-secondary))" }} />
                  ) : (
                    <ChevronRight className="h-4 w-4" style={{ color: "hsl(var(--v2-text-secondary))" }} />
                  )}
                  <span 
                    className="font-medium"
                    style={{ color: "hsl(var(--v2-text-primary))" }}
                  >
                    {domain.name}
                  </span>
                </div>
                <Badge 
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor: "hsl(var(--v2-accent-soft))",
                    color: "hsl(var(--v2-text-secondary))"
                  }}
                >
                  {visibleDashboards.length}
                </Badge>
              </Button>

              {/* Dashboards List */}
              {isExpanded && (
                <div className="ml-7 mt-2 space-y-1">
                  {visibleDashboards.map((dashboard) => (
                    <TooltipProvider key={dashboard.id}>
                      <div 
                        className="group rounded-lg p-3 cursor-pointer smooth-transition"
                        style={{
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "hsl(var(--v2-accent-soft))";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                        onClick={() => handleDashboardClick(domain, dashboard)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span 
                                className="text-sm font-medium truncate"
                                style={{ color: "hsl(var(--v2-text-primary))" }}
                              >
                                {dashboard.name}
                              </span>
                              {dashboard.environment === "production" && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#10b981" }} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Trusted - Production</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {dashboard.environment !== "production" && isAdminMode && (
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                  style={{
                                    borderColor: "hsl(var(--v2-border-soft))",
                                    color: "hsl(var(--v2-text-secondary))"
                                  }}
                                >
                                  {dashboard.environment === "dev" ? "Dev" : "Staging"}
                                </Badge>
                              )}
                              {dashboard.requiredRole && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Lock className="h-3 w-3 flex-shrink-0" style={{ color: "hsl(var(--v2-text-secondary))" }} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Visible to {dashboard.requiredRole} only</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            <p 
                              className="text-xs truncate"
                              style={{ color: "hsl(var(--v2-text-secondary))" }}
                            >
                              {dashboard.description}
                            </p>
                            <p 
                              className="text-xs mt-1"
                              style={{ color: "hsl(var(--v2-text-secondary))" }}
                            >
                              Updated {dashboard.lastUpdated}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TooltipProvider>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Admin Mode Warning */}
      {!isAdminMode && (
        <div 
          className="mt-6 p-4 rounded-lg"
          style={{ 
            backgroundColor: "hsl(var(--v2-info-bg))",
            border: "1px solid hsl(var(--v2-border-soft))"
          }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--v2-text-secondary))" }} />
            <p 
              className="text-sm"
              style={{ color: "hsl(var(--v2-text-secondary))" }}
            >
              Only production-approved dashboards are shown. For dev dashboards, switch to Admin Mode.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
