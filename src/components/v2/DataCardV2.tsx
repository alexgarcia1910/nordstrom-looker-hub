import { useState } from "react";
import { ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DataCardV2Props {
  title: string;
  description: string;
  domain: string;
  type: "Dashboard" | "Explore" | "Dataset";
  isAdminMode: boolean;
}

export const DataCardV2 = ({
  title,
  description,
  domain,
  type,
  isAdminMode,
}: DataCardV2Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rounded-xl p-6 group relative smooth-transition"
      style={{ 
        backgroundColor: "hsl(var(--v2-surface))",
        border: "1px solid hsl(var(--v2-border-soft))",
        boxShadow: isHovered ? "var(--shadow-hover)" : "var(--shadow-soft)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAdminMode && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-3 right-3 h-7 w-7 opacity-0 group-hover:opacity-100 smooth-transition z-10 rounded-lg"
          style={{ 
            borderColor: "hsl(var(--v2-border-soft))",
            backgroundColor: "hsl(var(--v2-surface))"
          }}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      )}
      
      <div className="mb-4">
        <h3 
          className="text-lg font-medium leading-tight mb-3"
          style={{ color: "hsl(var(--v2-text-primary))" }}
        >
          {title}
        </h3>
        <div className="flex gap-2">
          <Badge 
            variant="secondary" 
            className="text-xs font-normal rounded-lg"
            style={{ 
              backgroundColor: "hsl(var(--v2-accent-soft))",
              color: "hsl(var(--v2-text-primary))"
            }}
          >
            {domain}
          </Badge>
          <Badge 
            variant="outline" 
            className="text-xs font-normal rounded-lg"
            style={{ 
              borderColor: "hsl(var(--v2-border-soft))",
              color: "hsl(var(--v2-text-secondary))"
            }}
          >
            {type}
          </Badge>
        </div>
      </div>
      
      <p 
        className="text-sm mb-6 line-clamp-2 leading-relaxed"
        style={{ color: "hsl(var(--v2-text-secondary))" }}
      >
        {description}
      </p>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full rounded-lg smooth-transition"
        style={{
          borderColor: isHovered ? "hsl(var(--v2-black))" : "hsl(var(--v2-border-soft))",
          color: isHovered ? "hsl(var(--v2-black))" : "hsl(var(--v2-text-secondary))",
          backgroundColor: isHovered ? "hsl(var(--v2-accent-soft))" : "transparent"
        }}
      >
        View in Looker
        <ExternalLink className="ml-2 h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
