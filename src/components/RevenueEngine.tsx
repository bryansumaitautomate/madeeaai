import { Zap, Mic, MessageSquare, Share2, Settings2, Shield } from 'lucide-react';
const RevenueEngine = () => {
  return <section id="solutions" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
      backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
      backgroundSize: '32px 32px'
    }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-xs sm:text-sm font-mono text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">The Infrastructure</h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground px-2">
            Architecture, not <span className="italic text-primary">automations.</span>
          </p>
        </div>

        {/* THE SCHEMATIC CANVAS */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* LAYER A: ACQUISITION (Inputs) */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 flex flex-col justify-center">
            <div className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2 pl-2">Acquisition Layer</div>
            {[{
            label: 'Inbound Calls',
            icon: Mic
          }, {
            label: 'Web Forms',
            icon: Share2
          }, {
            label: 'SMS / DMs',
            icon: MessageSquare
          }].map((item, i) => <div key={i} className="p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-xl flex items-center gap-3 sm:gap-4 group hover:border-primary/50 hover:shadow-[0_0_20px_hsl(217_100%_55%/0.3)] hover:scale-105 transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-primary">
                  <item.icon size={14} className="sm:w-4 sm:h-4" />
                </div>
                <span className="text-sm font-medium text-secondary-foreground">{item.label}</span>
              </div>)}
          </div>

          {/* THE CONNECTOR (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="h-px w-full bg-gradient-to-r from-primary/50 to-primary relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
          </div>

          {/* Mobile Flow Indicator */}
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
          </div>

          {/* LAYER B & D: ORCHESTRATION & CONTROL (The Core) */}
          <div className="lg:col-span-4">
            <div className="relative p-1 rounded-xl sm:rounded-2xl bg-gradient-to-b from-foreground/10 to-transparent">
              <div className="bg-background rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] mb-4 sm:mb-6">
                    <Settings2 size={28} className="text-primary-foreground animate-spin-slow sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 italic text-foreground">Madeea.ai Control</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-mono mb-4 sm:mb-6 uppercase tracking-tight">System Management Interface</p>
                  
                  <div className="w-full space-y-2 text-left">
                    <div className="p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-border flex justify-between items-center">
                      <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground">Logic Engine</span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-primary">n8n.active</span>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-border flex justify-between items-center">
                      <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground">CRM Sync</span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-primary">GHL.sync</span>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-border flex justify-between items-center">
                      <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground">Memory Layer</span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-accent">Supabase.RAG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THE CONNECTOR (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="h-px w-full bg-gradient-to-r from-primary to-accent/50 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
          </div>

          {/* Mobile Flow Indicator */}
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="w-px h-8 bg-gradient-to-b from-primary to-accent/50 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
          </div>

          {/* LAYER C: CONVERSATION (Outputs) */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 flex flex-col justify-center">
            <div className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2 pl-2 lg:text-right lg:pr-2 lg:pl-0">Conversation Layer</div>
            {[{
            label: 'Retell AI Voice',
            icon: Mic
          }, {
            label: 'Qualifying Text',
            icon: MessageSquare
          }, {
            label: 'Auto-Booking',
            icon: Zap
          }].map((item, i) => <div key={i} className="p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-xl flex items-center lg:justify-end gap-3 sm:gap-4 group hover:border-primary/50 hover:shadow-[0_0_20px_hsl(217_100%_55%/0.3)] hover:scale-105 transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-primary lg:order-2">
                  <item.icon size={14} className="sm:w-4 sm:h-4" />
                </div>
                <span className="text-sm font-medium text-secondary-foreground">{item.label}</span>
              </div>)}
          </div>

        </div>

        {/* Infrastructure Bottom Label */}
        <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-card border border-border">
            <Shield size={14} className="text-primary sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground text-center">Fully Managed Infrastructure Layer • Proprietary 1Prompt Tech</span>
          </div>
        </div>
      </div>
    </section>;
};
export default RevenueEngine;