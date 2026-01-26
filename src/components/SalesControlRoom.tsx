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
    }} className="relative glass-infrastructure rounded-2xl p-6 border border-border">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              AI Automation Control Room
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-emerald-400 uppercase">Live</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[320px]">
          {/* Department Radar - Left (Featured) */}
          <div className="glass-infrastructure rounded-xl p-4 md:col-span-2 relative overflow-hidden">
            <DepartmentRadar />
          </div>

          {/* Right column - stacked panels */}
          <div className="flex flex-col gap-4">
            {/* Lead Velocity Chart */}
            <div className="glass-infrastructure rounded-xl p-4 flex-1">
              <LeadVelocityChart />
            </div>

            {/* System Status */}
            <div className="glass-infrastructure rounded-xl p-4">
              <SystemStatusBadge />
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Depts Active</span>
              <span className="font-mono text-sm text-primary">4/4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Issues Found</span>
              <span className="font-mono text-sm text-amber-400">12</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Auto-Fixed</span>
              <span className="font-mono text-sm text-emerald-400">9</span>
            </div>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground/60">Powered by Madeea.io</span>
        </div>
      </motion.div>
    </div>;
}