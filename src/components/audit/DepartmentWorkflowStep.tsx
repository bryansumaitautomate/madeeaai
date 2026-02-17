import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Plus, Layers } from "lucide-react";
import { Department, Process } from "@/types/audit";
import { DepartmentCard } from "./DepartmentCard";
import { toast } from "@/hooks/use-toast";

interface DepartmentWorkflowStepProps {
  departments: Department[];
  onUpdate: (departments: Department[]) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const suggestedDepartments = ["Marketing", "Sales", "Operations", "Customer Support", "HR", "Finance"];

export const DepartmentWorkflowStep = ({ departments, onUpdate, onSubmit, onBack }: DepartmentWorkflowStepProps) => {
  const [errors, setErrors] = useState<Record<string, Record<string, Record<string, string>>>>({});

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const createEmptyProcess = (): Process => ({
    id: generateId(), processName: "", hoursPerWeek: 0, peopleInvolved: 1, painPoints: "",
  });

  const addDepartment = (name = "") => {
    onUpdate([...departments, { id: generateId(), name, processes: [createEmptyProcess()] }]);
  };

  const updateDepartment = (deptId: string, updates: Partial<Department>) => {
    onUpdate(departments.map((d) => (d.id === deptId ? { ...d, ...updates } : d)));
  };

  const removeDepartment = (deptId: string) => {
    onUpdate(departments.filter((d) => d.id !== deptId));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, Record<string, Record<string, string>>> = {};
    let isValid = true;
    let hasUnnamedDepartment = false;

    if (departments.length === 0) return false;

    departments.forEach((dept) => {
      if (!dept.name.trim()) { hasUnnamedDepartment = true; isValid = false; }
      dept.processes.forEach((process) => {
        const processErrors: Record<string, string> = {};
        if (!process.processName.trim()) { processErrors.processName = "Process name is required"; isValid = false; }
        if (process.hoursPerWeek <= 0) { processErrors.hoursPerWeek = "Hours must be greater than 0"; isValid = false; }
        if (process.peopleInvolved < 1) { processErrors.peopleInvolved = "At least 1 person must be involved"; isValid = false; }
        if (Object.keys(processErrors).length > 0) {
          if (!newErrors[dept.id]) newErrors[dept.id] = {};
          newErrors[dept.id][process.id] = processErrors;
        }
      });
    });

    setErrors(newErrors);
    if (hasUnnamedDepartment) toast({ title: "Missing department name", description: "Please name all departments", variant: "destructive" });
    return isValid;
  };

  const handleSubmit = () => { if (validate()) onSubmit(); };

  const unusedSuggestions = suggestedDepartments.filter(s => !departments.some(d => d.name.toLowerCase() === s.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Map your bottlenecks.</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Identify the tasks consuming your time.</p>
      </div>

      {unusedSuggestions.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Quick add:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {unusedSuggestions.map((dept) => (
              <Button key={dept} variant="outline" size="sm" onClick={() => addDepartment(dept)} className="border-dashed hover:border-primary hover:text-primary">
                <Plus className="w-3 h-3 mr-1" />{dept}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {departments.map((dept, index) => (
          <DepartmentCard key={dept.id} department={dept} index={index} onUpdate={(updates) => updateDepartment(dept.id, updates)} onRemove={() => removeDepartment(dept.id)} canRemove={true} errors={errors[dept.id]} />
        ))}
        <Button variant="outline" onClick={() => addDepartment()} className="w-full h-14 border-dashed border-2 hover:border-primary">
          <Plus className="w-5 h-5 mr-2" /> Add Department
        </Button>
        {departments.length === 0 && <p className="text-center text-muted-foreground text-sm">Add at least one department to continue</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-3xl mx-auto pt-8">
        <Button variant="outline" size="lg" onClick={onBack} className="w-full sm:flex-1">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
        <Button size="lg" onClick={handleSubmit} disabled={departments.length === 0} className="w-full sm:flex-1 group rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
          Review Summary <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
