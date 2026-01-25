import { Zap, Mic, MessageSquare, Share2, Settings2, Shield } from 'lucide-react';

const RevenueEngine = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">The Infrastructure</h2>
          <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground">
            Architecture, not <span className="italic text-muted-foreground">automations.</span>
          </p>
        </div>

        {/* THE SCHEMATIC CANVAS */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LAYER A: ACQUISITION (Inputs) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2 pl-2">Acquisition Layer</div>
            {[
              { label: 'Inbound Calls', icon: Mic },
              { label: 'Web Forms', icon: Share2 },
              { label: 'SMS / DMs', icon: MessageSquare }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-center gap-4 group hover:border-primary/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:text-primary transition-colors">
                  <item.icon size={16} />
                </div>
                <span className="text-sm font-medium text-secondary-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* THE CONNECTOR (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="h-px w-full bg-gradient-to-r from-primary/50 to-primary relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
          </div>

          {/* LAYER B & D: ORCHESTRATION & CONTROL (The Core) */}
          <div className="lg:col-span-4">
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-foreground/10 to-transparent">
              <div className="bg-background rounded-2xl p-8 border border-border relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] mb-6">
                    <Settings2 size={32} className="text-primary-foreground animate-spin-slow" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 italic text-foreground">1Prompt Control</h3>
                  <p className="text-xs text-muted-foreground font-mono mb-6 uppercase tracking-tight">System Management Interface</p>
                  
                  <div className="w-full space-y-2 text-left">
                    <div className="p-3 bg-foreground/5 rounded-lg border border-border flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground">Logic Engine</span>
                      <span className="text-[10px] font-mono text-primary">n8n.active</span>
                    </div>
                    <div className="p-3 bg-foreground/5 rounded-lg border border-border flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground">CRM Sync</span>
                      <span className="text-[10px] font-mono text-primary">GHL.sync</span>
                    </div>
                    <div className="p-3 bg-foreground/5 rounded-lg border border-border flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground">Memory Layer</span>
                      <span className="text-[10px] font-mono text-accent">Supabase.RAG</span>
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

          {/* LAYER C: CONVERSATION (Outputs) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2 pl-2 text-right">Conversation Layer</div>
            {[
              { label: 'Retell AI Voice', icon: Mic },
              { label: 'Qualifying Text', icon: MessageSquare },
              { label: 'Auto-Booking', icon: Zap }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-center justify-end gap-4 group hover:border-accent/30 transition-all">
                <span className="text-sm font-medium text-secondary-foreground">{item.label}</span>
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:text-accent transition-colors">
                  <item.icon size={16} />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Infrastructure Bottom Label */}
        <div className="mt-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border">
            <Shield size={16} className="text-primary" />
            <span className="text-xs font-mono text-muted-foreground">Fully Managed Infrastructure Layer • Proprietary 1Prompt Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueEngine;
