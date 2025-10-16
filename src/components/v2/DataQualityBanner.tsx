import { AlertCircle } from "lucide-react";

export const DataQualityBanner = () => {
  return (
    <div 
      className="mt-16 pt-8 rounded-xl p-6"
      style={{ 
        backgroundColor: "hsl(var(--v2-info-bg))",
        border: "1px solid hsl(var(--v2-accent-soft))"
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle 
          className="h-5 w-5" 
          style={{ color: "hsl(var(--v2-black))" }}
        />
        <span 
          className="font-medium text-sm"
          style={{ color: "hsl(var(--v2-text-primary))" }}
        >
          Data Quality Status
        </span>
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-3">
          <div 
            className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"
            style={{ boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)" }}
          />
          <span style={{ color: "hsl(var(--v2-text-secondary))" }}>
            All systems operational
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"
            style={{ boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)" }}
          />
          <span style={{ color: "hsl(var(--v2-text-secondary))" }}>
            Data refreshed 2 hours ago
          </span>
        </div>
      </div>
    </div>
  );
};
