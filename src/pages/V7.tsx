import { useState } from "react";
import { Clock, Star, Users, Bell } from "lucide-react";
import { NavbarV5 } from "@/components/NavbarV5";
import { SidebarV5 } from "@/components/SidebarV5";
import { QuickAccessTile } from "@/components/QuickAccessTile";
import { DataCard } from "@/components/DataCard";
import { InfoBanner } from "@/components/InfoBanner";
import { PerformanceKPICards } from "@/components/PerformanceKPICards";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const mockData = [
  {
    title: "Sales Performance Dashboard",
    description:
      "Real-time sales metrics and KPIs across all channels and regions",
    domain: "Merchandising",
    type: "Dashboard" as const,
  },
  {
    title: "Inventory Analysis Explore",
    description: "Deep dive into inventory levels, turnover, and trends",
    domain: "Merchandising",
    type: "Explore" as const,
  },
  {
    title: "Customer Analytics Hub",
    description: "360-degree view of customer behavior and segments",
    domain: "Marketing",
    type: "Dashboard" as const,
  },
  {
    title: "Marketing Campaign Performance",
    description: "Track campaign effectiveness and ROI across all channels",
    domain: "Marketing",
    type: "Dashboard" as const,
  },
  {
    title: "Budget Variance Analysis",
    description: "Compare planned vs actual spend across departments",
    domain: "Finance",
    type: "Dashboard" as const,
  },
  {
    title: "Financial Forecasting Model",
    description: "Predictive models for revenue and expense forecasting",
    domain: "Finance",
    type: "Explore" as const,
  },
];

export default function V7() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubdomain, setSelectedSubdomain] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showSupplyChainModal, setShowSupplyChainModal] = useState(false);

  const handleCategorySelect = (categoryId: string, subdomain?: string) => {
    console.log("Category selected:", categoryId, "Subdomain:", subdomain);

    if (categoryId === "supply-chain") {
      setShowSupplyChainModal(true);
      return;
    }

    setSelectedCategory(categoryId);
    setSelectedSubdomain(subdomain || null);
  };

  const handleSupplyChainModalClose = () => {
    setShowSupplyChainModal(false);
    setSelectedCategory(null);
    setSelectedSubdomain(null);
  };

  const handleRequestAccess = () => {
    window.location.href = "mailto:access-request@nordstrom.com?subject=Supply Chain Domain Access Request";
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setSelectedSubdomain(null);
  };

  const renderMainContent = () => {
    // Handle Finance → Performance & KPIs subdomain
    if (selectedCategory === "finance" && selectedSubdomain === "Performance & KPIs") {
      return <PerformanceKPICards />;
    }

    // Handle other subdomains with Coming Soon
    if (selectedSubdomain) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              The {selectedSubdomain} subdomain is currently under development. Check back soon for updates.
            </p>
            <button
              onClick={handleBackToHome}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    // Handle Technology domain restriction
    if (selectedCategory === "technology") {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-destructive">Access Restricted</h2>
            <p className="text-muted-foreground max-w-md">
              You do not have permission to access the Technology domain. Please
              contact your administrator to request access.
            </p>
          </div>
        </div>
      );
    }

    // Default homepage view
    return (
      <div className="space-y-8 animate-in fade-in-50 duration-500">
        <InfoBanner />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAccessTile
              title="Recently Viewed"
              description="Your last 10 dashboards"
              icon={Clock}
              href="#"
              isAdminMode={isAdminMode}
            />
            <QuickAccessTile
              title="Favorites"
              description="Your starred content"
              icon={Star}
              href="#"
              isAdminMode={isAdminMode}
            />
            <QuickAccessTile
              title="Shared With Me"
              description="Content from your team"
              icon={Users}
              href="#"
              isAdminMode={isAdminMode}
            />
            <QuickAccessTile
              title="Alerts"
              description="Recent notifications"
              icon={Bell}
              href="#"
              isAdminMode={isAdminMode}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Popular Dashboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.slice(0, 6).map((item, index) => (
              <DataCard
                key={index}
                title={item.title}
                description={item.description}
                domain={item.domain}
                type={item.type}
                isAdminMode={isAdminMode}
              />
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarV5
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
      />

      <div className="flex-1 lg:ml-64 flex flex-col">
        <NavbarV5 />

        <main className="flex-1 px-6 py-4 overflow-auto">{renderMainContent()}</main>
      </div>

      <AlertDialog open={showSupplyChainModal} onOpenChange={setShowSupplyChainModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Restricted</AlertDialogTitle>
            <AlertDialogDescription>
              You do not have permission to access the Supply Chain domain. This
              content is restricted to authorized personnel only. Would you like to
              request access?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSupplyChainModalClose}>
              Cancel
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleRequestAccess}
              className="bg-primary text-primary-foreground"
            >
              Request Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
