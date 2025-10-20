import { useState } from "react";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { HierarchicalNav } from "@/components/navigation/HierarchicalNav";
import { ChatSearch } from "@/components/navigation/ChatSearch";

export default function NavigationSearch() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 20);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--v2-background))" }}>
      <NavbarV2 
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
        isScrolled={isScrolled}
      />
      
      <div 
        className="flex-1 overflow-auto"
        onScroll={handleScroll}
      >
        {/* Header Area */}
        <div className="px-6 lg:px-12 py-8 lg:py-12">
          <h1 
            className="text-3xl lg:text-4xl font-light tracking-tight mb-3"
            style={{ color: "hsl(var(--v2-text-primary))" }}
          >
            Find Trusted Dashboards
          </h1>
          <p 
            className="text-base lg:text-lg font-light max-w-3xl"
            style={{ color: "hsl(var(--v2-text-secondary))" }}
          >
            Navigate by domain or ask Looker Assistant for what you need — only production-ready dashboards appear here.
          </p>
        </div>

        {/* Two-Panel Layout */}
        <div className="px-6 lg:px-12 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Panel - Hierarchical Navigation */}
            <HierarchicalNav 
              isAdminMode={isAdminMode}
              selectedDomain={selectedDomain}
              onDomainSelect={setSelectedDomain}
            />

            {/* Right Panel - Chat Search */}
            <ChatSearch 
              isAdminMode={isAdminMode}
              selectedDomain={selectedDomain}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
