import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PublishDialog = ({ open, onOpenChange }: PublishDialogProps) => {
  const { publishChanges } = useAdmin();
  const [notes, setNotes] = useState("");
  const [notifyTeam, setNotifyTeam] = useState(false);

  const handlePublish = () => {
    publishChanges(notes);
    toast.success("Changes published successfully");
    onOpenChange(false);
    setNotes("");
    setNotifyTeam(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Publish Changes</DialogTitle>
          <DialogDescription>
            Review and publish your changes to make them live
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div 
            className="rounded-lg p-4 space-y-2"
            style={{ backgroundColor: "hsl(var(--v2-info-bg))" }}
          >
            <h4 
              className="font-medium text-sm"
              style={{ color: "hsl(var(--v2-text-primary))" }}
            >
              Change Summary
            </h4>
            <ul 
              className="text-sm space-y-1"
              style={{ color: "hsl(var(--v2-text-secondary))" }}
            >
              <li>• Updated 3 navigation items</li>
              <li>• Modified announcement banner</li>
              <li>• Added 2 new links to library</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Release Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Describe the changes you're publishing..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="notify"
              checked={notifyTeam}
              onCheckedChange={(checked) => setNotifyTeam(checked as boolean)}
            />
            <Label htmlFor="notify" className="text-sm cursor-pointer">
              Notify team members of this update
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePublish}
            style={{
              backgroundColor: "hsl(var(--v2-black))",
              color: "hsl(var(--v2-surface))"
            }}
          >
            Publish Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
