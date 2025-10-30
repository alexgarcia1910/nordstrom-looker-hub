import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, History, Upload } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useState } from "react";
import { PublishDialog } from "./PublishDialog";

export const AdminHeader = () => {
  const { hasUnsavedChanges, saveDraft, discardDraft } = useAdmin();
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  return (
    <>
      <header 
        className="sticky top-0 z-50 border-b px-6 py-4 flex items-center justify-between"
        style={{ 
          backgroundColor: "hsl(var(--v2-surface))",
          borderColor: "hsl(var(--v2-border-soft))",
          boxShadow: "var(--shadow-soft)"
        }}
      >
        <div className="flex items-center gap-4">
          <h1 
            className="text-2xl font-semibold"
            style={{ color: "hsl(var(--v2-text-primary))" }}
          >
            Front Door Admin
          </h1>
          <Badge 
            variant="outline"
            className="rounded-lg px-3 py-1"
            style={{ 
              borderColor: "hsl(var(--v2-border-soft))",
              backgroundColor: hasUnsavedChanges ? "hsl(var(--v2-info-bg))" : "transparent"
            }}
          >
            {hasUnsavedChanges ? "Draft" : "Published"}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <History className="h-4 w-4" />
            Change Log
          </Button>

          {hasUnsavedChanges && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={saveDraft}
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={discardDraft}
              >
                Discard
              </Button>
            </>
          )}

          <Button
            size="sm"
            className="gap-2"
            disabled={!hasUnsavedChanges}
            onClick={() => setShowPublishDialog(true)}
            style={{
              backgroundColor: hasUnsavedChanges ? "hsl(var(--v2-black))" : undefined,
              color: hasUnsavedChanges ? "hsl(var(--v2-surface))" : undefined
            }}
          >
            <Upload className="h-4 w-4" />
            Publish Changes
          </Button>
        </div>
      </header>

      <PublishDialog 
        open={showPublishDialog} 
        onOpenChange={setShowPublishDialog} 
      />
    </>
  );
};
