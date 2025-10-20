import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/contexts/AdminContext";

export const LinkLibrarySection = () => {
  const { draftConfig } = useAdmin();

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
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button 
            className="gap-2"
            style={{
              backgroundColor: "hsl(var(--v2-black))",
              color: "hsl(var(--v2-surface))"
            }}
          >
            <Plus className="h-4 w-4" />
            Add Link
          </Button>
        </div>
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
              <TableHead>URL</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Domain Tag</TableHead>
              <TableHead>Visible To</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {draftConfig.linkLibrary.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.name}</TableCell>
                <TableCell className="font-mono text-xs max-w-[300px] truncate">
                  {link.url}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {link.icon}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{link.domainTag}</Badge>
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
    </div>
  );
};
