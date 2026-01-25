import { ArrowRight } from 'lucide-react';
import AuraBackground from './AuraBackground';
import SalesControlRoom from './SalesControlRoom';
import ControlRoomButton from './ControlRoomButton';
import madeeaLogo from '@/assets/madeea-logo.png';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Animated Aura Background */}
      <AuraBackground />

      {/* Navigation - Sticky with backdrop blur */}
      <nav className="sticky top-0 z-50 flex items-center justify-between max-w-7xl mx-auto px-6 py-4 backdrop-blur-md bg-black/10 rounded-2xl mt-4 mx-4 border border-white/10">
        <div className="flex items-center gap-2 group cursor-pointer">
          <img src={madeeaLogo} alt="Madeea.io" className="w-8 h-8 object-contain" />
          <span className="text-xl font-semibold tracking-tighter text-foreground">
            MADEEA<span className="text-primary">.IO</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground font-mono uppercase tracking-widest">
          <a href="#infrastructure" className="hover:text-foreground transition-colors">Infrastructure</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#audit" className="text-primary hover:brightness-125 transition-all">Free Audit</a>
        </div>

        <ControlRoomButton
          label="CLIENT LOGIN"
          className="px-5 py-2 text-xs"
        />
      </nav>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 max-w-5xl mx-auto">
        {/* AI Partner Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            AI Sales Infrastructure Partner
          </span>
        </div>

        {/* Main Headline - Instrument Serif */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-[1.1] mb-8 text-foreground">
          Your sales system is already <br className="hidden md:block" />
          leaking money. <span className="italic text-primary">Invisible AI systems</span>
          <br className="hidden md:block" />
          <span className="italic">quietly fix it.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Madeea.io designs and installs custom AI sales infrastructure that answers 
          leads instantly and keeps your pipeline moving.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 w-full my-10">
          {/* Button wrapper - centered, tactile console feel */}
          <div className="flex justify-center items-center w-full">
            <ControlRoomButton
              label="Diagnose Your Sales System"
              icon={ArrowRight}
            />
          </div>
          
          {/* Supporting text */}
          <p className="text-sm text-muted-foreground font-mono text-center">
            Not a demo. Not a pitch. <span className="text-foreground">A clear diagnosis.</span>
          </p>
        </div>
      </section>

      {/* 3D Sales Control Room */}
      <section className="relative z-10 px-6 pb-24">
        <SalesControlRoom />
      </section>

      {/* Trust Signals */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-5xl mx-auto pt-12 border-t border-white/10">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 text-center">
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
