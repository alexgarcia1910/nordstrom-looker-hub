import React, { createContext, useContext, useState, useCallback } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  target: 'route' | 'url' | 'dashboard';
  targetRef: string;
  visibilityRoles: string[];
  enabled: boolean;
}

export interface Embed {
  id: string;
  title: string;
  lookerDashboardId?: string;
  url?: string;
  domain?: string;
  subdomain?: string;
  params: Record<string, string>;
  visibilityRoles: string[];
}

export interface Link {
  id: string;
  name: string;
  url: string;
  icon: string;
  domainTag: string;
  visibilityRoles: string[];
}

export interface Domain {
  id: string;
  label: string;
  description: string;
  defaultFilters?: Record<string, string>;
}

export interface Announcement {
  enabled: boolean;
  style: 'info' | 'warning' | 'success';
  title: string;
  bullets: string[];
  dismissible: boolean;
  scheduledStart?: string;
  scheduledEnd?: string;
}

export interface Branding {
  logoUrl: string;
  accentColor: string;
  iconSet: 'lucide' | 'material';
}

export interface DataSources {
  mode: 'json' | 'googleSheet';
  jsonUrl?: string;
  sheetId?: string;
  sheetRanges?: Record<string, string>;
  lastSync?: string;
  lastSyncUser?: string;
}

export interface RoleMatrix {
  roles: string[];
  roleMatrix: Record<string, string[]>;
}

export interface ConfigData {
  version: string;
  updatedBy: string;
  updatedAt: string;
  navigation: NavItem[];
  embeds: Embed[];
  announcement: Announcement;
  linkLibrary: Link[];
  domains: Domain[];
  branding: Branding;
  rbac: RoleMatrix;
  dataSources: DataSources;
}

