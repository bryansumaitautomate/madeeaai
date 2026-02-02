import { ClipboardCheck, Phone, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import ControlRoomButton from './ControlRoomButton';

const steps = [
  {
    id: "01",
    title: "Free AI Audit",
    icon: ClipboardCheck,
    text: "Map inefficiency across all departments. We identify where time and money are leaking."
  },
  {
    id: "02",
    title: "Discovery Call",
    icon: Phone,
    text: "Review results and identify the highest priority problem to solve first."
  },
  {
    id: "03",
    title: "First Automation Build",
    icon: Zap,
    text: "Deploy a custom solution for immediate impact. See results within weeks."
  },
  {
    id: "04",
    title: "Expand & Scale",
    icon: TrendingUp,
    text: "Move toward full AI Infrastructure once value is proven. Grow with confidence."
  }
];

const Process = () => {
  return (
    <section id="process" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full grid grid-cols-2 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r border-white/5 last:border-r-0 hidden sm:block" />
          ))}
          {[...Array(2)].map((_, i) => (
            <div key={`mobile-${i}`} className="border-r border-white/5 last:border-r-0 sm:hidden" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="text-[10px] sm:text-xs font-mono text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
            The Diagnostic Path
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-foreground">
            Four Steps. <span className="italic text-muted-foreground">Proven Results.</span>
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="group relative lg:border-r border-white/5 lg:last:border-r-0 p-6 sm:p-8 transition-all duration-500 border-b sm:border-b-0 border-white/5 last:border-b-0"
            >
              {/* Signal Beam - appears on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Pulsing dot on active hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping" />
                </div>
              </div>


              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center mb-6 sm:mb-8 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(26,107,255,0.15)] transition-all duration-500">
                <step.icon 
                  size={20} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-300 sm:w-6 sm:h-6" 
                />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {step.text}
              </p>

              {/* Bottom connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px">
                  <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-primary/50 to-transparent transition-all duration-700" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center gap-4 sm:gap-6 w-full my-8 sm:my-12">
          <p className="text-xs sm:text-sm text-muted-foreground font-mono uppercase tracking-widest text-center">
            Start with a free audit
          </p>
          {/* Button wrapper - centered, tactile console feel */}
          <div className="flex justify-center items-center w-full px-4 sm:px-0">
            <ControlRoomButton
              label="Get Your Free AI Audit"
              icon={ArrowRight}
              href="https://madeeaioaudit.lovable.app"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
