import { useState, useEffect } from "react";
import { AuditData, CompanyInfo, GoalsReadiness, Department, AIAnalysisResponse, LongTermStrategy, FullTableRow } from "@/types/audit";
import { ProgressBar } from "./ProgressBar";
import { CompanyInfoStep } from "./CompanyInfoStep";
import { GoalsReadinessStep } from "./GoalsReadinessStep";
import { DepartmentWorkflowStep } from "./DepartmentWorkflowStep";
import { SummaryPreviewStep } from "./SummaryPreviewStep";
import { ProcessingAnimation } from "./ProcessingAnimation";
import { ResultsDashboard } from "./ResultsDashboard";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DisqualifiedScreen = ({ reason, onBack }: { reason: string; onBack: () => void }) => (
  <div className="text-center space-y-6 py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center">
      <AlertTriangle className="w-8 h-8 text-yellow-500" />
    </div>
    <div>
      <h2 className="text-2xl font-bold mb-2">We Need More Information</h2>
      <p className="text-muted-foreground max-w-md mx-auto">{reason}</p>
    </div>
    <Button onClick={onBack} variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Go Back and Complete</Button>
  </div>
);

const STORAGE_KEY = 'audit-wizard-progress';
type WizardState = 'form' | 'processing' | 'results';

export const AuditWizard = () => {
  const [wizardState, setWizardState] = useState<WizardState>('form');
  const [currentStep, setCurrentStep] = useState(1);
  const [auditData, setAuditData] = useState<AuditData>({
    companyInfo: { companyName: "", industry: "", employeeCount: "", techStack: "", referralSource: "" },
    goalsReadiness: { incomeGoal90Days: "", averageEmployeeHourlyRate: "", previousAIInvestment: "", whyImplementAI: "", expectedChanges: "", currentMonthlyRevenue: "", biggestCostDriver: "" },
    departments: [],
  });
  const [disqualification, setDisqualification] = useState({ status: false, reason: "" });
  const [analysisResponse, setAnalysisResponse] = useState<AIAnalysisResponse | null>(null);
  const [hiddenData, setHiddenData] = useState<{ longTermStrategy: LongTermStrategy[]; fullTable: FullTableRow[] } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { auditData: savedData, currentStep: savedStep } = JSON.parse(saved);
        setAuditData(savedData); setCurrentStep(savedStep);
        toast.info('Your previous progress has been restored');
      } catch (e) { console.error('Failed to restore:', e); }
    }
  }, []);

  useEffect(() => {
    if (wizardState === 'form') localStorage.setItem(STORAGE_KEY, JSON.stringify({ auditData, currentStep, savedAt: new Date().toISOString() }));
  }, [auditData, currentStep, wizardState]);

  const clearSavedProgress = () => localStorage.removeItem(STORAGE_KEY);

  const checkDisqualification = () => {
    if (auditData.departments.length === 0) return { status: true, reason: "Please add at least one department with processes." };
    const totalHours = auditData.departments.reduce((acc, dept) => acc + dept.processes.reduce((pAcc, proc) => pAcc + (proc.hoursPerWeek * proc.peopleInvolved), 0), 0);
    if (totalHours === 0) return { status: true, reason: "Please add time estimates to your processes." };
    return { status: false, reason: "" };
  };

  const handleSubmit = async () => {
    const disqualifyResult = checkDisqualification();
    if (disqualifyResult.status) { setDisqualification(disqualifyResult); return; }
    setWizardState('processing');
    try {
      const { data, error } = await supabase.functions.invoke('analyze-audit', {
        body: { companyInfo: auditData.companyInfo, goalsReadiness: auditData.goalsReadiness, departments: auditData.departments },
      });
      if (error) throw new Error(error.message || 'Failed to analyze');
      if (!data.success) throw new Error(data.error || 'Analysis failed');
      const analysis: AIAnalysisResponse = data.analysis;
      setAnalysisResponse(analysis);
      setHiddenData({ longTermStrategy: analysis.long_term_strategy, fullTable: analysis.full_table });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to analyze. Please try again.');
      setWizardState('form');
    }
  };

  const handleProcessingComplete = () => { if (analysisResponse) { clearSavedProgress(); setWizardState('results'); } };

  const handleRestart = () => {
    clearSavedProgress(); setWizardState('form'); setCurrentStep(1);
    setDisqualification({ status: false, reason: "" });
    setAuditData({ companyInfo: { companyName: "", industry: "", employeeCount: "", techStack: "", referralSource: "" }, goalsReadiness: { incomeGoal90Days: "", averageEmployeeHourlyRate: "", previousAIInvestment: "", whyImplementAI: "", expectedChanges: "", currentMonthlyRevenue: "", biggestCostDriver: "" }, departments: [] });
    setAnalysisResponse(null); setHiddenData(null);
  };

  return (
    <section className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-3 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        {disqualification.status && <DisqualifiedScreen reason={disqualification.reason} onBack={() => { setDisqualification({ status: false, reason: "" }); setCurrentStep(3); }} />}
        {wizardState === 'form' && !disqualification.status && (
          <>
            <ProgressBar currentStep={currentStep} totalSteps={4} />
            {currentStep === 1 && <CompanyInfoStep data={auditData.companyInfo} onUpdate={(info) => setAuditData(prev => ({ ...prev, companyInfo: info }))} onNext={() => setCurrentStep(2)} />}
            {currentStep === 2 && <GoalsReadinessStep data={auditData.goalsReadiness} onUpdate={(g) => setAuditData(prev => ({ ...prev, goalsReadiness: g }))} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
            {currentStep === 3 && <DepartmentWorkflowStep departments={auditData.departments} onUpdate={(d) => setAuditData(prev => ({ ...prev, departments: d }))} onSubmit={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />}
            {currentStep === 4 && <SummaryPreviewStep data={auditData} onSubmit={handleSubmit} onBack={() => setCurrentStep(3)} onEditStep={(step) => setCurrentStep(step)} />}
          </>
        )}
        {wizardState === 'processing' && <ProcessingAnimation onComplete={handleProcessingComplete} isAnalysisReady={!!analysisResponse} />}
        {wizardState === 'results' && analysisResponse && (
          <>
            <ResultsDashboard data={auditData} analysis={analysisResponse} hiddenData={hiddenData} />
            <div className="text-center mt-12">
              <Button variant="ghost" onClick={handleRestart} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4 mr-2" />Start New Audit</Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
