import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ActivityItem {
  name: string;
  domain: string;
  timestamp: string;
}

interface ActivityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: ActivityItem[];
  actionLabel?: string;
  actionHref?: string;
}

export const ActivityCard = ({
  icon: Icon,
  title,
  description,
  items,
  actionLabel,
  actionHref = "#",
}: ActivityCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary flex items-center justify-center">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-medium mb-1 text-foreground">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-2 sm:gap-3 p-2 sm:p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs sm:text-sm text-foreground truncate">
                  {item.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">
                  {item.domain} · {item.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {actionLabel && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sm"
            asChild
          >
            <a href={actionHref}>
              {actionLabel} →
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
