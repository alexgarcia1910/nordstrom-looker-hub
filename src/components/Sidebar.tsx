import { useState } from "react";
import { Home, Users, DollarSign, ShoppingBag, Store, Truck, Cpu, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-20 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 border-r border-border bg-background smooth-transition z-40",
          "lg:relative lg:top-0 lg:h-auto lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start font-normal",
                  isActive && "bg-secondary font-medium"
                )}
                onClick={() => {
                  onCategorySelect(category.id);
                  setIsOpen(false);
                }}
              >
                <Icon className="mr-3 h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
