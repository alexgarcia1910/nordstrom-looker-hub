import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import type { NavItem } from "@/contexts/AdminContext";
import { toast } from "sonner";

interface NavItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: NavItem | null;
}

export const NavItemDialog = ({ open, onOpenChange, item }: NavItemDialogProps) => {
  const { draftConfig, updateDraftConfig } = useAdmin();
  const [formData, setFormData] = useState<Partial<NavItem>>({
    label: "",
    icon: "home",
    target: "route",
    targetRef: "/",
    visibilityRoles: ["Viewer", "Editor", "Admin"],
    enabled: true
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        label: "",
        icon: "home",
        target: "route",
        targetRef: "/",
        visibilityRoles: ["Viewer", "Editor", "Admin"],
        enabled: true
      });
    }
  }, [item, open]);

  const handleSave = () => {
    if (!formData.label || !formData.targetRef) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: NavItem = {
      id: item?.id || `nav_${Date.now()}`,
      label: formData.label!,
      icon: formData.icon!,
      target: formData.target!,
      targetRef: formData.targetRef!,
      visibilityRoles: formData.visibilityRoles!,
      enabled: formData.enabled!
    };

    let updated;
    if (item) {
      updated = draftConfig.navigation.map(i => i.id === item.id ? newItem : i);
    } else {
      updated = [...draftConfig.navigation, newItem];
    }

    updateDraftConfig({ navigation: updated });
    toast.success(item ? "Navigation item updated" : "Navigation item added");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit" : "Add"} Navigation Item</DialogTitle>
          <DialogDescription>
            Configure the navigation item details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label *</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g., Home, Customer, Finance"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g., home, users, dollar-sign"
            />
            <p className="text-xs text-muted-foreground">
              Use Lucide icon names
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Target Type *</Label>
            <Select
              value={formData.target}
              onValueChange={(value: any) => setFormData({ ...formData, target: value })}
            >
              <SelectTrigger id="target">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="route">Route</SelectItem>
                <SelectItem value="url">External URL</SelectItem>
                <SelectItem value="dashboard">Looker Dashboard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetRef">Target Reference *</Label>
            <Input
              id="targetRef"
              value={formData.targetRef}
              onChange={(e) => setFormData({ ...formData, targetRef: e.target.value })}
              placeholder={
                formData.target === 'route' ? '/path' :
                formData.target === 'url' ? 'https://...' :
                'dashboard_id'
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            style={{
              backgroundColor: "hsl(var(--v2-black))",
              color: "hsl(var(--v2-surface))"
            }}
          >
            {item ? "Update" : "Add"} Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
