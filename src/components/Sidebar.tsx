import { useState } from "react";
import { Home, Users, DollarSign, ShoppingBag, Store, Truck, Cpu, Menu, X, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import nordstromLogo from "@/assets/nordstrom-n-logo.png";

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

const categories = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "customer", label: "Customer", icon: Users, path: "/" },
  { id: "finance", label: "Finance", icon: DollarSign, path: "/finance" },
  { id: "merchandising", label: "Merchandising", icon: ShoppingBag, path: "/merchandising" },
  { id: "store-selling", label: "Store Selling", icon: Store, path: "/" },
  { id: "supply-chain", label: "Supply Chain", icon: Truck, path: "/" },
  { id: "technology", label: "Technology", icon: Cpu, path: "/" },
];

export const Sidebar = ({ selectedCategory, onCategorySelect, onAdminToggle, isAdminMode }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

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
          "fixed left-0 top-0 h-screen border-r border-border bg-background smooth-transition z-40 flex flex-col",
          "lg:relative lg:h-screen lg:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn("p-4 flex items-center", isCollapsed ? "justify-between gap-2" : "justify-between")}>
          {isCollapsed ? (
            <img 
              src={nordstromLogo} 
              alt="Nordstrom" 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <svg
              className="h-8 w-auto"
              viewBox="0 0 200 50"
              fill="currentColor"
            >
              <text
                x="10"
                y="35"
                fontFamily="serif"
                fontSize="28"
                fontWeight="300"
                letterSpacing="2"
              >
                NORDSTROM
              </text>
            </svg>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="px-3 space-y-1 flex-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = location.pathname === category.path;
            
            const button = (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full font-normal hover:bg-accent",
                  isCollapsed ? "justify-center px-2" : "justify-start",
                  isActive && "bg-secondary font-medium hover:bg-secondary"
                )}
                asChild
              >
                <Link
                  to={category.path}
                  onClick={() => {
                    onCategorySelect(category.id);
                    setIsOpen(false);
                  }}
                >
                  <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && category.label}
                </Link>
              </Button>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={category.id}>
                  <TooltipTrigger asChild>
                    {button}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{category.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return button;
          })}
        </nav>

        <div className="px-3 pb-4 mt-auto pt-4">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={location.pathname === "/admin" ? "secondary" : "ghost"}
                  className="w-full justify-center px-2"
                  asChild
                >
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant={location.pathname === "/admin" ? "secondary" : "ghost"}
              className="w-full justify-start font-normal"
              asChild
            >
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </Link>
            </Button>
          )}
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </TooltipProvider>
  );
};
