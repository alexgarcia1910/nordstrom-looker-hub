import { useState } from "react";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NavigationSection } from "@/components/admin/sections/NavigationSection";
import { LinkLibrarySection } from "@/components/admin/sections/LinkLibrarySection";
import { AnnouncementsSection } from "@/components/admin/sections/AnnouncementsSection";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("navigation");

  const renderSection = () => {
    switch (activeSection) {
      case "navigation":
        return <NavigationSection />;
      case "links":
        return <LinkLibrarySection />;
      case "announcements":
        return <AnnouncementsSection />;
      case "cards":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cards & Content section coming soon</p>
          </div>
        );
      case "embeds":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Dashboard Embeds section coming soon</p>
          </div>
        );
      case "taxonomy":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Taxonomy & Domains section coming soon</p>
          </div>
        );
      case "branding":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Branding & Icons section coming soon</p>
          </div>
        );
      case "datasources":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Data Sources section coming soon</p>
          </div>
        );
      case "roles":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Roles & Permissions section coming soon</p>
          </div>
        );
      case "versioning":
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Versioning & Audit section coming soon</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminProvider>
      <div 
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "hsl(var(--v2-background))" }}
      >
        <AdminHeader />
        
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default Admin;