interface AdminContextType {
  config: ConfigData;
  draftConfig: ConfigData;
  hasUnsavedChanges: boolean;
  updateDraftConfig: (updates: Partial<ConfigData>) => void;
  saveDraft: () => void;
  discardDraft: () => void;
  publishChanges: (notes?: string) => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const seedConfig: ConfigData = {
  version: "1.2.0",
  updatedBy: "alex",
  updatedAt: new Date().toISOString(),
  navigation: [
    { id: "home", label: "Home", icon: "home", target: "route", targetRef: "/", visibilityRoles: ["Viewer", "Editor", "Admin"], enabled: true },
    { id: "customer", label: "Customer", icon: "users", target: "route", targetRef: "/customer", visibilityRoles: ["Viewer", "Editor", "Admin"], enabled: true },
    { id: "finance", label: "Finance", icon: "dollar-sign", target: "route", targetRef: "/finance", visibilityRoles: ["Viewer", "Editor", "Admin"], enabled: true },
    { id: "merch", label: "Merchandising", icon: "tag", target: "route", targetRef: "/merch", visibilityRoles: ["Viewer", "Editor", "Admin"], enabled: true },
  ],
  embeds: [
    { id: "sales_dash", title: "Sales Overview", lookerDashboardId: "dash_123", domain: "Finance", subdomain: "P&L", params: { date_range: "30d" }, visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "inventory_dash", title: "Inventory Analysis", lookerDashboardId: "dash_456", domain: "Merchandising", subdomain: "Inventory", params: {}, visibilityRoles: ["Editor", "Admin"] },
    { id: "customer_dash", title: "Customer Insights", lookerDashboardId: "dash_789", domain: "Customer", subdomain: "Analytics", params: {}, visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "revenue_dash", title: "Monthly Revenue Report", lookerDashboardId: "dash_234", domain: "Finance", subdomain: "Revenue", params: {}, visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "budget_dash", title: "Budget vs Actuals", lookerDashboardId: "dash_345", domain: "Finance", subdomain: "Budgeting", params: {}, visibilityRoles: ["Editor", "Admin"] },
    { id: "product_dash", title: "Product Performance", lookerDashboardId: "dash_567", domain: "Merchandising", subdomain: "Product Analytics", params: {}, visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "pricing_dash", title: "Pricing Strategy Dashboard", lookerDashboardId: "dash_678", domain: "Merchandising", subdomain: "Pricing", params: {}, visibilityRoles: ["Editor", "Admin"] },
    { id: "store_dash", title: "Store Performance Metrics", lookerDashboardId: "dash_890", domain: "Store Selling", subdomain: "Performance", params: {}, visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "customer_lifetime", title: "Customer Lifetime Value", lookerDashboardId: "dash_901", domain: "Customer", subdomain: "Retention", params: {}, visibilityRoles: ["Editor", "Admin"] },
    { id: "supply_chain", title: "Supply Chain Overview", lookerDashboardId: "dash_012", domain: "Supply Chain", subdomain: "Logistics", params: {}, visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "inventory_turnover", title: "Inventory Turnover Analysis", lookerDashboardId: "dash_135", domain: "Supply Chain", subdomain: "Inventory Management", params: {}, visibilityRoles: ["Editor", "Admin"] },
    { id: "tech_metrics", title: "Technology Performance", lookerDashboardId: "dash_246", domain: "Technology", subdomain: "Infrastructure", params: {}, visibilityRoles: ["Admin"] }
  ],
  announcement: {
    enabled: true,
    style: "info",
    title: "5 Things to Know About Looker",
    bullets: [
      "About This App: This Front Door helps you quickly access dashboards and explores across all Nordstrom domains — Finance, Merchandising, Store Selling, Supply Chain, and more",
      "Explore vs Dashboard: Explores let you build custom queries and analyze data freely, while Dashboards display curated, pre-built visualizations.",
      "Navigating Domains: Click a domain in the left sidebar to view its subdomains and associated dashboards.",
      "Finding Data Quickly: Use the global search bar to find dashboards and explores by name, domain, or keyword.",
      "Need Help: Use the Issue Escalation link in the top-right corner for support or to report data issues."
    ],
    dismissible: true
  },
  linkLibrary: [
    { id: "customer-training", name: "Training & Resources", url: "https://docs.example.com/customer/training", icon: "BookOpen", domainTag: "Customer", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "customer-onboarding", name: "Access and Onboarding", url: "https://docs.example.com/customer/onboarding", icon: "LogIn", domainTag: "Customer", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "finance-training", name: "Training & Resources", url: "https://docs.example.com/finance/training", icon: "BookOpen", domainTag: "Finance", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "finance-onboarding", name: "Access and Onboarding", url: "https://docs.example.com/finance/onboarding", icon: "LogIn", domainTag: "Finance", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "merchandising-training", name: "Training & Resources", url: "https://docs.example.com/merchandising/training", icon: "BookOpen", domainTag: "Merchandising", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "merchandising-onboarding", name: "Access and Onboarding", url: "https://docs.example.com/merchandising/onboarding", icon: "LogIn", domainTag: "Merchandising", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "store-selling-training", name: "Training & Resources", url: "https://docs.example.com/store-selling/training", icon: "BookOpen", domainTag: "Store Selling", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "store-selling-onboarding", name: "Access and Onboarding", url: "https://docs.example.com/store-selling/onboarding", icon: "LogIn", domainTag: "Store Selling", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "supply-chain-training", name: "Training & Resources", url: "https://docs.example.com/supply-chain/training", icon: "BookOpen", domainTag: "Supply Chain", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "supply-chain-onboarding", name: "Access and Onboarding", url: "https://docs.example.com/supply-chain/onboarding", icon: "LogIn", domainTag: "Supply Chain", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "technology-training", name: "Training & Resources", url: "https://docs.example.com/technology/training", icon: "BookOpen", domainTag: "Technology", visibilityRoles: ["Viewer", "Editor", "Admin"] },
    { id: "technology-onboarding", name: "Access and Onboarding", url: "https://docs.example.com/technology/onboarding", icon: "LogIn", domainTag: "Technology", visibilityRoles: ["Viewer", "Editor", "Admin"] }
  ],
  domains: [
    { id: "all", label: "All Domains", description: "" },
    { id: "customer", label: "Customer", description: "Customer analytics and insights" },
    { id: "finance", label: "Finance", description: "Financial reporting and analysis" }
  ],
  branding: {
    logoUrl: "https://cdn.example.com/nordstrom-logo.svg",
    accentColor: "#1f2937",
    iconSet: "lucide"
  },
  rbac: {
    roles: ["Viewer", "Editor", "Admin"],
    roleMatrix: {
      "Navigation": ["Editor", "Admin"],
      "Sections": ["Editor", "Admin"],
      "Embeds": ["Editor", "Admin"],
      "Links": ["Editor", "Admin"],
      "Branding": ["Admin"],
      "Publish": ["Admin"]
    }
  },
  dataSources: {
    mode: "json"
  }
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigData>(seedConfig);
  const [draftConfig, setDraftConfig] = useState<ConfigData>(seedConfig);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const hasUnsavedChanges = JSON.stringify(config) !== JSON.stringify(draftConfig);

  const updateDraftConfig = useCallback((updates: Partial<ConfigData>) => {
    setDraftConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const saveDraft = useCallback(() => {
    setConfig(draftConfig);
  }, [draftConfig]);

  const discardDraft = useCallback(() => {
    setDraftConfig(config);
  }, [config]);

  const publishChanges = useCallback((notes?: string) => {
    setConfig(draftConfig);
    console.log('Publishing changes with notes:', notes);
  }, [draftConfig]);

  return (
    <AdminContext.Provider value={{
      config,
      draftConfig,
      hasUnsavedChanges,
      updateDraftConfig,
      saveDraft,
      discardDraft,
      publishChanges,
      previewMode,
      setPreviewMode
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
