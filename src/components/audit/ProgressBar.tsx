import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Company Profile" },
  { number: 2, label: "Goals & Readiness" },
  { number: 3, label: "Departments" },
  { number: 4, label: "Review & Confirm" },
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        <div className="h-1 bg-secondary rounded-full" />
        <div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all duration-300",
                    isCompleted && "bg-primary border-primary",
                    isCurrent && "bg-primary border-primary shadow-lg shadow-primary/50",
                    !isCompleted && !isCurrent && "bg-background border-muted-foreground/30"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {steps.map((step) => {
          const isCurrent = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          return (
            <div 
              key={step.number} 
              className={cn(
                "text-[10px] sm:text-sm font-mono font-medium transition-colors text-center max-w-[80px] sm:max-w-none",
                isCurrent ? "text-foreground" : isCompleted ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
