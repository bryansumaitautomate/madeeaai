import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Clock, Users, AlertCircle, GripVertical } from "lucide-react";
import { Process } from "@/types/audit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProcessCardProps {
  process: Process;
  index: number;
  onUpdate: (updates: Partial<Process>) => void;
  onRemove: () => void;
  canRemove: boolean;
  errors?: Record<string, string>;
}

export const ProcessCard = ({ 
  process, 
  index, 
  onUpdate, 
  onRemove, 
  canRemove,
  errors = {}
}: ProcessCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="p-5 rounded-xl bg-background/30 border border-border hover:border-border/80 transition-colors space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground/50" />
          <span className="text-sm font-medium text-muted-foreground">
            Process {index + 1}
          </span>
        </div>
        {canRemove && (
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Process?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{process.processName || 'this process'}". 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={onRemove}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Process Name</Label>
        <Input
          value={process.processName}
          onChange={(e) => onUpdate({ processName: e.target.value })}
          placeholder="e.g., Video Editing, Lead Generation, Customer Onboarding"
          className={`bg-background/50 border-border focus:border-primary ${errors.processName ? 'border-destructive' : ''}`}
        />
        {errors.processName && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.processName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            Hours/Week
          </Label>
          <Input
            type="number"
            min="0.5"
            max="168"
            step="0.5"
            value={process.hoursPerWeek || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              onUpdate({ hoursPerWeek: isNaN(value) ? 0 : Math.min(168, Math.max(0, value)) });
            }}
            placeholder="0"
            className={`bg-background/50 border-border focus:border-primary ${errors.hoursPerWeek ? 'border-destructive' : ''}`}
          />
          {errors.hoursPerWeek && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.hoursPerWeek}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            People Involved
          </Label>
          <Input
            type="number"
            min="1"
            max="10000"
            value={process.peopleInvolved || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              onUpdate({ peopleInvolved: isNaN(value) ? 1 : Math.min(10000, Math.max(1, value)) });
            }}
            placeholder="1"
            className={`bg-background/50 border-border focus:border-primary ${errors.peopleInvolved ? 'border-destructive' : ''}`}
          />
          {errors.peopleInvolved && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.peopleInvolved}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Pain Points</Label>
        <Textarea
          id={`painPoints-${index}`}
          value={process.painPoints}
          onChange={(e) => onUpdate({ painPoints: e.target.value })}
          placeholder="Select from suggestions below or describe your own..."
          className="min-h-[80px] bg-background/50 border-border focus:border-primary resize-none"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            "Too much manual work",
            "Slow turnaround times",
            "Repetitive tasks",
            "Inconsistent results",
            "Approval bottlenecks",
            "Hard to scale",
            "Lack of visibility",
            "High error rates",
            "Resource constraints",
          ].map((suggestion) => {
            const isSelected = process.painPoints.toLowerCase().includes(suggestion.toLowerCase());
            return (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    const regex = new RegExp(suggestion + ",?\\s*", "gi");
                    const updated = process.painPoints.replace(regex, "").trim().replace(/,\s*$/, "");
                    onUpdate({ painPoints: updated });
                  } else {
                    const current = process.painPoints.trim();
                    const newValue = current ? `${current}, ${suggestion}` : suggestion;
                    onUpdate({ painPoints: newValue });
                  }
                }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {suggestion}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => document.getElementById(`painPoints-${index}`)?.focus()}
            className="px-3 py-1.5 text-xs rounded-full border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-200"
          >
            + Other
          </button>
        </div>
      </div>
    </div>
  );
};
