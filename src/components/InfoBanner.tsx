import { useState } from "react";
import { X, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const InfoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="bg-secondary border-border mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <Info className="h-5 w-5 text-foreground" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium mb-3 text-foreground">
              3 Things to Know About Looker
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Explore vs Dashboard:</strong> Explores let you build custom queries, while Dashboards show pre-built visualizations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Finding Trusted Data:</strong> Look for domain tags and verified badges to ensure data quality</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Getting Help:</strong> Use Job Aids or Issue Escalation in the top-right for support</span>
              </li>
            </ul>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-8 w-8"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
