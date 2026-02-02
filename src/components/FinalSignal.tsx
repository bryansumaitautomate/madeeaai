import { ArrowRight, Send } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ControlRoomButton from './ControlRoomButton';
import madeeaLogo from '@/assets/madeea-logo-new.png';
const FinalSignal = () => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, {
    once: true,
    margin: "-100px"
  });
  const textLines = [{
    content: <>
          <span className="text-primary font-mono mr-2">&gt;</span>
          If your leads are not handled perfectly...
        </>,
    className: "text-base sm:text-lg md:text-xl text-muted-foreground font-light"
  }, {
    content: <>
          ...then the <span className="italic text-primary">system</span> is the problem.
        </>,
    className: "text-xl sm:text-2xl md:text-4xl font-serif text-foreground"
  }, {
    content: <>
          And systems can be <span className="italic">fixed.</span>
        </>,
    className: "text-2xl sm:text-3xl md:text-5xl font-serif font-medium text-foreground"
  }];
  return <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      {/* Massive Blue Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-primary/20 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/30 rounded-full blur-[60px] sm:blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full grid grid-cols-2 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => <div key={i} className="border-r border-white/5 last:border-r-0 hidden sm:block" />)}
          {[...Array(2)].map((_, i) => <div key={`mobile-${i}`} className="border-r border-white/5 last:border-r-0 sm:hidden" />)}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Text Sequence with staggered animation */}
        <div ref={textRef} className="space-y-4 sm:space-y-6 mb-10 sm:mb-12 md:mb-16">
          {textLines.map((line, index) => <motion.p key={index} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 30
        }} transition={{
          duration: 0.8,
          delay: index * 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }} className={line.className}>
              {line.content}
            </motion.p>)}
        </div>

        {/* Final CTA */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={isInView ? {
        opacity: 1,
        scale: 1
      } : {
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.6,
        delay: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }} className="flex flex-col items-center gap-4 sm:gap-6 w-full my-8 sm:my-10">
          {/* Button wrapper - centered, tactile console feel */}
          <div className="flex justify-center items-center w-full px-4 sm:px-0">
            <ControlRoomButton label="Claim your Free Audit" icon={ArrowRight} href="https://madeeaioaudit.lovable.app" />
          </div>
          
          <p className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">
            Free audit • No commitment • Results in 48hrs
          </p>
        </motion.div>
      </div>
    </section>;
};
const Footer = () => {
  const productLinks = [{
    label: "Features",
    href: "#"
  }, {
    label: "How it works",
    href: "#"
  }, {
    label: "Pricing",
    href: "#"
  }];
  const companyLinks = [{
    label: "About",
    href: "#"
  }, {
    label: "Blog",
    href: "#"
  }, {
    label: "Careers",
    href: "#"
  }];
  const legalLinks = [{
    label: "Privacy",
    href: "#"
  }, {
    label: "Terms",
    href: "#"
  }, {
    label: "Contact",
    href: "#"
  }];
  return <footer className="px-4 sm:px-6 pb-6 sm:pb-8 relative">
      {/* Main footer card */}
      <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden relative ring-1 ring-white/10 bg-card/60 backdrop-blur">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
        
        <div className="relative px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 lg:gap-8">
          {/* Left side - Logo, description, email subscription */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-md">
            {/* Logo */}
            <img src={madeeaLogo} alt="Madeea" className="h-12 sm:h-14 md:h-16 w-auto self-start" />
            
            {/* Description */}
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Transform your sales into a productivity powerhouse with AI-powered lead management that saves you hours every week.
            </p>
            
            <div className="flex gap-2 items-center">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/5 ring-1 ring-white/10 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <ControlRoomButton label="Subscribe" className="text-xs sm:text-sm" />
            </div>
            
            {/* Disclaimer */}
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Monthly updates. No spam.
            </p>
          </div>

          {/* Right side - Link columns */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-20">
            {/* Product */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-foreground font-medium text-xs sm:text-sm">Product</h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {productLinks.map(link => <a key={link.label} href={link.href} className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors">
                    {link.label}
                  </a>)}
              </nav>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-foreground font-medium text-xs sm:text-sm">Company</h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {companyLinks.map(link => <a key={link.label} href={link.href} className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors">
                    {link.label}
                  </a>)}
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-foreground font-medium text-xs sm:text-sm">Legal</h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {legalLinks.map(link => <a key={link.label} href={link.href} className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors">
                    {link.label}
                  </a>)}
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            © 2026 Madeea.ai All rights reserved.
          </p>

        </div>
        </div>
      </div>
    </footer>;
};
const FinalSignalSection = () => {
  return <>
      <FinalSignal />
      <Footer />
    </>;
};
export default FinalSignalSection;