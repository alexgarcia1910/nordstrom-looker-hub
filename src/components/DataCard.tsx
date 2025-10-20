import { ExternalLink, Pencil, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DataCardProps {
  title: string;
  description: string;
  domain: string;
  type: "Dashboard" | "Explore" | "Dataset";
  isAdminMode: boolean;
}

export const DataCard = ({
  title,
  description,
  domain,
  type,
  isAdminMode,
}: DataCardProps) => {
  return (
    <Card className="hover-lift group relative">
      {isAdminMode && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 smooth-transition z-10"
        >
          <Pencil className="h-3 w-3" />
        </Button>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-medium leading-tight">
            {title}
          </CardTitle>
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {domain}
          </Badge>
          <Badge variant="outline" className="text-xs font-normal">
            {type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
          <span>Environment: Production</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        <Button variant="outline" size="sm" className="w-full">
          View in Looker
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};
