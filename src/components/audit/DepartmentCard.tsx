import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Plus, Trash2, Building } from "lucide-react";
import { Department, Process } from "@/types/audit";
import { ProcessCard } from "./ProcessCard";
import { cn } from "@/lib/utils";
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

interface DepartmentCardProps {
  department: Department;
  index: number;
  onUpdate: (updates: Partial<Department>) => void;
  onRemove: () => void;
  canRemove: boolean;
  errors?: Record<string, Record<string, string>>;
}

export const DepartmentCard = ({
  department,
  index,
  onUpdate,
  onRemove,
  canRemove,
  errors = {},
}: DepartmentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingName, setIsEditingName] = useState(!department.name);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const addProcess = () => {
    const newProcess: Process = {
      id: generateId(),
      processName: "",
      hoursPerWeek: 0,
      peopleInvolved: 1,
      painPoints: "",
    };
    onUpdate({ processes: [...department.processes, newProcess] });
  };

  const updateProcess = (processId: string, updates: Partial<Process>) => {
    onUpdate({
      processes: department.processes.map((p) =>
        p.id === processId ? { ...p, ...updates } : p
      ),
    });
  };

  const removeProcess = (processId: string) => {
    onUpdate({
      processes: department.processes.filter((p) => p.id !== processId),
    });
  };

  const totalHours = department.processes.reduce((acc, p) => acc + (p.hoursPerWeek * p.peopleInvolved), 0);
  const processCount = department.processes.length;

  return (
    <div className="audit-glass-card overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-primary-foreground" />
            </div>
            {isEditingName ? (
              <Input
                value={department.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                onBlur={() => department.name && setIsEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && department.name) {
                    setIsEditingName(false);
                  }
                }}
                placeholder="Enter department name..."
                className="h-9 bg-background/50 border-border max-w-[250px]"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-left hover:text-primary transition-colors"
              >
                <h3 className="font-semibold">{department.name || "Untitled Department"}</h3>
                <p className="text-xs text-muted-foreground">
                  {processCount} process{processCount !== 1 ? "es" : ""} • {totalHours} hrs/week total
                </p>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {canRemove && (
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Department?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{department.name || 'this department'}" and all its processes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 text-muted-foreground">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
      <div className={cn("transition-all duration-300 overflow-hidden", isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0")}>
        <div className="p-4 space-y-4">
          {department.processes.map((process, processIndex) => (
            <ProcessCard
              key={process.id}
              process={process}
              index={processIndex}
              onUpdate={(updates) => updateProcess(process.id, updates)}
              onRemove={() => removeProcess(process.id)}
              canRemove={department.processes.length > 1}
              errors={errors[process.id]}
            />
          ))}
          <Button variant="outline" onClick={addProcess} className="w-full border-dashed hover:border-primary hover:text-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Process
          </Button>
        </div>
      </div>
    </div>
  );
};
