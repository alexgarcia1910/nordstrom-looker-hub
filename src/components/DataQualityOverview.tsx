import { AlertCircle, RefreshCw, DollarSign, Package, Store, Truck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface DomainStatus {
  icon: React.ElementType;
  name: string;
  status: "ok" | "warning" | "critical";
  lastRefresh: string;
  notice?: string;
  detailedNotice?: string;
}

interface DataQualityOverviewProps {
  isAdminMode?: boolean;
}

const domainStatuses: DomainStatus[] = [
  {
    icon: DollarSign,
    name: "Finance",
    status: "ok",
    lastRefresh: "1 h ago",
  },
  {
    icon: Package,
    name: "Merchandising",
    status: "warning",
    lastRefresh: "5 h ago",
    notice: "Inventory feed delayed — next refresh 10 AM.",
    detailedNotice: "Inventory feed delayed due to upstream system maintenance — next refresh scheduled for 10 AM.",
  },
  {
    icon: Store,
    name: "Store Selling",
    status: "ok",
    lastRefresh: "2 h ago",
  },
  {
    icon: Truck,
    name: "Supply Chain",
    status: "critical",
    lastRefresh: "6 h ago",
    notice: "Missing sales data from source system.",
    detailedNotice: "Pipeline job failed at 7:15 AM — auto retrying. Missing sales data from source system.",
  },
];

const getStatusColor = (status: "ok" | "warning" | "critical") => {
  switch (status) {
    case "ok":
      return { bg: "bg-green-500", text: "text-green-700", label: "OK" };
    case "warning":
      return { bg: "bg-amber-400", text: "text-amber-700", label: "Delayed" };
    case "critical":
      return { bg: "bg-red-500", text: "text-red-700", label: "Issue" };
  }
};

const getGlobalStatus = (domains: DomainStatus[]) => {
  const hasCritical = domains.some((d) => d.status === "critical");
  const hasWarning = domains.some((d) => d.status === "warning");

  if (hasCritical) {
    const criticalDomain = domains.find((d) => d.status === "critical");
    return {
      icon: "🔴",
      color: "bg-red-50 border-red-200",
      message: `Critical – "${criticalDomain?.notice || "Data pipeline failure detected."}"`,
    };
  }

  if (hasWarning) {
    const warningDomain = domains.find((d) => d.status === "warning");
    return {
      icon: "🟠",
      color: "bg-amber-50 border-amber-200",
      message: `Warning – "${warningDomain?.notice || "Partial delays detected."}"`,
    };
  }

  return {
    icon: "🟢",
    color: "bg-green-50 border-green-200",
    message: "All Systems Operational • Data refreshed 2 hours ago",
  };
};

export const DataQualityOverview = ({ isAdminMode }: DataQualityOverviewProps) => {
  const globalStatus = getGlobalStatus(domainStatuses);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mt-16">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-light text-foreground mb-2 flex items-center gap-2">
          📊 Data Quality Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Monitor the freshness and reliability of data across domains.
        </p>
      </div>

      {/* Tier 1 - Global Status Banner */}
      <Card className={`mb-6 ${globalStatus.color} border`}>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{globalStatus.icon}</span>
              <span className="font-semibold text-foreground">
                {globalStatus.message}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-help">
                    <RefreshCw className="h-4 w-4" />
                    <span className="hidden md:inline">Last checked {currentTime}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last checked {currentTime}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* Tier 2 - Domain-Level Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {domainStatuses.map((domain) => {
          const statusColors = getStatusColor(domain.status);
          const DomainIcon = domain.icon;

          return (
            <TooltipProvider key={domain.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-border">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <DomainIcon className="h-5 w-5 text-foreground" />
                          <span className="font-medium text-foreground">
                            {domain.name}
                          </span>
                        </div>
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${statusColors.bg} ${
                            domain.status === "ok" ? "animate-pulse" : ""
                          }`}
                          style={{
                            boxShadow:
                              domain.status === "ok"
                                ? "0 0 8px rgba(34, 197, 94, 0.5)"
                                : undefined,
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Status</span>
                          <Badge
                            variant={domain.status === "ok" ? "secondary" : "outline"}
                            className={`text-xs ${statusColors.text}`}
                          >
                            {statusColors.label}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Last Refresh
                          </span>
                          <span className="text-xs font-medium text-foreground">
                            {domain.lastRefresh}
                          </span>
                        </div>

                        {domain.notice && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground italic">
                              {domain.notice}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                {domain.detailedNotice && (
                  <TooltipContent className="max-w-xs">
                    <p>{domain.detailedNotice}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Admin-Mode Link */}
      {isAdminMode && (
        <div className="mt-6 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              alert("This would open the Data Quality configuration panel.");
            }}
          >
            ✏️ Update Data Quality Notices
          </a>
        </div>
      )}
    </div>
  );
};
