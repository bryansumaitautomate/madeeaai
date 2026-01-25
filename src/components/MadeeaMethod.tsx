import { Search, Zap, Rocket, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import ControlRoomButton from './ControlRoomButton';

const steps = [
  {
    id: "01",
    title: "The AI Audit",
    label: "Phase: Diagnosis",
    desc: "We scan 12 revenue touchpoints to identify exactly where your leads are dropping off and where manual work is killing your margin.",
    cta: "Start Audit Now",
    icon: Search,
    variant: "purple",
    features: ["Leak Detection", "ROI Projection", "Systems Blueprint"]
  },
  {
    id: "02",
    title: "The Quick Win",
    label: "Phase: Triage",
    desc: "Before the full build, we deploy one high-impact automation (like Missed Call Text-Back) to generate immediate ROI within 48 hours.",
    cta: "See Examples",
    icon: Zap,
    variant: "blue",
    features: ["Inbound Activation", "Instant Lead Response", "48hr Deployment"]
  },
  {
    id: "03",
    title: "Full Infrastructure",
    label: "Phase: Scaling",
    desc: "The complete installation of the Madeea Revenue Engine: AI Voice agents, RAG Knowledge Base, and 1Prompt Control Panel.",
    cta: "View Architecture",
    icon: Rocket,
    variant: "gradient",
    features: ["Autonomous Voice/Text", "GHL/n8n/Supabase Stack", "Fully Managed Service"]
  }
];

const MadeeaMethod = () => {
  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      {/* Background connecting line (Desktop only) */}
      <div className="hidden lg:block absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">The Madeea Method</h2>
          <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground max-w-2xl">
            A structured path to <br />
            <span className="italic font-medium text-muted-foreground">autonomous revenue.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const isGradient = step.variant === "gradient";
            const isPurple = step.variant === "purple";
            
            return (
              <div key={i} className="flex flex-col">
                {/* Step Number & Header */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-mono font-bold text-foreground/10 leading-none">{step.id}</span>
                  <div className={`h-px flex-grow bg-gradient-to-r ${isGradient ? 'from-foreground/20 to-transparent' : 'from-foreground/20 to-foreground/5'}`} />
                </div>

                {/* Step Card */}
                <div className={`flex-grow p-8 rounded-3xl border transition-all duration-500 hover:translate-y-[-8px] ${
                  isGradient 
                    ? 'bg-gradient-to-br from-primary to-accent border-transparent' 
                    : 'bg-card border-border'
                } ${isPurple ? 'hover:border-accent/40' : 'hover:border-primary/40'}`}>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isGradient ? 'bg-foreground/20' : 'bg-foreground/5'}`}>
                      <step.icon size={24} className={
                        isGradient ? 'text-foreground' : isPurple ? 'text-accent' : 'text-primary'
                      } />
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${isGradient ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 text-foreground">{step.title}</h3>
                  <p className={`text-sm leading-relaxed mb-8 font-light ${isGradient ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                    {step.desc}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {step.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle2 size={14} className={isGradient ? 'text-foreground' : 'text-primary'} />
                        <span className={`text-xs ${isGradient ? 'text-foreground/90' : 'text-secondary-foreground'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
                    isGradient 
                      ? 'bg-foreground text-background hover:bg-foreground/90' 
                      : 'bg-foreground/5 border border-border text-foreground hover:bg-primary hover:border-primary'
                  }`}>
                    {step.cta}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Bridge CTA */}
        <div className="mt-20 p-12 rounded-[2rem] bg-gradient-to-b from-card to-transparent border border-border">
          <div className="flex flex-col items-center gap-6 w-full my-8">
            <h4 className="text-2xl font-light text-foreground text-center">Ready to see where your systems are failing?</h4>
            {/* Button wrapper - centered, tactile console feel */}
            <div className="flex justify-center items-center w-full">
              <ControlRoomButton
                label="Book Your Audit Now"
                icon={ArrowRight}
              />
            </div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">Available for limited monthly cohorts</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadeeaMethod;
