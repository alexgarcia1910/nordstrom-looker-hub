import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pencil, ArrowRight } from "lucide-react";
import { useState } from "react";

interface QuickAccessTileV2Props {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  isAdminMode: boolean;
}

export const QuickAccessTileV2 = ({
  icon: Icon,
  title,
  description,
  href,
  isAdminMode,
}: QuickAccessTileV2Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rounded-xl p-8 group relative smooth-transition cursor-pointer"
      style={{ 
        backgroundColor: "hsl(var(--v2-surface))",
        boxShadow: isHovered ? "var(--shadow-hover)" : "var(--shadow-soft)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAdminMode && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 smooth-transition z-10 rounded-lg"
          style={{ 
            borderColor: "hsl(var(--v2-border-soft))",
            backgroundColor: "hsl(var(--v2-surface))"
          }}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      )}
      
      <a href={href} className="block">
        <div className="flex items-start gap-6">
          <div 
            className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center smooth-transition"
            style={{ 
              backgroundColor: isHovered ? "hsl(var(--v2-black))" : "hsl(var(--v2-accent-soft))"
            }}
          >
            <Icon 
              className="h-10 w-10 smooth-transition" 
              style={{ color: isHovered ? "hsl(var(--v2-surface))" : "hsl(var(--v2-black))" }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <h3 
                className="text-xl font-medium"
                style={{ color: "hsl(var(--v2-text-primary))" }}
              >
                {title}
              </h3>
              <ArrowRight 
                className={cn(
                  "h-5 w-5 smooth-transition",
                  isHovered ? "translate-x-1" : "translate-x-0"
                )}
                style={{ color: "hsl(var(--v2-text-secondary))" }}
              />
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: "hsl(var(--v2-text-secondary))" }}
            >
              {description}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
