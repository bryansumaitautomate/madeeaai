import { PhoneMissed, Clock, Ghost, Database, Moon, AlertTriangle } from 'lucide-react';

const problems = [
  {
    title: "Missed Calls",
    desc: "60% of callers won't leave a message. They just call your competitor.",
    icon: PhoneMissed,
    size: "md:col-span-2",
    metric: "60% Leakage"
  },
  {
    title: "Slow Follow-up",
    desc: "Lead conversion drops 8x after the first 5 minutes of silence.",
    icon: Clock,
    size: "md:col-span-1",
    metric: "8x Drop"
  },
  {
    title: "The Ghosting Gap",
    desc: "Leads go cold when follow-ups aren't persistent or multi-channel.",
    icon: Ghost,
    size: "md:col-span-1",
    metric: "45% Lost"
  },
  {
    title: "Dormant Databases",
    desc: "Thousands in potential revenue sitting in old CSVs and CRM folders.",
    icon: Database,
    size: "md:col-span-2",
    metric: "$$$ Frozen"
  },
  {
    title: "The 5PM Shutdown",
    desc: "Your best leads often browse at night. If you're asleep, you're invisible.",
    icon: Moon,
    size: "md:col-span-3",
    metric: "24/7 Blindspot"
  }
];

const RealityCheck = () => {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-mono text-destructive uppercase tracking-[0.2em]">Reality Check</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            Growth stalls because leads are <br />
            <span className="text-muted-foreground italic font-medium">mishandled, not missing.</span>
          </h2>
          <p className="max-w-xl text-muted-foreground font-light leading-relaxed">
            Most businesses lose revenue every day from problems that feel small but compound quietly. 
            We identify the leaks before we build the infrastructure.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((prob, i) => (
            <div 
              key={i} 
              className={`group relative overflow-hidden bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-all duration-500 ${prob.size}`}
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                    <prob.icon size={24} />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary/70 transition-colors uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-full">
                    {prob.metric}
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="text-xl font-medium mb-3 group-hover:translate-x-1 transition-transform duration-300">{prob.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light italic">
                    {prob.desc}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute bottom-[-10px] right-[-10px] opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
                <AlertTriangle size={80} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bridge */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm font-mono mb-8 uppercase tracking-widest">Identify your specific leaks today</p>
          <button className="px-8 py-4 bg-foreground/5 border border-border rounded-full text-sm font-medium hover:bg-foreground/10 hover:border-primary/50 transition-all">
            See the Diagnostic Process
          </button>
        </div>
      </div>
    </section>
  );
};

export default RealityCheck;
