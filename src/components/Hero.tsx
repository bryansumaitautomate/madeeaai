import { ArrowRight, Play } from 'lucide-react';
import AuraBackground from './AuraBackground';
import SalesControlRoom from './SalesControlRoom';
import ControlRoomButton from './ControlRoomButton';

// Import partner logos
import ghlLogo from '@/assets/logos/ghl.png';
import n8nLogo from '@/assets/logos/n8n.png';
import twilioLogo from '@/assets/logos/twilio.png';
import supabaseLogo from '@/assets/logos/supabase.png';
import retellLogo from '@/assets/logos/retell.png';
const Hero = () => {
  return <div className="relative min-h-screen overflow-hidden bg-transparent pt-20">

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 max-w-5xl mx-auto">
        {/* AI Partner Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            AI Automation Partner
          </span>
        </div>

        {/* Main Headline - Instrument Serif */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-[1.1] mb-8 text-foreground">
          Your business is losing money in <br className="hidden md:block" />
          places you cannot see. <span className="italic text-primary">AI finds them.</span>
          <br className="hidden md:block" />
          <span className="italic">We fix them.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Madeea.io starts with a free AI audit... stopping the leaks, starting with 
          what matters most to you right now.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6 w-full my-10">
          {/* Buttons row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
            {/* Primary CTA */}
            <ControlRoomButton label="Get Your Free AI Audit" icon={ArrowRight} href="https://madeeaioaudit.lovable.app" />
            
            {/* Secondary Ghost Button */}
            <button className="group flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 bg-transparent hover:border-primary/50 hover:bg-white/5 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play size={14} className="text-foreground ml-0.5" />
              </div>
              <span className="text-sm font-medium text-foreground">See How It Works</span>
            </button>
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
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 opacity-80 hover:opacity-100 transition-all">
            <img src={ghlLogo} alt="GoHighLevel" className="h-10 object-contain scale-[2.2]" />
            <img src={n8nLogo} alt="n8n" className="h-10 object-contain scale-[2.2] ml-6" />
            <img src={twilioLogo} alt="Twilio" className="h-7 object-contain" />
            <img src={supabaseLogo} alt="Supabase" className="h-7 object-contain" />
            <img src={retellLogo} alt="Retell AI" className="h-8 object-contain scale-150" />
          </div>
        </div>
      </section>
    </div>;
};
export default Hero;