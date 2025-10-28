import { useState } from "react";
import { Home, Users, DollarSign, ShoppingBag, Store, Truck, Cpu, Menu, X, Settings, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarV4Props {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

const categories = [
  { 
    id: "home", 
    label: "Home", 
    icon: Home, 
    path: "/v4",
    subdomains: []
  },
  { 
    id: "customer", 
    label: "Customer", 
    icon: Users, 
    path: "/v4",
    subdomains: [
      "Customer 360",
      "Loyalty & Rewards",
      "Feedback & NPS",
      "Retention Analysis"
    ]
  },
  { 
    id: "finance", 
    label: "Finance", 
    icon: DollarSign, 
    path: "/v4",
    subdomains: [
      "Performance & KPIs",
      "Budgeting & Forecasting",
      "AP & AR",
      "Profitability Analysis"
    ]
  },
  { 
    id: "merchandising", 
    label: "Merchandising", 
    icon: ShoppingBag, 
    path: "/v4",
    subdomains: [
      "Inventory Management",
      "Product Performance",
      "Pricing & Promotions",
      "Vendor Management"
    ]
  },
  { 
    id: "store-selling", 
    label: "Store Selling", 
    icon: Store, 
    path: "/v4",
    subdomains: [
      "Store Operations",
      "Sales Performance",
      "Customer Experience",
      "Training & Onboarding"
    ]
  },
  { 
    id: "supply-chain", 
    label: "Supply Chain", 
    icon: Truck, 
    path: "/v4",
    subdomains: [
      "Inventory Flow",
      "Shipping & Logistics",
      "Procurement",
      "Sustainability Metrics"
    ]
  },
  { 
    id: "technology", 
    label: "Technology", 
    icon: Cpu, 
    path: "/v4",
    subdomains: [
      "System Health",
      "Application Metrics",
      "Support Tickets",
      "Data Governance"
    ]
  },
];

export const SidebarV4 = ({ selectedCategory, onCategorySelect, onAdminToggle, isAdminMode }: SidebarV4Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [selectedSubdomain, setSelectedSubdomain] = useState<string | null>(null);
  const location = useLocation();

  const handleDomainClick = (categoryId: string) => {
    if (categories.find(c => c.id === categoryId)?.subdomains.length) {
      // Toggle expansion for domains with subdomains
      setExpandedDomain(expandedDomain === categoryId ? null : categoryId);
    } else {
      // For domains without subdomains (Home), just select it
      onCategorySelect(categoryId);
      setIsOpen(false);
    }
  };

  const handleSubdomainClick = (categoryId: string, subdomain: string) => {
    console.log(`Navigating to ${categories.find(c => c.id === categoryId)?.label} → ${subdomain}`);
    setSelectedSubdomain(subdomain);
    onCategorySelect(categoryId);
    setIsOpen(false);
  };

  return (
    <TooltipProvider>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-background border-r smooth-transition z-40 flex flex-col overflow-y-auto",
          "lg:relative lg:h-screen lg:translate-x-0",
          "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4">
          <h1 className="text-xl font-light tracking-wide text-foreground">
            NORDSTROM
          </h1>
        </div>

        <nav className="px-3 space-y-1 flex-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = location.pathname === "/v4" && selectedCategory === category.id;
            const isExpanded = expandedDomain === category.id;
            const hasSubdomains = category.subdomains.length > 0;
            
            return (
              <div key={category.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full font-normal justify-start relative hover:bg-muted/50",
                    isActive && !selectedSubdomain && "font-medium bg-muted"
                  )}
                  style={{
                    borderLeft: isActive && !selectedSubdomain ? '3px solid black' : '3px solid transparent',
                    transition: 'all 150ms ease-in-out'
                  }}
                  onClick={() => handleDomainClick(category.id)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {category.label}
                  {hasSubdomains && (
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 ml-auto transition-transform duration-200",
                        isExpanded && "rotate-90"
                      )} 
                    />
                  )}
                </Button>

                {hasSubdomains && isExpanded && (
                  <div className="ml-7 mt-1 space-y-1 animate-accordion-down">
                    {category.subdomains.map((subdomain) => {
                      const isSubdomainActive = selectedSubdomain === subdomain && selectedCategory === category.id;
                      
                      return (
                        <Button
                          key={subdomain}
                          variant="ghost"
                          className={cn(
                            "w-full font-normal justify-start text-sm hover:bg-muted/50 pl-4",
                            isSubdomainActive && "font-medium bg-muted"
                          )}
                          style={{
                            borderLeft: isSubdomainActive ? '3px solid black' : '3px solid transparent',
                            transition: 'all 150ms ease-in-out'
                          }}
                          onClick={() => handleSubdomainClick(category.id, subdomain)}
                        >
                          {subdomain}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-3 pb-4 mt-auto pt-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start font-normal hover:bg-muted/50",
              location.pathname === "/admin" && "font-medium bg-muted"
            )}
            style={{
              borderLeft: location.pathname === "/admin" ? '3px solid black' : '3px solid transparent',
              transition: 'all 150ms ease-in-out'
            }}
            asChild
          >
            <Link to="/admin" onClick={() => setIsOpen(false)}>
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Link>
          </Button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </TooltipProvider>
  );
};
