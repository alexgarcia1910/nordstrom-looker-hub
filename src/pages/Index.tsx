import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { QuickAccessTile } from "@/components/QuickAccessTile";
import { DataCard } from "@/components/DataCard";
import { InfoBanner } from "@/components/InfoBanner";
import { Compass, BookOpen, ShieldAlert, ShieldX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    title: "Store Operations Dashboard",
    description: "Daily store performance metrics including sales, traffic, and conversion rates",
    domain: "Store Selling",
    type: "Dashboard" as const,
  },
  {
    title: "Customer Insights Explore",
    description: "Deep dive into customer behavior, preferences, and lifetime value analysis",
    domain: "Customer",
    type: "Explore" as const,
  },
  {
    title: "Merch Weekly Summary",
    description: "Weekly merchandising performance across categories and regions",
    domain: "Merchandising",
    type: "Dashboard" as const,
  },
  {
    title: "Finance KPI Dashboard",
    description: "Key financial indicators and budget tracking for all departments",
    domain: "Finance",
    type: "Dashboard" as const,
  },
  {
    title: "Supply Chain Analytics",
    description: "Inventory levels, fulfillment rates, and logistics performance",
    domain: "Supply Chain",
    type: "Explore" as const,
  },
  {
    title: "Tech Platform Health",
    description: "System uptime, performance metrics, and incident tracking",
    domain: "Technology",
    type: "Dashboard" as const,
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDomain, setSearchDomain] = useState("all");
  const [showSupplyChainModal, setShowSupplyChainModal] = useState(false);

  const handleSearch = (query: string, domain: string) => {
    setSearchQuery(query);
    setSearchDomain(domain);
  };

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

  const filteredData = mockData.filter((item) => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = searchDomain === "all" || 
      item.domain.toLowerCase().replace(" ", "-") === searchDomain;
    
    const matchesCategory = selectedCategory === "home" ||
      item.domain.toLowerCase().replace(" ", "-") === selectedCategory;
    
    return matchesSearch && matchesDomain && matchesCategory;
  });

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
          <AlertDialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <AlertDialogTitle className="text-xl">Access Restricted</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              You don't currently have access to the Supply Chain domain.
              Please contact your data administrator if you believe this is an error.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel 
              onClick={handleSupplyChainModalClose}
              className="w-full sm:w-auto"
            >
              Back to Home
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRequestAccess("Supply Chain")}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Request Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
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
              <InfoBanner />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <QuickAccessTile
                  icon={Compass}
                  title="Access & Onboarding"
                  description="Get started with domain-specific guides and training materials for your role"
                  href="#"
                  isAdminMode={isAdminMode}
                />
                
                <QuickAccessTile
                  icon={BookOpen}
                  title="Training & Resources"
                  description="Learn best practices, watch tutorials, and access documentation"
                  href="#"
                  isAdminMode={isAdminMode}
                />
              </div>
              
              {(searchQuery || selectedCategory !== "home") && (
            <>
              <h2 className="text-2xl font-light mb-6 text-foreground">
                {selectedCategory === "home" ? "Search Results" : 
                  `${selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Analytics`}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item, index) => (
                  <DataCard
                    key={index}
                    {...item}
                    isAdminMode={isAdminMode}
                  />
                ))}
              </div>
            </>
          )}
          
              {filteredData.length === 0 && (searchQuery || selectedCategory !== "home") && (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground">
                      No results found. Try adjusting your search or filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
