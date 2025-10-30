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
    { id: "sales_dash", title: "Sales Overview", lookerDashboardId: "dash_123", params: { date_range: "30d" }, visibilityRoles: ["Viewer", "Editor", "Admin"] }
  ],
  announcement: {
    enabled: true,
    style: "info",
    title: "3 Things to Know About Looker",
    bullets: ["Explore vs Dashboard", "Finding Trusted Data", "Use Job Aids for help"],
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
