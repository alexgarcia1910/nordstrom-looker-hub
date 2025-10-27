import { BookOpen, AlertCircle, Bell, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Find data..."
            className="pl-9 h-9 w-80 rounded-full border-border"
          />
        </div>
        
        <div className="flex items-center gap-4">
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <Link to="/alerts">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="https://nordstrom.com" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Job Aids
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="https://nordstrom.com" target="_blank" rel="noopener noreferrer">
              <AlertCircle className="mr-2 h-4 w-4" />
              Issue Escalation
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
