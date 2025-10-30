import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/contexts/AdminContext";

const domains = ["Customer", "Finance", "Merchandising", "Store Selling", "Supply Chain", "Technology"];
const icons = ["BookOpen", "LogIn", "FileText", "Link", "Globe", "ExternalLink", "Folder", "Star"];
const roles = ["Viewer", "Editor", "Admin"];

export const LinkLibrarySection = () => {
  const { draftConfig, updateDraftConfig } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    url: "",
    icon: "",
    visibilityRoles: [] as string[],
  });

  const handleAddLink = () => {
    const newLink = {
      id: `link-${Date.now()}`,
      name: formData.name,
      url: formData.url,
      icon: formData.icon,
      domainTag: formData.domain,
      visibilityRoles: formData.visibilityRoles,
    };

    updateDraftConfig({
      linkLibrary: [...draftConfig.linkLibrary, newLink],
    });

    setFormData({ name: "", domain: "", url: "", icon: "", visibilityRoles: [] });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-2xl font-semibold mb-2"
            style={{ color: "hsl(var(--v2-text-primary))" }}
          >
            Link Library
          </h2>
          <p 
            className="text-sm"
            style={{ color: "hsl(var(--v2-text-secondary))" }}
          >
            Central repository for all links used across the application
          </p>
        </div>
        <Button 
          className="gap-2"
          style={{
            backgroundColor: "hsl(var(--v2-black))",
            color: "hsl(var(--v2-surface))"
          }}
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Link
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
              <TableHead>Name</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Visible To</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {draftConfig.linkLibrary.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{link.domainTag}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs max-w-[300px] truncate">
                  {link.url}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {link.icon}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {link.visibilityRoles.map(role => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Link</DialogTitle>
            <DialogDescription>
              Add a new link to the library
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter link name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="domain">Domain</Label>
              <Select
                value={formData.domain}
                onValueChange={(value) => setFormData({ ...formData, domain: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {icons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Visible To</Label>
              <div className="flex gap-2">
                {roles.map((role) => (
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddLink}
              disabled={!formData.name || !formData.domain || !formData.url || !formData.icon || formData.visibilityRoles.length === 0}
            >
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
