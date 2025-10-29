import { useState } from "react";
import { 
  Home, 
  DollarSign, 
  ShoppingBag, 
  Store, 
  Package, 
  Laptop, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarV8Props {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

const categories = [
  { id: "home", label: "Home", icon: Home },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "merchandising", label: "Merchandising", icon: ShoppingBag },
  { id: "store-selling", label: "Store Selling", icon: Store },
  { id: "supply-chain", label: "Supply Chain", icon: Package },
  { id: "technology", label: "Technology", icon: Laptop },
];

export const SidebarV8 = ({ 
  selectedCategory, 
  onCategorySelect,
  onAdminToggle,
  isAdminMode
}: SidebarV8Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border shadow-sm"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          ${isCollapsed ? 'w-16' : 'w-64'}
          bg-background border-r
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`p-4 border-b flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <img 
                  src="/src/assets/nordstrom-n-logo.png" 
                  alt="Nordstrom" 
                  className="h-8 w-8"
                />
                <span className="font-semibold text-lg">Looker</span>
              </div>
            )}
            {isCollapsed && (
              <img 
                src="/src/assets/nordstrom-n-logo.png" 
                alt="Nordstrom" 
                className="h-8 w-8"
              />
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 rounded hover:bg-accent"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <TooltipProvider delayDuration={0}>
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;

                const buttonContent = (
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Icon className={`${isCollapsed ? 'h-6 w-6' : 'h-5 w-5'} flex-shrink-0`} />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{category.label}</span>
                    )}
                  </button>
                );

                if (isCollapsed) {
                  return (
                    <Tooltip key={category.id}>
                      <TooltipTrigger asChild>
                        {buttonContent}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{category.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={category.id}>{buttonContent}</div>;
              })}
            </TooltipProvider>
          </nav>

          {/* Admin Toggle */}
          <div className="p-4 border-t">
            <TooltipProvider delayDuration={0}>
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onAdminToggle}
                      className={`
                        w-full flex items-center justify-center px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${isAdminMode
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }
                      `}
                    >
                      <Settings className="h-6 w-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Admin Mode</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <button
                  onClick={onAdminToggle}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isAdminMode
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Admin Mode</span>
                </button>
              )}
            </TooltipProvider>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
