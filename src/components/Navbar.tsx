import { BookOpen, AlertCircle, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

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
