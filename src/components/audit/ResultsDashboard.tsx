import { useEffect, useState } from "react";
import { AuditData, AIAnalysisResponse, LongTermStrategy, FullTableRow, ComputationBreakdown } from "@/types/audit";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Rocket, Lock, Send, CheckCircle, Calculator, ChevronDown } from "lucide-react";
import FormulaBreakdown from "./FormulaBreakdown";
import MadeeaCTA from "./MadeeaCTA";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ResultsDashboardProps {
  data: AuditData;
  analysis: AIAnalysisResponse;
  hiddenData: { longTermStrategy: LongTermStrategy[]; fullTable: FullTableRow[] } | null;
}

const parseCurrency = (str: string) => parseInt(str.replace(/[$,]/g, '')) || 0;
const parseROI = (str: string) => parseFloat(str.replace('x', '')) || 0;
const parseHours = (str: string) => parseInt(str.replace(/,/g, '')) || 0;

const AnimatedValue = ({ value, prefix = '', suffix = '', delay = 0, decimals = 0 }: { value: number; prefix?: string; suffix?: string; delay?: number; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHasStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!hasStarted) return;
    const duration = 1500; const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime; const progress = Math.min(elapsed / duration, 1);
      setCount(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, value]);
  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
  return <span>{prefix}{displayValue}{suffix}</span>;
};

const AnimatedBadge = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={cn("relative p-[1px] rounded-2xl sm:rounded-full overflow-hidden transition-all duration-500", isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
      <div className="absolute inset-0 rounded-2xl sm:rounded-full animate-[spin_3s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, #3b82f6, #60a5fa, #3b82f6)' }} />
      <div className="relative bg-black px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl sm:rounded-full flex items-center gap-2">{children}</div>
    </div>
  );
};

