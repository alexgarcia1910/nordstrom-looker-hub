import { useState } from "react";
import { Home, Users, DollarSign, ShoppingBag, Store, Truck, Cpu, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarV2Props {
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

export const SidebarV2 = ({ selectedCategory, onCategorySelect }: SidebarV2Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-20 z-50 lg:hidden rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: "hsl(var(--v2-surface))", boxShadow: "var(--shadow-soft)" }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed left-0 top-[73px] h-[calc(100vh-73px)] border-r smooth-transition z-40",
          "lg:relative lg:top-0 lg:h-auto lg:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ 
          backgroundColor: "hsl(var(--v2-surface))",
          borderColor: "hsl(var(--v2-border-soft))"
        }}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex ml-auto mb-2 rounded-lg"
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
                variant="ghost"
                className={cn(
                  "w-full font-normal rounded-xl smooth-transition",
                  isCollapsed ? "justify-center px-2" : "justify-start",
                  isActive && "font-medium"
                )}
                style={isActive ? {
                  backgroundColor: "hsl(var(--v2-accent-soft))",
                  color: "hsl(var(--v2-black))",
                  borderBottom: "2px solid hsl(var(--v2-black))"
                } : {
                  color: "hsl(var(--v2-text-secondary))"
                }}
                onClick={() => {
                  onCategorySelect(category.id);
                  setIsOpen(false);
                }}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
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
          className="fixed inset-0 bg-black/10 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </TooltipProvider>
  );
};
