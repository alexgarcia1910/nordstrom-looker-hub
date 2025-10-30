import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export const AnnouncementsSection = () => {
  const { draftConfig, updateDraftConfig } = useAdmin();
  const announcement = draftConfig.announcement;

  const updateAnnouncement = (updates: Partial<typeof announcement>) => {
    updateDraftConfig({
      announcement: { ...announcement, ...updates }
    });
  };

  const addBullet = () => {
    updateAnnouncement({
      bullets: [...announcement.bullets, ""]
    });
  };

  const updateBullet = (index: number, value: string) => {
    const bullets = [...announcement.bullets];
    bullets[index] = value;
    updateAnnouncement({ bullets });
  };

  const removeBullet = (index: number) => {
    updateAnnouncement({
      bullets: announcement.bullets.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    toast.success("Announcement settings saved");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 
          className="text-2xl font-semibold mb-2"
          style={{ color: "hsl(var(--v2-text-primary))" }}
        >
          Announcements & Banner
        </h2>
        <p 
          className="text-sm"
          style={{ color: "hsl(var(--v2-text-secondary))" }}
        >
          Configure the info banner shown at the top of the Front Door
        </p>
      </div>

      <div 
        className="rounded-xl p-6 space-y-6"
        style={{ 
          backgroundColor: "hsl(var(--v2-surface))",
          border: "1px solid hsl(var(--v2-border-soft))"
        }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Enable Announcement</Label>
            <p className="text-xs text-muted-foreground">
              Show the announcement banner to users
            </p>
          </div>
          <Switch
            checked={announcement.enabled}
            onCheckedChange={(enabled) => updateAnnouncement({ enabled })}
          />
        </div>

        {announcement.enabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={announcement.title}
                onChange={(e) => updateAnnouncement({ title: e.target.value })}
                placeholder="e.g., 3 Things to Know About Looker"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Bullet Points</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addBullet}
                  className="gap-2"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Bullet
                </Button>
              </div>
              
              <div className="space-y-2">
                {announcement.bullets.map((bullet, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={bullet}
                      onChange={(e) => updateBullet(index, e.target.value)}
                      placeholder={`Bullet point ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBullet(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dismissible</Label>
                <p className="text-xs text-muted-foreground">
                  Allow users to close the banner
                </p>
              </div>
              <Switch
                checked={announcement.dismissible}
                onCheckedChange={(dismissible) => updateAnnouncement({ dismissible })}
              />
            </div>
          </>
        )}

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            style={{
              backgroundColor: "hsl(var(--v2-black))",
              color: "hsl(var(--v2-surface))"
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
