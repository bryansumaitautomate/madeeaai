import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ControlRoomButton from './ControlRoomButton';
import { cn } from '@/lib/utils';
import madeeaLogo from '@/assets/madeea-logo-new.png';
const navLinks = [{
  label: 'Problem',
  href: '#problems'
}, {
  label: 'Solutions',
  href: '#solutions'
}, {
  label: 'How It Works',
  href: '#process'
}, {
  label: 'Results',
  href: '#results'
}, {
  label: 'AI Hub',
  href: '/ai-hub'
}, {
  label: 'Free Audit',
  href: '/audit'
}];
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/')) {
      // Let the browser handle internal routes naturally
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };
  return <>
      {/* Main Navigation */}
      <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500', isScrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' : 'bg-[#0a0a0f]/60 backdrop-blur-md border-b border-white/5')}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={e => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }} className="flex items-center group">
            <img alt="Madeea" className="h-14 w-auto" src={madeeaLogo} />
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={e => handleNavClick(e, link.href)} className="nav-link relative text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 py-2">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <ControlRoomButton label="Get Your Free AI Audit" className="px-5 py-2.5 text-xs" href="https://madeea.ai/audit" />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300" aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? <motion.div key="close" initial={{
              rotate: -90,
              opacity: 0
            }} animate={{
              rotate: 0,
              opacity: 1
            }} exit={{
              rotate: 90,
              opacity: 0
            }} transition={{
              duration: 0.2
            }}>
                  <X className="w-5 h-5 text-primary" />
                </motion.div> : <motion.div key="menu" initial={{
              rotate: 90,
              opacity: 0
            }} animate={{
              rotate: 0,
              opacity: 1
            }} exit={{
              rotate: -90,
              opacity: 0
            }} transition={{
              duration: 0.2
            }}>
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Menu Panel */}
            <motion.div initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0a0a0f]/98 backdrop-blur-xl border-l border-white/10">
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
              </div>

              {/* Menu Content */}
              <div className="relative flex flex-col h-full pt-24 px-8 pb-8">
                {/* Nav Links */}
                <nav className="flex-1 flex flex-col gap-2">
                  {navLinks.map((link, index) => <motion.a key={link.label} href={link.href} onClick={e => handleNavClick(e, link.href)} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="group flex items-center gap-4 py-4 border-b border-white/5 hover:border-primary/20 transition-all duration-300">
                      <span className="text-xs font-mono text-primary/50">
                        0{index + 1}
                      </span>
                      <span className="text-lg font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_12px_hsl(217_100%_55%/0.5)] transition-all duration-300" />
                    </motion.a>)}
                </nav>

                {/* Mobile CTA */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="pt-8">
                  <ControlRoomButton label="Get Your Free AI Audit" className="w-full justify-center" href="https://madeea.ai/audit" />
                </motion.div>

                {/* Footer Info */}
                <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.6
            }} className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    AI Sales Infrastructure
                  </p>
                  <p className="text-sm text-foreground/60 mt-2">
                    Transform your revenue operations with intelligent automation.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default Navigation;