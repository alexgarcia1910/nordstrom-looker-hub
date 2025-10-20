import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";

export const AdminPreview = () => {
  const { previewMode, setPreviewMode } = useAdmin();

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-full';
    }
  };

  return (
    <aside 
      className="w-96 border-l flex flex-col flex-shrink-0"
      style={{ 
        backgroundColor: "hsl(var(--v2-background))",
        borderColor: "hsl(var(--v2-border-soft))"
      }}
    >
      <div 
        className="p-4 border-b flex items-center justify-between"
        style={{ borderColor: "hsl(var(--v2-border-soft))" }}
      >
        <span 
          className="text-sm font-medium"
          style={{ color: "hsl(var(--v2-text-primary))" }}
        >
          Live Preview
        </span>
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPreviewMode('desktop')}
            style={{
              backgroundColor: previewMode === 'desktop' ? "hsl(var(--v2-accent-soft))" : "transparent"
            }}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPreviewMode('tablet')}
            style={{
              backgroundColor: previewMode === 'tablet' ? "hsl(var(--v2-accent-soft))" : "transparent"
            }}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPreviewMode('mobile')}
            style={{
              backgroundColor: previewMode === 'mobile' ? "hsl(var(--v2-accent-soft))" : "transparent"
            }}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className={`mx-auto ${getPreviewWidth()} transition-all duration-300`}>
          <div 
            className="rounded-xl overflow-hidden"
            style={{ 
              backgroundColor: "hsl(var(--v2-surface))",
              boxShadow: "var(--shadow-soft)",
              minHeight: "600px"
            }}
          >
            <div className="p-8">
              <div 
                className="text-sm text-center py-8"
                style={{ color: "hsl(var(--v2-text-secondary))" }}
              >
                Live preview will reflect your changes in real-time
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
