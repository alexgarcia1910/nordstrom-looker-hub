import { ExternalLink, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

export const Navbar = ({ onAdminToggle, isAdminMode }: NavbarProps) => {
  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-foreground">
            Welcome to Looker!
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              Job Aids
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              Issue Escalation
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>

          <Button
            variant={isAdminMode ? "default" : "outline"}
            size="sm"
            onClick={onAdminToggle}
            className="ml-2"
          >
            <Settings className="mr-2 h-3 w-3" />
            Admin Mode
          </Button>
          
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
        </div>
      </div>
    </nav>
  );
};
