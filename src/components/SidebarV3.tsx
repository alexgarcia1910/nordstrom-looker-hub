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

interface SidebarV3Props {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

const categories = [
  { id: "home", label: "Home", icon: Home, path: "/v3" },
  { id: "customer", label: "Customer", icon: Users, path: "/v3" },
  { id: "finance", label: "Finance", icon: DollarSign, path: "/v3" },
  { id: "merchandising", label: "Merchandising", icon: ShoppingBag, path: "/v3" },
  { id: "store-selling", label: "Store Selling", icon: Store, path: "/v3" },
  { id: "supply-chain", label: "Supply Chain", icon: Truck, path: "/v3" },
  { id: "technology", label: "Technology", icon: Cpu, path: "/v3" },
];

export const SidebarV3 = ({ selectedCategory, onCategorySelect, onAdminToggle, isAdminMode }: SidebarV3Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <TooltipProvider>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden text-white hover:bg-[#2A2A2A]"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: isOpen ? '#2A2A2A' : 'transparent' }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen smooth-transition z-40 flex flex-col",
          "lg:relative lg:h-screen lg:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ 
          backgroundColor: '#0E0E0E',
          borderRight: '1px solid #2A2A2A',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
          transition: 'all 150ms ease-in-out'
        }}
      >
        <div className="p-4 relative flex items-center justify-between">
          {isCollapsed ? (
            <div className="w-full flex justify-center">
              <img 
                src={nordstromLogo} 
                alt="Nordstrom" 
                className="h-8 w-8 object-contain brightness-0 invert"
              />
            </div>
          ) : (
            <svg
              className="h-8 w-auto text-white"
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
            className={cn("hidden lg:flex text-white hover:bg-[#2A2A2A]", isCollapsed && "absolute -right-3 top-4")}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ transition: 'all 150ms ease-in-out' }}
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
            const isActive = category.path === "/v3"
              ? location.pathname === "/v3" && selectedCategory === category.id
              : location.pathname === category.path;
            
            const button = (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full font-normal text-white hover:bg-[#2A2A2A] relative",
                  isCollapsed ? "justify-center px-2" : "justify-start",
                  isActive && "font-medium"
                )}
                style={{
                  backgroundColor: isActive ? '#1E1E1E' : 'transparent',
                  borderRadius: '8px',
                  borderLeft: isActive ? '2px solid white' : '2px solid transparent',
                  transition: 'all 150ms ease-in-out'
                }}
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
                  <TooltipContent side="right" className="bg-[#2A2A2A] text-white border-[#2A2A2A]">
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
                  variant="ghost"
                  className="w-full justify-center px-2 text-white hover:bg-[#2A2A2A]"
                  style={{
                    backgroundColor: location.pathname === "/admin" ? '#1E1E1E' : 'transparent',
                    borderRadius: '8px',
                    transition: 'all 150ms ease-in-out'
                  }}
                  asChild
                >
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#2A2A2A] text-white border-[#2A2A2A]">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start font-normal text-white hover:bg-[#2A2A2A]"
              style={{
                backgroundColor: location.pathname === "/admin" ? '#1E1E1E' : 'transparent',
                borderRadius: '8px',
                transition: 'all 150ms ease-in-out'
              }}
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