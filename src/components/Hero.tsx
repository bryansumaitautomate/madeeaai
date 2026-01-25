import { ArrowRight, Terminal, Play } from 'lucide-react';
import AuraBackground from './AuraBackground';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Unicorn Studio Animated Aura Background */}
      <AuraBackground />

      {/* Navigation - Sticky with backdrop blur */}
      <nav className="sticky top-0 z-50 flex items-center justify-between max-w-7xl mx-auto px-6 py-4 backdrop-blur-md bg-black/10 rounded-2xl mt-4 mx-4 border border-white/10">
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
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 max-w-5xl mx-auto">
        {/* Systems Intelligence Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10">
          <Terminal size={14} className="text-primary" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Systems Intelligence v2.0
          </span>
        </div>

        {/* Main Headline - Instrument Serif */}
        <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight leading-[1.1] mb-8 text-foreground">
          Your sales system is <br />
          <span className="italic">
            <span className="underline decoration-primary decoration-4 underline-offset-8">already leaking money.</span>
          </span>
        </h1>

        {/* Subheadline - Centered with max-width */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-14">
          Madeea.io designs and installs custom AI sales infrastructure that answers leads 
          instantly and books appointments—quietly fixing the gaps in your revenue operations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Primary CTA - Ion Blue with strong glow */}
          <button 
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white transition-all hover:scale-[1.02]"
            style={{ 
              backgroundColor: '#1A6BFF',
              boxShadow: '0 0 40px rgba(26, 107, 255, 0.5), 0 0 80px rgba(26, 107, 255, 0.3)'
            }}
          >
            Begin System Audit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Secondary Ghost CTA */}
          <button className="flex items-center gap-3 px-6 py-4 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Play size={14} className="ml-0.5" fill="currentColor" />
            </div>
            Watch the Engine Room
          </button>
        </div>

        {/* Trust Signals */}
        <div className="mt-28 pt-12 border-t border-white/10 w-full">
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
