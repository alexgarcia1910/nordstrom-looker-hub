import { useState } from "react";
import { Home, Users, DollarSign, ShoppingBag, Store, Truck, Cpu, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
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
}

const categories = [
  { id: "home", label: "Home", icon: Home },
  { id: "customer", label: "Customer", icon: Users },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "merchandising", label: "Merchandising", icon: ShoppingBag },
  { id: "store-selling", label: "Store Selling", icon: Store },
  { id: "supply-chain", label: "Supply Chain", icon: Truck },
  { id: "technology", label: "Technology", icon: Cpu },
];

export const Sidebar = ({ selectedCategory, onCategorySelect }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          "fixed left-0 top-0 h-screen border-r border-border bg-background smooth-transition z-40",
          "lg:relative lg:h-screen lg:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          {isCollapsed ? (
            <img 
              src={nordstromLogo} 
              alt="Nordstrom" 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <svg
              className="h-6 w-auto"
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
            className="hidden lg:flex ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <nav className="px-3 space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            const button = (
              <Button
                key={category.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full font-normal",
                  isCollapsed ? "justify-center px-2" : "justify-start",
                  isActive && "bg-secondary font-medium"
                )}
                onClick={() => {
                  onCategorySelect(category.id);
                  setIsOpen(false);
                }}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && category.label}
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
