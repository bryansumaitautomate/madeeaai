import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TerminalLog from './TerminalLog';
import LeadVelocityChart from './LeadVelocityChart';
import SystemStatusBadge from './SystemStatusBadge';

export default function SalesControlRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto" style={{ perspective: '1500px' }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="relative glass-infrastructure rounded-2xl p-6 border border-border"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Sales Control Room
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-emerald-400 uppercase">Live</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[280px]">
          {/* Terminal Log - Left */}
          <div className="glass-infrastructure rounded-xl p-4">
            <TerminalLog />
          </div>

          {/* Lead Velocity Chart - Center */}
          <div className="glass-infrastructure rounded-xl p-4">
            <LeadVelocityChart />
          </div>

          {/* System Status - Right */}
          <div className="glass-infrastructure rounded-xl p-4">
            <SystemStatusBadge />
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Leads Today</span>
              <span className="font-mono text-sm text-primary">247</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Meetings Booked</span>
              <span className="font-mono text-sm text-emerald-400">38</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Response Rate</span>
              <span className="font-mono text-sm text-foreground">100%</span>
            </div>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground/60">
            Powered by 1Prompt Engine
          </span>
        </div>
      </motion.div>
    </div>
  );
}
