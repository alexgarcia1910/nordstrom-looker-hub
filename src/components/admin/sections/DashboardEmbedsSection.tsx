import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const DashboardEmbedsSection = () => {
  const { draftConfig, updateDraftConfig } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    domain: "",
    subdomain: "",
    dashboardId: "",
    dashboardName: "",
    visibilityRoles: [] as string[]
  });

  const domains = ["Finance", "Merchandising", "Customer", "Store Selling", "Supply Chain", "Technology"];
  const availableRoles = ["Viewer", "Editor", "Admin"];

  const handleAddDashboard = () => {
    const newEmbed = {
      id: `embed_${Date.now()}`,
      title: formData.dashboardName,
      lookerDashboardId: formData.dashboardId,
      domain: formData.domain,
      subdomain: formData.subdomain,
      params: {},
      visibilityRoles: formData.visibilityRoles
    };

    updateDraftConfig({
      embeds: [...draftConfig.embeds, newEmbed]
    });

    setFormData({
      domain: "",
      subdomain: "",
      dashboardId: "",
      dashboardName: "",
      visibilityRoles: []
    });
    setIsDialogOpen(false);
  };

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      visibilityRoles: prev.visibilityRoles.includes(role)
        ? prev.visibilityRoles.filter(r => r !== role)
        : [...prev.visibilityRoles, role]
    }));
  };

  const isFormValid = formData.domain && formData.subdomain && formData.dashboardId && 
                      formData.dashboardName && formData.visibilityRoles.length > 0;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: "hsl(var(--v2-black))" }}>
              Dashboard Embeds
            </h2>
            <p className="text-sm mt-1" style={{ color: "hsl(var(--v2-text-secondary))" }}>
              Manage embedded dashboards and explores across all domains
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Dashboard/Explore
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Dashboard/Explore</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain</Label>
                    <Select 
                      value={formData.domain} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}
                    >
                      <SelectTrigger id="domain">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map(domain => (
                          <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <Input
                      id="subdomain"
                      placeholder="e.g., P&L, Inventory"
                      value={formData.subdomain}
                      onChange={(e) => setFormData(prev => ({ ...prev, subdomain: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dashboardId">Dashboard ID</Label>
                  <Input
                    id="dashboardId"
                    placeholder="e.g., dashboard_123"
                    value={formData.dashboardId}
                    onChange={(e) => setFormData(prev => ({ ...prev, dashboardId: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dashboardName">Dashboard Name</Label>
                  <Input
                    id="dashboardName"
                    placeholder="e.g., Monthly Revenue Report"
                    value={formData.dashboardName}
                    onChange={(e) => setFormData(prev => ({ ...prev, dashboardName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Visible To (Roles)</Label>
                  <div className="flex gap-2">
                    {availableRoles.map(role => (
                      <Button
                        key={role}
                        type="button"
                        variant={formData.visibilityRoles.includes(role) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleRole(role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDashboard} disabled={!isFormValid}>
                  Add Dashboard
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div 
        className="rounded-lg border"
        style={{ 
          backgroundColor: "hsl(var(--v2-surface))",
          borderColor: "hsl(var(--v2-border-soft))"
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>Subdomain</TableHead>
              <TableHead>Dashboard ID</TableHead>
              <TableHead>Dashboard Name</TableHead>
              <TableHead>Visible To</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {draftConfig.embeds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No dashboard embeds yet. Click "Add Dashboard/Explore" to get started.
                </TableCell>
              </TableRow>
            ) : (
              draftConfig.embeds.map((embed) => (
                <TableRow key={embed.id}>
                  <TableCell className="font-medium">{embed.domain || '-'}</TableCell>
                  <TableCell>{embed.subdomain || '-'}</TableCell>
                  <TableCell className="font-mono text-sm">{embed.lookerDashboardId}</TableCell>
                  <TableCell>{embed.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {embed.visibilityRoles.map(role => (
                        <span
                          key={role}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: "hsl(var(--v2-accent-soft))",
                            color: "hsl(var(--v2-black))"
                          }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
