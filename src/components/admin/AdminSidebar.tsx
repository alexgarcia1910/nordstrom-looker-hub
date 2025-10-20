import { 
  Navigation, 
  LayoutGrid, 
  Monitor, 
  Bell, 
  Link, 
  Folder, 
  Palette, 
  Database, 
  Shield, 
  Clock 
} from "lucide-react";

const sections = [
  { id: "navigation", label: "Navigation", icon: Navigation },
  { id: "cards", label: "Cards & Content", icon: LayoutGrid },
  { id: "embeds", label: "Dashboard Embeds", icon: Monitor },
  { id: "announcements", label: "Announcements/Banner", icon: Bell },
  { id: "links", label: "Link Library", icon: Link },
  { id: "taxonomy", label: "Taxonomy & Domains", icon: Folder },
  { id: "branding", label: "Branding & Icons", icon: Palette },
  { id: "datasources", label: "Data Sources", icon: Database },
  { id: "roles", label: "Roles & Permissions", icon: Shield },
  { id: "versioning", label: "Versioning & Audit", icon: Clock },
];

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  return (
    <aside 
      className="w-64 border-r flex-shrink-0"
      style={{ 
        backgroundColor: "hsl(var(--v2-surface))",
        borderColor: "hsl(var(--v2-border-soft))"
      }}
    >
      <nav className="p-4 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition text-left"
              style={{
                backgroundColor: isActive ? "hsl(var(--v2-accent-soft))" : "transparent",
                color: isActive ? "hsl(var(--v2-black))" : "hsl(var(--v2-text-secondary))"
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
