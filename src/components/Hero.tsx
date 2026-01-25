import { ArrowRight, Terminal } from 'lucide-react';
import AuraBackground from './AuraBackground';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Unicorn Studio Animated Aura Background */}
      <AuraBackground />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-background rounded-sm transform rotate-45" />
          </div>
          <span className="text-xl font-semibold tracking-tighter text-foreground">
            MADEEA<span className="text-primary">.IO</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground font-mono uppercase tracking-widest">
          <a href="#infrastructure" className="hover:text-foreground transition-colors">Infrastructure</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#audit" className="text-primary hover:brightness-125 transition-all">Free Audit</a>
        </div>

        <button className="px-5 py-2 rounded-full bg-card border border-border text-xs font-mono text-secondary-foreground hover:bg-muted transition-all">
          CLIENT LOGIN
        </button>
      </nav>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 max-w-5xl mx-auto">
        {/* Engineering Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-border mb-8">
          <Terminal size={14} className="text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Systems Intelligence v2.0
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 text-gradient">
          Your sales system is <br />
          <span className="font-semibold italic text-foreground underline decoration-primary/40">
            already leaking money.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-12">
          Madeea.io designs and installs custom AI sales infrastructure that answers leads 
          instantly and books appointments—quietly fixing the gaps in your revenue operations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="group relative flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:scale-[1.02] aura-glow aura-glow-hover">
            Begin System Audit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium">
            Watch the Engine Room
            <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-current border-b-[4px] border-b-transparent ml-0.5" />
            </div>
          </button>
        </div>

        {/* Trust Signals */}
        <div className="mt-24 pt-12 border-t border-border w-full">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8">
            Integrated with Industry Standards
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-60 transition-all">
            <span className="font-bold text-lg">GHL</span>
            <span className="font-mono font-bold text-lg text-primary">n8n</span>
            <span className="font-semibold text-lg">Twilio</span>
            <span className="font-bold text-lg italic text-accent">Supabase</span>
            <span className="font-bold text-lg">Retell AI</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
