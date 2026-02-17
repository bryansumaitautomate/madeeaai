import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditData } from "@/types/audit";
import { ArrowLeft, ArrowRight, Building2, Target, Layers, Edit2, Clock, Users } from "lucide-react";

interface SummaryPreviewStepProps {
  data: AuditData;
  onSubmit: () => void;
  onBack: () => void;
  onEditStep: (step: number) => void;
}

const getEmployeeLabel = (v: string) => ({ "1-10": "1-10", "11-50": "11-50", "51-200": "51-200", "201-500": "201-500", "501-1000": "501-1,000", "1000+": "1,000+" }[v] || v) + " employees";
const getRevenueLabel = (v: string, c?: string) => v === "other" ? c || "Custom" : ({ "under-10k": "Under $10K", "10k-25k": "$10K-$25K", "25k-50k": "$25K-$50K", "50k-100k": "$50K-$100K", "100k-250k": "$100K-$250K", "250k-500k": "$250K-$500K", "500k-1m": "$500K-$1M", "1m-5m": "$1M-$5M", "5m+": "$5M+" }[v] || v) + "/month";
const getIncomeGoalLabel = (v: string, c?: string) => v === "other" ? c || "Custom" : ({ "5k-10k": "$5K-$10K", "10k-25k": "$10K-$25K", "25k-50k": "$25K-$50K", "50k-100k": "$50K-$100K", "100k-250k": "$100K-$250K", "250k-500k": "$250K-$500K", "500k-1m": "$500K-$1M", "1m-5m": "$1M-$5M", "5m+": "$5M+" }[v] || v);
const getCostDriverLabel = (v: string, c?: string) => v === "other" ? c || "Custom" : ({ "labor-payroll": "Labor/Payroll", "marketing-advertising": "Marketing & advertising", "software-tools": "Software & tools", "operations-logistics": "Operations & logistics", "customer-acquisition": "Customer acquisition", "manual-tasks": "Manual repetitive tasks" }[v] || v);

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-medium text-foreground">{value || "Not specified"}</span>
  </div>
);

export const SummaryPreviewStep = ({ data, onSubmit, onBack, onEditStep }: SummaryPreviewStepProps) => {
  const { companyInfo, goalsReadiness, departments } = data;
  const totalProcesses = departments.reduce((s, d) => s + d.processes.length, 0);
  const totalHours = departments.reduce((s, d) => s + d.processes.reduce((ps, p) => ps + p.hoursPerWeek, 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Review Your Audit Details</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Double-check your information before we analyze your operations</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Company Profile</CardTitle></div>
              <Button variant="ghost" size="sm" onClick={() => onEditStep(1)} className="text-muted-foreground hover:text-primary"><Edit2 className="w-4 h-4 mr-1" />Edit</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <SummaryItem label="Company Name" value={companyInfo.companyName} />
            <SummaryItem label="Industry" value={companyInfo.industry} />
            <SummaryItem label="Employees" value={getEmployeeLabel(companyInfo.employeeCount)} />
            <SummaryItem label="Tech Stack" value={companyInfo.techStack || "None specified"} />
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Goals & Readiness</CardTitle></div>
              <Button variant="ghost" size="sm" onClick={() => onEditStep(2)} className="text-muted-foreground hover:text-primary"><Edit2 className="w-4 h-4 mr-1" />Edit</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <SummaryItem label="Monthly Revenue" value={getRevenueLabel(goalsReadiness.currentMonthlyRevenue, goalsReadiness.currentMonthlyRevenueCustom)} />
            <SummaryItem label="Income Goal (90 days)" value={getIncomeGoalLabel(goalsReadiness.incomeGoal90Days, goalsReadiness.incomeGoal90DaysCustom)} />
            <SummaryItem label="Avg. Employee Rate" value={goalsReadiness.averageEmployeeHourlyRate ? `$${goalsReadiness.averageEmployeeHourlyRate}/hr` : "Not specified"} />
            <SummaryItem label="Biggest Cost Driver" value={getCostDriverLabel(goalsReadiness.biggestCostDriver, goalsReadiness.biggestCostDriverCustom)} />
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Layers className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Departments & Workflows</CardTitle></div>
              <Button variant="ghost" size="sm" onClick={() => onEditStep(3)} className="text-muted-foreground hover:text-primary"><Edit2 className="w-4 h-4 mr-1" />Edit</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-4 mb-4 text-sm">
              <span className="text-muted-foreground"><span className="font-medium text-foreground">{departments.length}</span> departments</span>
              <span className="text-muted-foreground"><span className="font-medium text-foreground">{totalProcesses}</span> processes</span>
              <span className="text-muted-foreground"><span className="font-medium text-foreground">{totalHours}</span> hrs/week</span>
            </div>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.id} className="rounded-lg p-4 bg-secondary/20">
                  <h4 className="font-semibold text-foreground mb-3">{dept.name}</h4>
                  <div className="space-y-2">
                    {dept.processes.map((process) => (
                      <div key={process.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm py-2 px-3 bg-secondary/30 rounded gap-1">
                        <span className="text-foreground">{process.processName || "Unnamed"}</span>
                        <div className="flex items-center gap-3 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{process.hoursPerWeek} hrs/wk</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{process.peopleInvolved}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-3xl mx-auto pt-8">
        <Button variant="outline" size="lg" onClick={onBack} className="w-full sm:flex-1"><ArrowLeft className="w-5 h-5 mr-2" />Back</Button>
        <Button size="lg" onClick={onSubmit} className="w-full sm:flex-1 group rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">Analyze My Operations <ArrowRight className="w-5 h-5 ml-2" /></Button>
      </div>
    </div>
  );
};