const QuickWinCard = ({ title, description, icon: Icon, delay }: { title: string; description: string; icon: React.ElementType; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={cn("group relative rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/20", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
      <button className="w-full p-4 sm:p-6 text-left sm:cursor-default" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-3 sm:block">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 sm:mb-4">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
              <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform sm:hidden", isExpanded && "rotate-180")} />
            </div>
            <p className={cn("text-sm text-white/50 leading-relaxed sm:mt-2 hidden sm:block", isExpanded && "!block mt-2")}>{description}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

const LeadMagnetGate = ({ data, analysis, onSuccess }: { data: AuditData; analysis: AIAnalysisResponse; onSuccess: () => void }) => {
  const [email, setEmail] = useState(""); const [name, setName] = useState(""); const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) { toast.error("Please fill in all fields"); return; }
    if (!consent) { toast.error("Please agree to share your data"); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://madeeas.app.n8n.cloud/webhook/madeea-com", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: { name, email }, client_input: { company_info: data.companyInfo, goals_readiness: data.goalsReadiness, departments: data.departments }, ai_analysis: { dashboard: analysis.dashboard, quick_wins: analysis.quick_wins, long_term_strategy: analysis.long_term_strategy, full_table: analysis.full_table, cost_driver_analysis: analysis.cost_driver_analysis, computation_breakdown: analysis.computation_breakdown }, submitted_at: new Date().toISOString() }),
      });
      if (response.ok) { setIsSubmitted(true); onSuccess(); toast.success("Your report is on its way!"); }
      else throw new Error("Failed");
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setIsSubmitting(false); }
  };

  if (isSubmitted) return (
    <div className="relative p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="relative text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-blue-400" /></div>
        <h3 className="text-xl font-semibold text-white mb-2">Report Sent!</h3>
        <p className="text-white/60 text-sm">Your report is on its way to <span className="text-blue-400">{email}</span></p>
      </div>
    </div>
  );

  return (
    <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-400/5" />
      <div className="relative mb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-normal tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #60a5fa)' }}>Unlock Your 12-Month Strategic Roadmap</h3>
      </div>
      <div className="relative">
        <p className="text-white/60 text-sm md:text-base mb-6 max-w-xl">We have identified your <span className="text-white font-medium">Top 3 Long-Term Value plays</span> and a full surgical breakdown.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30" />
          <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30" />
          <div className="flex items-start gap-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <label htmlFor="consent" className="text-white/50 text-xs leading-relaxed cursor-pointer">I agree to share my business data with Madeea for analysis.</label>
          </div>
          <div className="relative p-[1px] rounded-full overflow-hidden w-auto self-center">
            <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, #3b82f6 0%, #60a5fa 25%, #93c5fd 50%, #60a5fa 75%, #3b82f6 100%)' }} />
            <button type="submit" disabled={isSubmitting} className="relative bg-black px-6 py-2.5 rounded-full flex items-center justify-center gap-2 text-sm font-semibold text-white hover:bg-black/90 transition-all disabled:opacity-50">
              {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Get Report</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ComputationBreakdownSection = ({ breakdown }: { breakdown: ComputationBreakdown }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-3"><Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" /><span className="font-semibold text-white text-sm sm:text-base">How We Calculated This</span></div>
        <ChevronDown className={cn("w-5 h-5 text-white/50 transition-transform", isExpanded && "rotate-180")} />
      </button>
      {isExpanded && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02]"><p className="text-white/50 text-xs font-mono uppercase tracking-wider mb-1">Hourly Rate</p><p className="text-white font-semibold">{breakdown.hourly_rate_used}</p></div>
            <div className="p-4 rounded-xl bg-white/[0.02]"><p className="text-white/50 text-xs font-mono uppercase tracking-wider mb-1">Total Hours/Year</p><p className="text-white font-semibold">{breakdown.total_annual_hours?.toLocaleString() || "—"}</p></div>
            <div className="p-4 rounded-xl bg-white/[0.02]"><p className="text-white/50 text-xs font-mono uppercase tracking-wider mb-1">Current Labor Cost</p><p className="text-white font-semibold">{breakdown.total_annual_labor_cost}</p></div>
            <div className="p-4 rounded-xl bg-white/[0.02]"><p className="text-white/50 text-xs font-mono uppercase tracking-wider mb-1">Automation Efficiency</p><p className="text-white font-semibold">{breakdown.automation_efficiency}</p></div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
            <p className="text-white/50 text-xs font-mono uppercase tracking-wider mb-2">ROI Calculation</p>
            <p className="text-white/80 text-sm">{breakdown.roi_calculation}</p>
            <p className="text-white/40 text-xs mt-2">ROI capped at {breakdown.roi_ceiling_applied}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const getIconForTitle = (title: string) => {
  if (title.toLowerCase().includes('content') || title.toLowerCase().includes('intelligence')) return Sparkles;
  if (title.toLowerCase().includes('production') || title.toLowerCase().includes('pipeline')) return Zap;
  return Rocket;
};

export const ResultsDashboard = ({ data, analysis, hiddenData }: ResultsDashboardProps) => {
  const [showContent, setShowContent] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const totalSavings = parseCurrency(analysis.dashboard.revenue);
  const roiMultiplier = parseROI(analysis.dashboard.roi);
  const hoursSaved = parseHours(analysis.dashboard.hours_saved);
  const automationPotential = parseInt(analysis.dashboard.potential_pct.replace('%', '')) || 80;

  useEffect(() => { const t = setTimeout(() => setShowContent(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0C0E] text-white overflow-hidden font-sans">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute inset-0 pointer-events-none z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="relative z-20 p-3 sm:p-6 md:p-8">
        <div className={cn("max-w-5xl mx-auto transition-all duration-700", showContent ? "opacity-100" : "opacity-0")}>
          <div className="rounded-2xl sm:rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.10] p-5 sm:p-8 md:p-12 mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-tight text-white mb-3 sm:mb-4">Your Efficiency Report is Ready.</h2>
            <p className="text-white/60 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              Based on your inputs, your current workflow has an Optimization Potential of <span className="text-[#3b82f6] font-bold">{automationPotential}%</span>.
            </p>
            
            <div className="hidden sm:flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <p className="text-5xl md:text-7xl font-extrabold tracking-tighter text-blue-500"><AnimatedValue value={totalSavings} prefix="$" delay={300} /></p>
                <p className="text-white/50 font-mono uppercase tracking-wider mt-3 text-sm md:text-base">Reclaimable Revenue</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <AnimatedBadge delay={500}><span className="text-xl md:text-2xl font-bold text-white"><AnimatedValue value={roiMultiplier} suffix="x" delay={600} decimals={1} /></span><span className="text-white/50 text-[10px] md:text-xs font-mono uppercase tracking-widest">ROI</span></AnimatedBadge>
                <AnimatedBadge delay={700}><span className="text-xl md:text-2xl font-bold text-white"><AnimatedValue value={hoursSaved} delay={800} /></span><span className="text-white/50 text-[10px] md:text-xs font-mono uppercase tracking-widest">Hours Saved</span></AnimatedBadge>
              </div>
            </div>
            <FormulaBreakdown computationBreakdown={analysis.computation_breakdown} fullTable={analysis.full_table} />

            <div className="sm:hidden space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider mb-1">Reclaimable Revenue</p>
                <p className="text-3xl font-extrabold tracking-tighter text-blue-500"><AnimatedValue value={totalSavings} prefix="$" delay={300} /></p>
                <FormulaBreakdown computationBreakdown={analysis.computation_breakdown} fullTable={analysis.full_table} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"><p className="text-white/50 text-[10px] font-mono uppercase tracking-wider mb-1">ROI</p><p className="text-2xl font-bold text-white"><AnimatedValue value={roiMultiplier} suffix="x" delay={600} decimals={1} /></p></div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"><p className="text-white/50 text-[10px] font-mono uppercase tracking-wider mb-1">Hours Saved</p><p className="text-2xl font-bold text-white"><AnimatedValue value={hoursSaved} delay={800} /></p></div>
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6"><h3 className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-white/40">Top 3 Quick Wins</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {analysis.quick_wins.map((win, index) => (
              <QuickWinCard key={win.title} title={win.title} description={win.desc} icon={getIconForTitle(win.title)} delay={800 + (index * 150)} />
            ))}
          </div>

          

          <div className="mb-16"><LeadMagnetGate data={data} analysis={analysis} onSuccess={() => setReportSent(true)} /></div>

          <div className={cn("text-center transition-all duration-700", showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight text-white mb-6">Ready to turn these projections into profit?</h3>
            <MadeeaCTA label="Book Your Strategy Call" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/0qkIXW7E44BcuiWW7g1k', '_blank')} />
          </div>

          <p className="text-center text-white/30 text-xs mt-12">Analysis based on {data.departments.length} department{data.departments.length !== 1 ? 's' : ''} • {data.companyInfo.companyName}</p>
        </div>
      </div>
    </div>
  );
};
