import { useState, useEffect } from "react";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { SidebarV2 } from "@/components/v2/SidebarV2";
import { QuickAccessTileV2 } from "@/components/v2/QuickAccessTileV2";
import { DataCardV2 } from "@/components/v2/DataCardV2";
import { InfoBannerV2 } from "@/components/v2/InfoBannerV2";
import { DataQualityBanner } from "@/components/v2/DataQualityBanner";
import { Compass, BookOpen } from "lucide-react";

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

const V2 = () => {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDomain, setSearchDomain] = useState("all");
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--v2-background))" }}>
      <NavbarV2 
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
        isScrolled={headerScrolled}
      />
      
      <div className="flex">
        <SidebarV2 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <main className="flex-1 px-6 lg:px-16 py-12 max-w-7xl mx-auto w-full">
          <div 
            className="rounded-xl p-8 lg:p-12 animate-fade-in"
            style={{ 
              backgroundColor: "hsl(var(--v2-surface))",
              boxShadow: "var(--shadow-premium)"
            }}
          >
            <InfoBannerV2 />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              <QuickAccessTileV2
                icon={Compass}
                title="Access & Onboarding"
                description="Get started with domain-specific guides and training materials tailored for your role"
                href="#"
                isAdminMode={isAdminMode}
              />
              
              <QuickAccessTileV2
                icon={BookOpen}
                title="Training & Resources"
                description="Learn best practices, watch tutorials, and access comprehensive documentation"
                href="#"
                isAdminMode={isAdminMode}
              />
            </div>
            
            {(searchQuery || selectedCategory !== "home") && (
              <>
                <h2 
                  className="text-3xl font-light mb-8 tracking-tight"
                  style={{ color: "hsl(var(--v2-text-primary))" }}
                >
                  {selectedCategory === "home" ? "Search Results" : 
                    `${selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Analytics`}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((item, index) => (
                    <DataCardV2
                      key={index}
                      {...item}
                      isAdminMode={isAdminMode}
                    />
                  ))}
                </div>
              </>
            )}
            
            {filteredData.length === 0 && (searchQuery || selectedCategory !== "home") && (
              <div 
                className="text-center py-16 rounded-lg"
                style={{ 
                  backgroundColor: "hsl(var(--v2-info-bg))",
                  border: "1px solid hsl(var(--v2-border-soft))"
                }}
              >
                <p style={{ color: "hsl(var(--v2-text-secondary))" }}>
                  No results found. Try adjusting your search or filters.
                </p>
              </div>
            )}
            
            <DataQualityBanner />
          </div>
          
          <footer className="mt-8 text-center">
            <p className="text-sm" style={{ color: "hsl(var(--v2-text-secondary))" }}>
              © Nordstrom • Powered by Looker Extension Framework
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default V2;
