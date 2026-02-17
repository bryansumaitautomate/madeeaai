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
  return <div className="relative min-h-screen overflow-hidden bg-transparent pt-16 md:pt-20">

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-16 max-w-5xl mx-auto">
        {/* AI Partner Label */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            AI Automation Partner
          </span>
        </div>

        {/* Main Headline - Instrument Serif */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8 text-foreground px-2">
          Your business is losing money in <br className="hidden sm:block" />
          places you cannot see. <span className="italic text-primary">AI finds them.</span>
          <br className="hidden sm:block" />
          <span className="italic">We fix them.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10 px-2">Madeea.ai starts with a free AI audit.. stopping the leaks, starting with what matters most to you right now.</p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full my-6 sm:my-10">
          {/* Buttons row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4 sm:px-0">
            {/* Primary CTA */}
            <ControlRoomButton label="Get Your Free AI Audit" icon={ArrowRight} href="https://madeea.ai/audit" />
            
            {/* Secondary Ghost Button */}
            
          </div>
          
          {/* Supporting text */}
          <p className="text-xs sm:text-sm text-muted-foreground font-mono text-center">
            Not a demo. Not a pitch. <span className="text-foreground">A clear diagnosis.</span>
          </p>
        </div>
      </section>

      {/* 3D Sales Control Room */}
      <section className="relative z-10 px-4 sm:px-6 pb-16 sm:pb-24">
        <SalesControlRoom />
      </section>

      {/* Trust Signals */}
      <section className="relative z-10 px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-5xl mx-auto pt-8 sm:pt-12 border-t border-white/10">
          <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6 sm:mb-8 text-center">
            Integrated with Industry Standards
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6 opacity-80 hover:opacity-100 transition-all">
            <img src={ghlLogo} alt="GoHighLevel" className="h-8 sm:h-10 object-contain scale-[1.8] sm:scale-[2.2]" />
            <img src={n8nLogo} alt="n8n" className="h-8 sm:h-10 object-contain scale-[1.8] sm:scale-[2.2] ml-4 sm:ml-6" />
            <img src={twilioLogo} alt="Twilio" className="h-5 sm:h-7 object-contain" />
            <img src={supabaseLogo} alt="Supabase" className="h-5 sm:h-7 object-contain" />
            <img src={retellLogo} alt="Retell AI" className="h-6 sm:h-8 object-contain scale-125 sm:scale-150" />
          </div>
        </div>
      </section>
    </div>;
};
export default Hero;