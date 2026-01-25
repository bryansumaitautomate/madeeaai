import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ControlRoomButton from './ControlRoomButton';

const FinalSignal = () => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const textLines = [
    {
      content: (
        <>
          <span className="text-primary font-mono mr-2">&gt;</span>
          If your leads are not handled perfectly...
        </>
      ),
      className: "text-lg md:text-xl text-muted-foreground font-light"
    },
    {
      content: (
        <>
          ...then the <span className="italic text-primary">system</span> is the problem.
        </>
      ),
      className: "text-2xl md:text-4xl font-serif text-foreground"
    },
    {
      content: (
        <>
          And systems can be <span className="italic">fixed.</span>
        </>
      ),
      className: "text-3xl md:text-5xl font-serif font-medium text-foreground"
    }
  ];

  return (
    <section className="relative py-40 overflow-hidden">
      {/* Massive Blue Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full grid grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r border-white/5 last:border-r-0" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Text Sequence with staggered animation */}
        <div ref={textRef} className="space-y-6 mb-16">
          {textLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                delay: index * 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={line.className}
            >
              {line.content}
            </motion.p>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.6,
            delay: 1.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <ControlRoomButton
            label="Diagnose Your Sales System"
            icon={ArrowRight}
          />
        </motion.div>

        <p className="mt-6 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Free audit • No commitment • Results in 48hrs
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  const links = [
    { label: "Services", href: "#" },
    { label: "ROI", href: "#" },
    { label: "Results", href: "#" },
  ];

  return (
    <footer className="border-t border-border py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(26,107,255,0.3)]">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Madeea<span className="text-primary">.io</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground font-mono">
            © 2025 Madeea.io — AI Sales Infrastructure
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </footer>
  );
};

const FinalSignalSection = () => {
  return (
    <>
      <FinalSignal />
      <Footer />
    </>
  );
};

export default FinalSignalSection;
