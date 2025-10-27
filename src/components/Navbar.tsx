import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-end px-6 py-4">
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
        </div>
      </div>
    </nav>
  );
};
