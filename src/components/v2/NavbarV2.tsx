import { ExternalLink, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarV2Props {
  onAdminToggle: () => void;
  isAdminMode: boolean;
  isScrolled: boolean;
}

export const NavbarV2 = ({ onAdminToggle, isAdminMode, isScrolled }: NavbarV2Props) => {
  return (
    <nav 
      className="sticky top-0 z-50 smooth-transition"
      style={{ 
        backgroundColor: "hsl(var(--v2-surface))",
        borderBottom: "1px solid hsl(var(--v2-border-soft))",
        boxShadow: isScrolled ? "var(--shadow-soft)" : "none"
      }}
    >
      <div className={`flex items-center justify-between px-6 lg:px-12 smooth-transition ${isScrolled ? "py-3" : "py-5"}`}>
        <div>
          <h1 
            className="text-2xl lg:text-3xl font-light tracking-tight"
            style={{ color: "hsl(var(--v2-text-primary))" }}
          >
            Welcome to Looker!
          </h1>
        </div>
        
        <div className="flex items-center gap-3 lg:gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal hover:bg-transparent"
            style={{ color: "hsl(var(--v2-text-secondary))" }}
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Job Aids
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal hover:bg-transparent"
            style={{ color: "hsl(var(--v2-text-secondary))" }}
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Issue Escalation
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant={isAdminMode ? "default" : "outline"}
              size="sm"
              onClick={onAdminToggle}
              className="ml-2 rounded-lg"
              style={isAdminMode ? {
                backgroundColor: "hsl(var(--v2-black))",
                color: "hsl(var(--v2-surface))"
              } : {
                borderColor: "hsl(var(--v2-border-soft))",
                color: "hsl(var(--v2-text-secondary))"
              }}
            >
              <Settings className="mr-2 h-3.5 w-3.5" />
              Admin Mode
            </Button>
            {isAdminMode && (
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: "hsl(var(--v2-accent-soft))",
                  color: "hsl(var(--v2-text-secondary))"
                }}
              >
                Active
              </Badge>
            )}
          </div>
          
          <svg
            className="h-7 w-auto hidden lg:block"
            viewBox="0 0 200 50"
            fill="currentColor"
            style={{ color: "hsl(var(--v2-black))" }}
          >
            <text
              x="10"
              y="35"
              fontFamily="serif"
              fontSize="26"
              fontWeight="300"
              letterSpacing="2"
            >
              NORDSTROM
            </text>
          </svg>
        </div>
      </div>
    </nav>
  );
};
