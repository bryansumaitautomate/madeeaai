import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DepartmentRadar from './DepartmentRadar';
import LeadVelocityChart from './LeadVelocityChart';
import SystemStatusBadge from './SystemStatusBadge';
export default function SalesControlRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);
  return <div ref={containerRef} className="relative w-full max-w-5xl mx-auto" style={{
    perspective: '1500px'
  }}>
      <motion.div style={{
      rotateX,
      scale,
      opacity,
      transformStyle: 'preserve-3d'
    }} className="relative glass-infrastructure rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/80" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-muted-foreground hidden xs:inline">
              AI Automation Control Room
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 uppercase">Live</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 min-h-[280px] sm:h-[320px]">
          {/* Department Radar - Left (Featured) */}
          <div className="glass-infrastructure rounded-lg sm:rounded-xl p-3 sm:p-4 md:col-span-2 relative overflow-hidden min-h-[220px] sm:min-h-0">
            <DepartmentRadar />
          </div>

          {/* Right column - stacked panels */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Lead Velocity Chart */}
            <div className="glass-infrastructure rounded-lg sm:rounded-xl p-3 sm:p-4 flex-1 min-h-[120px]">
              <LeadVelocityChart />
            </div>

            {/* System Status */}
            <div className="glass-infrastructure rounded-lg sm:rounded-xl p-3 sm:p-4">
              <SystemStatusBadge />
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase">Depts Active</span>
              <span className="font-mono text-xs sm:text-sm text-primary">4/4</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase">Issues Found</span>
              <span className="font-mono text-xs sm:text-sm text-amber-400">12</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase">Auto-Fixed</span>
              <span className="font-mono text-xs sm:text-sm text-emerald-400">9</span>
            </div>
          </div>
          <span className="font-mono text-muted-foreground/60 text-xs sm:text-sm">Powered by Madeea.ai</span>
        </div>
      </motion.div>
    </div>;
}