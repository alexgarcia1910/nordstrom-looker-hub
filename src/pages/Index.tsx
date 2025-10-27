import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";
import { QuickAccessTile } from "@/components/QuickAccessTile";
import { DataCard } from "@/components/DataCard";
import { InfoBanner } from "@/components/InfoBanner";
import { Compass, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DataQualityOverview } from "@/components/DataQualityOverview";

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

  const handleSearch = (query: string, domain: string) => {
    setSearchQuery(query);
    setSearchDomain(domain);
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
        onCategorySelect={setSelectedCategory}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-8 lg:p-12">
          <SearchBar onSearch={handleSearch} />
          
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
          
          <DataQualityOverview isAdminMode={isAdminMode} />
        </main>
      </div>
    </div>
  );
};

export default Index;
