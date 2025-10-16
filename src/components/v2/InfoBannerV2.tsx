import { useState } from "react";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InfoBannerV2 = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className="rounded-xl p-8 mb-12 smooth-transition animate-fade-in"
      style={{ 
        backgroundColor: "hsl(var(--v2-info-bg))",
        border: "1px solid hsl(var(--v2-accent-soft))"
      }}
    >
      <div className="flex items-start gap-6">
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ 
            backgroundColor: "hsl(var(--v2-surface))",
            boxShadow: "var(--shadow-soft)"
          }}
        >
          <Info className="h-6 w-6" style={{ color: "hsl(var(--v2-black))" }} />
        </div>
        
        <div className="flex-1">
          <h3 
            className="font-medium mb-4 text-lg"
            style={{ color: "hsl(var(--v2-text-primary))" }}
          >
            3 Things to Know About Looker
          </h3>
          <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "hsl(var(--v2-text-secondary))" }}>
            <li className="flex items-start">
              <span className="mr-3 font-semibold" style={{ color: "hsl(var(--v2-black))" }}>•</span>
              <span>
                <strong className="font-semibold" style={{ color: "hsl(var(--v2-text-primary))" }}>
                  Explore vs Dashboard:
                </strong>{" "}
                Explores let you build custom queries, while Dashboards show pre-built visualizations
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-semibold" style={{ color: "hsl(var(--v2-black))" }}>•</span>
              <span>
                <strong className="font-semibold" style={{ color: "hsl(var(--v2-text-primary))" }}>
                  Finding Trusted Data:
                </strong>{" "}
                Look for domain tags and verified badges to ensure data quality
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-semibold" style={{ color: "hsl(var(--v2-black))" }}>•</span>
              <span>
                <strong className="font-semibold" style={{ color: "hsl(var(--v2-text-primary))" }}>
                  Getting Help:
                </strong>{" "}
                Use Job Aids or Issue Escalation in the top-right for support
              </span>
            </li>
          </ul>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-8 w-8 rounded-lg"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" style={{ color: "hsl(var(--v2-text-secondary))" }} />
        </Button>
      </div>
    </div>
  );
};
