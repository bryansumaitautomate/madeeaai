import MadeeaCTA from './MadeeaCTA';
import { AnimatedCounter } from './AnimatedCounter';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';

interface AuditHeroProps {
  onStartAudit: () => void;
}

export const AuditHero = ({ onStartAudit }: AuditHeroProps) => {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-sans flex items-center">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
      }} />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column */}
        <div className="text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight mb-4 sm:mb-6 leading-[1.05] text-foreground opacity-0 animate-hero-fade-up">
            Stop Guessing. <br />
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(to bottom, #3B82F6, #60A5FA)'
            }}>Start Automating Smarter.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg max-w-lg mb-6 sm:mb-8 leading-relaxed font-sans font-light text-muted-foreground opacity-0 animate-hero-fade-up audit-animation-delay-200">
            Most executives lose 30% of their productivity to Ghost Tasks: manual workflows 
            and admin chaos that kill your impact. Get a surgical breakdown of your operations 
            and a roadmap to reclaim your time.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10 opacity-0 animate-hero-fade-up audit-animation-delay-500">
            <MadeeaCTA label="Run Free Efficiency Audit" onClick={onStartAudit} />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground opacity-0 animate-hero-fade-up audit-animation-delay-700">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" strokeWidth={2} />
              <span className="font-mono uppercase tracking-wider">Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" strokeWidth={2} />
              <span className="font-mono uppercase tracking-wider">Data-Driven</span>
            </div>
          </div>
        </div>

        {/* Right Column - Glass Card */}
        <div className="hidden lg:block relative group">
          <div className="absolute -inset-8 bg-primary/10 blur-[80px] rounded-full audit-animate-glow-pulse group-hover:bg-primary/20 transition-all duration-500" />
          
          <div className="relative opacity-0 audit-animate-hero-spring audit-animation-delay-300 hover:scale-[1.02] transition-transform duration-300">
            <div className="rounded-2xl p-6 backdrop-blur-md border border-primary/10 audit-animate-float-subtle bg-card/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-mono">AI Analysis</p>
                  <h3 className="text-lg font-serif font-normal tracking-tight text-foreground">Recoverable Capacity</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-primary/15 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" strokeWidth={2} />
                  <span>87%</span>
                </div>
              </div>

              <div className="h-36 mb-6 relative rounded-lg overflow-hidden bg-white/[0.02]">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="auditHeroChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
                  <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
                  <path className="audit-animate-chart-fill" d="M0,100 Q30,95 60,85 T120,70 T180,50 T240,35 T300,15 L300,120 L0,120 Z" fill="url(#auditHeroChartGradient)" />
                  <path className="audit-animate-chart-draw" d="M0,100 Q30,95 60,85 T120,70 T180,50 T240,35 T300,15" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400" />
                  <circle className="audit-animate-dot-appear" cx="300" cy="15" r="6" fill="#3B82F6" opacity="0" />
                  <circle className="audit-animate-dot-glow" cx="300" cy="15" r="10" fill="#3B82F6" fillOpacity="0" />
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl opacity-0 audit-animate-slide-in-right audit-animation-delay-1200 hover:bg-white/[0.05] transition-colors duration-200 bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-muted-foreground text-sm font-mono uppercase tracking-wider">Cost Reduction</span>
                  </div>
                  <span className="text-foreground font-bold text-lg">
                    <AnimatedCounter end={70} delay={1200} suffix="%" />
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3.5 rounded-xl opacity-0 audit-animate-slide-in-right audit-animation-delay-1400 hover:bg-white/[0.05] transition-colors duration-200 bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground text-sm font-mono uppercase tracking-wider">Hours Saved</span>
                  </div>
                  <span className="text-foreground font-bold text-lg">
                    <AnimatedCounter end={1240} delay={1400} suffix="/yr" />
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3.5 rounded-xl opacity-0 audit-animate-slide-in-right audit-animation-delay-1600 hover:bg-white/[0.05] transition-colors duration-200 bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <span className="text-muted-foreground text-sm font-mono uppercase tracking-wider">ROI</span>
                  </div>
                  <span className="text-foreground font-bold text-lg">
                    <AnimatedCounter end={12.4} delay={1600} suffix="x" decimals={1} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
