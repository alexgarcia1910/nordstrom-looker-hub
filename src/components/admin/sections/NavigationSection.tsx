import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAdmin } from "@/contexts/AdminContext";
import { NavItemDialog } from "./NavItemDialog";
import type { NavItem } from "@/contexts/AdminContext";

export const NavigationSection = () => {
  const { draftConfig, updateDraftConfig } = useAdmin();
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleToggle = (id: string) => {
    const updated = draftConfig.navigation.map(item =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    updateDraftConfig({ navigation: updated });
  };

  const handleEdit = (item: NavItem) => {
    setEditingItem(item);
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    const updated = draftConfig.navigation.filter(item => item.id !== id);
    updateDraftConfig({ navigation: updated });
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-2xl font-semibold mb-2"
            style={{ color: "hsl(var(--v2-text-primary))" }}
          >
            Navigation Items
          </h2>
          <p 
            className="text-sm"
            style={{ color: "hsl(var(--v2-text-secondary))" }}
          >
            Manage the main navigation menu items. Drag to reorder.
          </p>
        </div>
        <Button 
          onClick={handleAddNew}
          className="gap-2"
          style={{
            backgroundColor: "hsl(var(--v2-black))",
            color: "hsl(var(--v2-surface))"
          }}
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div 
        className="rounded-xl overflow-hidden"
        style={{ 
          backgroundColor: "hsl(var(--v2-surface))",
          border: "1px solid hsl(var(--v2-border-soft))"
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Target Ref</TableHead>
              <TableHead>Visible To</TableHead>
              <TableHead>Enabled</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {draftConfig.navigation.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                </TableCell>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {item.icon}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.target}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs max-w-[200px] truncate">
                  {item.targetRef}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {item.visibilityRoles.map(role => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={() => handleToggle(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <NavItemDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        item={editingItem}
      />
    </div>
  );
};
