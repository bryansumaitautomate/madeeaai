import { useState } from "react";
import { GoalsReadiness } from "@/types/audit";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Target, Lightbulb, TrendingUp, Sparkles, DollarSign, AlertCircle } from "lucide-react";

interface GoalsReadinessStepProps {
  data: GoalsReadiness;
  onUpdate: (data: GoalsReadiness) => void;
  onNext: () => void;
  onBack: () => void;
}

const incomeGoalOptions = [
  { value: "5k-10k", label: "$5K - $10K" }, { value: "10k-25k", label: "$10K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" }, { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k-250k", label: "$100K - $250K" }, { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" }, { value: "1m-5m", label: "$1M - $5M" },
  { value: "5m+", label: "$5M+" }, { value: "other", label: "Other" },
];

const revenueOptions = [
  { value: "under-10k", label: "Under $10K" }, { value: "10k-25k", label: "$10K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" }, { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k-250k", label: "$100K - $250K" }, { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" }, { value: "1m-5m", label: "$1M - $5M" },
  { value: "5m+", label: "$5M+" }, { value: "other", label: "Other" },
];

const costDriverOptions = [
  { value: "labor-payroll", label: "Labor/Payroll costs" },
  { value: "marketing-advertising", label: "Marketing & advertising" },
  { value: "software-tools", label: "Software & tools" },
  { value: "operations-logistics", label: "Operations & logistics" },
  { value: "customer-acquisition", label: "Customer acquisition" },
  { value: "manual-tasks", label: "Manual repetitive tasks" },
  { value: "other", label: "Other" },
];

