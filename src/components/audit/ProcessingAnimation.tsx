import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ProcessingAnimationProps {
  onComplete: () => void;
  isAnalysisReady?: boolean;
}

const analysisPhases = [
  "Scanning workflows for redundancy...",
  "Benchmarking against Top 1% Industry Standards...",
  "Calculating human capital leak...",
  "Generating your 12 month ROI Roadmap...",
];

export const ProcessingAnimation = ({ onComplete, isAnalysisReady = false }: ProcessingAnimationProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);

  const handleComplete = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => onComplete(), 600);
  }, [onComplete]);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => {
        const next = prev + 1;
        if (next >= analysisPhases.length) { setHasCompletedCycle(true); return prev; }
        return next;
      });
    }, 1500);
    return () => clearInterval(phaseInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const targetProgress = isAnalysisReady ? 100 : Math.min(90, ((currentPhase + 1) / analysisPhases.length) * 90);
        return prev < targetProgress ? Math.min(prev + 1, targetProgress) : prev;
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, [currentPhase, isAnalysisReady]);

  useEffect(() => {
    if (isAnalysisReady && hasCompletedCycle && !isFlashing) {
      setProgress(100);
      const t = setTimeout(() => handleComplete(), 500);
      return () => clearTimeout(t);
    }
  }, [isAnalysisReady, hasCompletedCycle, isFlashing, handleComplete]);

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] overflow-hidden transition-opacity duration-300", isFlashing && "audit-animate-flash-white")}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] audit-animate-singularity-pulse" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,102,255,0.5) 0%, rgba(59,130,246,0.3) 30%, rgba(0,102,255,0.1) 60%, transparent 100%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] audit-animate-singularity-ring" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(0,102,255,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={cn("absolute w-1 h-1 rounded-full audit-animate-particle-absorb", i % 3 === 0 ? "bg-white" : "bg-primary")}
            style={{ left: `${10 + (i * 7)}%`, top: `${20 + (i % 4) * 15}%`, animationDelay: `${i * 0.3}s`, opacity: 0.7 }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 h-24 flex items-center justify-center">
          <h2 key={currentPhase} className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white audit-animate-text-shimmer tracking-tight">
            {analysisPhases[currentPhase]}
          </h2>
        </div>

        <div className="w-full max-w-lg">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-100 ease-out relative overflow-hidden" style={{ width: `${progress}%`, background: '#3b82f6', boxShadow: '0 0 12px rgba(59,130,246,0.6)' }}>
              <div className="absolute inset-0 audit-animate-shimmer-bar" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
            </div>
          </div>
          <p className="text-center text-sm text-primary/70 mt-4 font-mono">{Math.round(progress)}% complete</p>
        </div>

        <div className="flex gap-3 mt-10">
          {analysisPhases.map((_, index) => (
            <div key={index} className={cn("h-1.5 rounded-full transition-all duration-500",
              index === currentPhase ? "w-8 bg-gradient-to-r from-primary to-blue-400" : index < currentPhase ? "w-1.5 bg-primary/60" : "w-1.5 bg-white/20"
            )} />
          ))}
        </div>
      </div>

      {isFlashing && <div className="fixed inset-0 z-50 bg-white audit-animate-flash-fade" />}
    </div>
  );
};
