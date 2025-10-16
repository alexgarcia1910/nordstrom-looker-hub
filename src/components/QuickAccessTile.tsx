import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

interface QuickAccessTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  isAdminMode: boolean;
}

export const QuickAccessTile = ({
  icon: Icon,
  title,
  description,
  href,
  isAdminMode,
}: QuickAccessTileProps) => {
  return (
    <Card className="hover-lift cursor-pointer group relative">
      {isAdminMode && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 smooth-transition z-10"
        >
          <Pencil className="h-3 w-3" />
        </Button>
      )}
      
      <CardContent className="p-8">
        <a href={href} className="block">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
              <Icon className="h-8 w-8 text-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-medium mb-2 text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </a>
      </CardContent>
    </Card>
  );
};