export const GoalsReadinessStep = ({ data, onUpdate, onNext, onBack }: GoalsReadinessStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof GoalsReadiness, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const isValid = data.incomeGoal90Days && (data.incomeGoal90Days !== "other" || data.incomeGoal90DaysCustom) &&
    data.averageEmployeeHourlyRate && data.previousAIInvestment && data.currentMonthlyRevenue &&
    (data.currentMonthlyRevenue !== "other" || data.currentMonthlyRevenueCustom) &&
    data.biggestCostDriver && (data.biggestCostDriver !== "other" || data.biggestCostDriverCustom);

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (data.incomeGoal90Days === "other" && !data.incomeGoal90DaysCustom?.trim()) newErrors.incomeGoal90DaysCustom = "Please enter your custom income goal";
    if (data.currentMonthlyRevenue === "other" && !data.currentMonthlyRevenueCustom?.trim()) newErrors.currentMonthlyRevenueCustom = "Please enter your custom revenue amount";
    if (data.biggestCostDriver === "other" && !data.biggestCostDriverCustom?.trim()) newErrors.biggestCostDriverCustom = "Please describe your biggest cost driver";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onNext();
  };

  const renderChips = (fieldId: string, field: keyof GoalsReadiness, suggestions: string[]) => (
    <div className="flex flex-wrap gap-2 pt-1">
      {suggestions.map((suggestion) => {
        const isSelected = (data[field] as string).toLowerCase().includes(suggestion.toLowerCase());
        return (
          <button key={suggestion} type="button" onClick={() => {
            if (isSelected) {
              const regex = new RegExp(suggestion + ",?\\s*", "gi");
              const updated = (data[field] as string).replace(regex, "").trim().replace(/,\s*$/, "");
              handleChange(field, updated);
            } else {
              const current = (data[field] as string).trim();
              handleChange(field, current ? `${current}, ${suggestion}` : suggestion);
            }
          }} className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${isSelected ? 'bg-primary/20 border-primary text-primary' : 'bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}>
            {suggestion}
          </button>
        );
      })}
      <button type="button" onClick={() => document.getElementById(fieldId)?.focus()} className="px-3 py-1.5 text-xs rounded-full border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-200">+ Other</button>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight mb-3">Your Goals & Readiness</h2>
        <p className="text-muted-foreground">Help us understand your goals so we can tailor our recommendations</p>
      </div>

      <div className="audit-glass-card p-4 sm:p-8 rounded-2xl space-y-6">
        {/* Current Monthly Revenue */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><DollarSign className="w-4 h-4 text-primary" />What's your current monthly revenue/income? <span className="text-destructive">*</span></Label>
          <Select value={data.currentMonthlyRevenue} onValueChange={(v) => handleChange("currentMonthlyRevenue", v)}>
            <SelectTrigger className="h-12 bg-background/50 border-border"><SelectValue placeholder="Select your current revenue" /></SelectTrigger>
            <SelectContent>{revenueOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
          {data.currentMonthlyRevenue === "other" && <Input value={data.currentMonthlyRevenueCustom || ""} onChange={(e) => handleChange("currentMonthlyRevenueCustom", e.target.value)} placeholder="Enter your amount" className={`h-12 bg-background/50 border-border ${errors.currentMonthlyRevenueCustom ? 'border-destructive' : ''}`} />}
        </div>

        {/* Biggest Cost Driver */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><AlertCircle className="w-4 h-4 text-primary" />What's costing you the most right now? <span className="text-destructive">*</span></Label>
          <Select value={data.biggestCostDriver} onValueChange={(v) => handleChange("biggestCostDriver", v)}>
            <SelectTrigger className="h-12 bg-background/50 border-border"><SelectValue placeholder="Select your biggest cost driver" /></SelectTrigger>
            <SelectContent>{costDriverOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
          {data.biggestCostDriver === "other" && <Input value={data.biggestCostDriverCustom || ""} onChange={(e) => handleChange("biggestCostDriverCustom", e.target.value)} placeholder="Describe your biggest cost driver" className={`h-12 bg-background/50 border-border ${errors.biggestCostDriverCustom ? 'border-destructive' : ''}`} />}
        </div>

        {/* Income Goal */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><Target className="w-4 h-4 text-primary" />What's your income goal in 90 days? <span className="text-destructive">*</span></Label>
          <Select value={data.incomeGoal90Days} onValueChange={(v) => handleChange("incomeGoal90Days", v)}>
            <SelectTrigger className="h-12 bg-background/50 border-border"><SelectValue placeholder="Select your income goal" /></SelectTrigger>
            <SelectContent>{incomeGoalOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
          {data.incomeGoal90Days === "other" && <Input value={data.incomeGoal90DaysCustom || ""} onChange={(e) => handleChange("incomeGoal90DaysCustom", e.target.value)} placeholder="Enter your amount" className={`h-12 bg-background/50 border-border ${errors.incomeGoal90DaysCustom ? 'border-destructive' : ''}`} />}
        </div>

        {/* Hourly Rate */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><DollarSign className="w-4 h-4 text-primary" />What's your average employee hourly rate? <span className="text-destructive">*</span></Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input type="number" min="1" max="500" value={data.averageEmployeeHourlyRate} onChange={(e) => handleChange("averageEmployeeHourlyRate", e.target.value)} placeholder="e.g., 45" className="h-12 pl-7 bg-background/50 border-border" />
          </div>
          <p className="text-xs text-muted-foreground">This helps us calculate accurate cost savings</p>
        </div>

        {/* Previous Investment */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><Sparkles className="w-4 h-4 text-primary" />Have you invested in AI or business skills before? <span className="text-destructive">*</span></Label>
          <RadioGroup value={data.previousAIInvestment} onValueChange={(v) => handleChange("previousAIInvestment", v)} className="flex flex-wrap gap-4">
            {["yes", "no", "somewhat"].map((v) => (
              <div key={v} className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border bg-background/50 hover:border-primary/50 transition-colors">
                <RadioGroupItem value={v} id={`invest-${v}`} />
                <Label htmlFor={`invest-${v}`} className="cursor-pointer capitalize">{v}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Why Implement AI */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><Lightbulb className="w-4 h-4 text-primary" />Why do you want to implement AI now?</Label>
          <Textarea id="whyImplementAI" value={data.whyImplementAI} onChange={(e) => handleChange("whyImplementAI", e.target.value)} placeholder="Select from suggestions below or describe your own reasons..." className="bg-background/50 border-border min-h-[100px] resize-none" maxLength={500} />
          {renderChips("whyImplementAI", "whyImplementAI", ["Save time on repetitive tasks", "Reduce operational costs", "Scale without hiring", "Improve customer experience", "Stay competitive", "Increase revenue"])}
        </div>

        {/* Expected Changes */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-medium"><TrendingUp className="w-4 h-4 text-primary" />What changes are you expecting in your business?</Label>
          <Textarea id="expectedChanges" value={data.expectedChanges} onChange={(e) => handleChange("expectedChanges", e.target.value)} placeholder="Describe the outcomes you're hoping to achieve..." className="bg-background/50 border-border min-h-[100px] resize-none" maxLength={500} />
          {renderChips("expectedChanges", "expectedChanges", ["Faster workflows", "Lower operational costs", "Higher revenue", "Better customer satisfaction", "More time for strategic work", "Improved team productivity", "Reduced errors", "Easier scaling"])}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext} disabled={!isValid} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
