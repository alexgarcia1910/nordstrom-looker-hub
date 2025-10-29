import { useState } from "react";
import { X, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const InfoBannerV8 = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="bg-secondary border-border mb-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <Info className="h-5 w-5 text-foreground" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium mb-3 text-foreground">
              5 Things to Know About Looker
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>About This App:</strong> This Front Door helps you quickly access dashboards and explores across all Nordstrom domains — Finance, Merchandising, Store Selling, Supply Chain, and more.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Explore vs Dashboard:</strong> Explores let you build custom queries and analyze data freely, while Dashboards display curated, pre-built visualizations.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Navigating Domains:</strong> Click a domain in the left sidebar to view its subdomains and associated dashboards.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Finding Data Quickly:</strong> Use the global search bar to find dashboards and explores by name, domain, or keyword.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Need Help:</strong> Use the Issue Escalation link in the top-right corner for support or to report data issues.</span>
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
