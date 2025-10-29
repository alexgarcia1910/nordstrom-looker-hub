import { useState } from "react";
import { NavbarV8 } from "@/components/NavbarV8";
import { Sidebar } from "@/components/Sidebar";
import { ActivityCard } from "@/components/ActivityCard";
import { InfoBannerV8 } from "@/components/InfoBannerV8";
import { Heart, Clock, LayoutGrid, ShieldAlert, ShieldX, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const favoritesData = [
  { name: "Sales Performance Dashboard", domain: "Finance", timestamp: "Last opened 2 days ago" },
  { name: "Inventory Insights", domain: "Merchandising", timestamp: "Last opened 4 days ago" },
  { name: "Store Traffic Trends", domain: "Store Selling", timestamp: "Last opened 1 week ago" },
];

const recentlyViewedData = [
  { name: "Weekly Revenue Explorer", domain: "Finance", timestamp: "Opened 3 hours ago" },
  { name: "Promo Effectiveness Dashboard", domain: "Merchandising", timestamp: "Opened 1 day ago" },
  { name: "Labor Cost Breakdown", domain: "Store Selling", timestamp: "Opened 2 days ago" },
];

const boardsData = [
  { name: "Q4 Executive Summary", domain: "Board", timestamp: "Updated Oct 25" },
  { name: "Store Operations KPI Board", domain: "Board", timestamp: "Updated Oct 20" },
  { name: "Digital Sales Performance", domain: "Board", timestamp: "Updated Oct 12" },
];

const V8 = () => {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showSupplyChainModal, setShowSupplyChainModal] = useState(false);

  const handleCategorySelect = (category: string) => {
    if (category === "supply-chain") {
      setShowSupplyChainModal(true);
      return;
    }
    setSelectedCategory(category);
  };

  const handleSupplyChainModalClose = () => {
    setShowSupplyChainModal(false);
    setSelectedCategory("home");
  };

  const handleRequestAccess = (domain: string) => {
    window.open(`mailto:dataaccess@nordstrom.com?subject=Access Request – ${domain}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
      />
      
      <AlertDialog open={showSupplyChainModal} onOpenChange={setShowSupplyChainModal}>
        <AlertDialogContent className="max-w-md rounded-xl">
          <button
            onClick={handleSupplyChainModalClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertDialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-5 w-5 text-muted-foreground" />
              <AlertDialogTitle className="text-xl">Access Restricted</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              You don't currently have permission to view this domain. If you believe this is an error or need access for your role, please submit a request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => handleRequestAccess("Supply Chain")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Request Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="flex-1 flex flex-col">
        <NavbarV8 />
        
        <main className="flex-1 p-8 lg:p-12">
          {selectedCategory === "technology" ? (
            <div className="flex items-center justify-center min-h-[70vh]">
              <Card className="max-w-lg w-full text-center p-8">
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <ShieldX className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-foreground">
                      🚫 Access Restricted
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      You don't have permission to view the Technology domain.
                      <br />
                      Please contact your administrator if you need access.
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleRequestAccess("Technology")}
                    className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Request Access
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* Welcome Banner */}
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2 text-foreground">
                  Welcome to Looker!
                </h1>
                <p className="text-base text-muted-foreground">
                  Your central hub for all analytics dashboards at Nordstrom.
                </p>
              </div>

              <InfoBannerV8 />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <ActivityCard
                  icon={Heart}
                  title="Favorites"
                  description="Your most frequently used dashboards and explores."
                  items={favoritesData}
                  actionLabel="View All Favorites"
                  actionHref="#"
                />
                
                <ActivityCard
                  icon={Clock}
                  title="Recently Viewed"
                  description="Quickly access the dashboards and explores you opened most recently."
                  items={recentlyViewedData}
                  actionLabel="View History"
                  actionHref="#"
                />
                
                <ActivityCard
                  icon={LayoutGrid}
                  title="Boards"
                  description="View or organize collections of dashboards and reports grouped by topic."
                  items={boardsData}
                  actionLabel="View All Boards"
                  actionHref="#"
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default V8;
