import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { DataQualityOverview } from "@/components/DataQualityOverview";
import { useState } from "react";

const Alerts = () => {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isAdminMode, setIsAdminMode] = useState(false);

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
          <div className="mb-8">
            <h1 className="text-4xl font-light tracking-tight text-foreground mb-3">
              Data Quality Alerts
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor the status of all data domains and receive notifications about issues or delays.
            </p>
          </div>
          
          <DataQualityOverview isAdminMode={isAdminMode} />
        </main>
      </div>
    </div>
  );
};

export default Alerts;
