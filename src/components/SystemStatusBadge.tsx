import { Shield, Activity } from 'lucide-react';

export default function SystemStatusBadge() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <Shield size={12} className="text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          System Status
        </span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Pulsing status indicator */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Activity size={16} className="text-white" />
              </div>
            </div>
          </div>
          {/* Outer pulse ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        </div>
        
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-1">
          Optimal
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          All systems operational
        </span>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-border">
        <div className="text-center">
          <div className="font-mono text-lg text-foreground">99.9%</div>
          <div className="font-mono text-[9px] text-muted-foreground uppercase">Uptime</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-lg text-primary">0.3s</div>
          <div className="font-mono text-[9px] text-muted-foreground uppercase">Avg Response</div>
        </div>
      </div>
    </div>
  );
}
