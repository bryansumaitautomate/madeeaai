import { motion } from 'framer-motion';
import { Layers, Radio, MessageCircle, Brain, Gauge, ArrowRight } from 'lucide-react';
import ControlRoomButton from './ControlRoomButton';
const infrastructureLayers = [{
  id: 'acquisition',
  title: 'Acquisition',
  icon: Radio,
  description: 'Capture every lead from every channel calls, forms, DMs, ads into one unified intake.',
  status: 'ACTIVE'
}, {
  id: 'orchestration',
  title: 'Orchestration',
  icon: Layers,
  description: 'Route, qualify, and prioritize leads automatically based on custom business logic.',
  status: 'ROUTING'
}, {
  id: 'conversation',
  title: 'Conversation',
  icon: MessageCircle,
  description: 'AI-powered voice and text agents that respond instantly, 24/7, in your brand voice.',
  status: 'ENGAGING'
}, {
  id: 'memory',
  title: 'Memory',
  icon: Brain,
  description: 'Persistent context that remembers every interaction, preference, and conversation.',
  status: 'SYNCED'
}, {
  id: 'control',
  title: 'Control Panel',
  icon: Gauge,
  description: 'Real-time visibility into every metric, with levers to optimize performance.',
  status: 'ONLINE'
}];

// Animated schematic visualization
const SchematicAnimation = () => {
  return <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
      {/* Outer ring */}
      <motion.div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border border-primary/20" animate={{
      rotate: 360
    }} transition={{
      duration: 60,
      repeat: Infinity,
      ease: 'linear'
    }} />
      
      {/* Middle ring with nodes */}
      <motion.div className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full border border-primary/30" animate={{
      rotate: -360
    }} transition={{
      duration: 40,
      repeat: Infinity,
      ease: 'linear'
    }}>
        {[0, 72, 144, 216, 288].map((angle, i) => <motion.div key={i} className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" style={{
        top: '50%',
        left: '50%',
        transform: `rotate(${angle}deg) translateX(72px) translateY(-50%)`,
        boxShadow: '0 0 15px hsl(var(--primary))'
      }} animate={{
        opacity: [0.4, 1, 0.4]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.4
      }} />)}
      </motion.div>

      {/* Inner ring */}
      <motion.div className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-primary/40" animate={{
      rotate: 360
    }} transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }} />

      {/* Data flow lines - hidden on mobile */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => <motion.div key={`line-${i}`} className="absolute h-px bg-gradient-to-r from-primary/50 to-transparent hidden sm:block" style={{
      width: '120px',
      top: '50%',
      left: '50%',
      transformOrigin: 'left center',
      transform: `rotate(${angle}deg)`
    }} animate={{
      opacity: [0.2, 0.6, 0.2]
    }} transition={{
      duration: 3,
      repeat: Infinity,
      delay: i * 0.3
    }} />)}

      {/* Central core */}
      <motion.div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 flex items-center justify-center backdrop-blur-sm" animate={{
      scale: [1, 1.05, 1]
    }} transition={{
      duration: 4,
      repeat: Infinity
    }} style={{
      boxShadow: '0 0 60px hsl(var(--primary) / 0.3), inset 0 0 30px hsl(var(--primary) / 0.1)'
    }}>
        <Layers size={24} className="text-primary sm:w-8 sm:h-8 md:w-9 md:h-9" />
        
        {/* Pulse rings */}
        <motion.div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-primary/30" animate={{
        scale: [1, 1.5],
        opacity: [0.5, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} />
        <motion.div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-primary/30" animate={{
        scale: [1, 1.5],
        opacity: [0.5, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        delay: 0.5
      }} />
      </motion.div>

      {/* Floating labels - hidden on small mobile, shown on sm+ */}
      <div className="hidden sm:block">
        {infrastructureLayers.map((layer, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const radius = 140;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return <motion.div key={layer.id} className="absolute flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card/80 border border-border backdrop-blur-sm" style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)'
          }} initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: i * 0.15
          }}>
              <layer.icon size={10} className="text-primary sm:w-3 sm:h-3" />
              <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-foreground">
                {layer.title}
              </span>
            </motion.div>;
        })}
      </div>
    </div>;
};
const AIInfrastructure = () => {
  return <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden" style={{
    backgroundColor: '#050505'
  }}>
      {/* Deep background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[800px] h-[300px] sm:h-[600px] md:h-[800px] rounded-full opacity-30" style={{
        background: 'radial-gradient(circle, hsl(217 100% 55% / 0.15) 0%, transparent 70%)'
      }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
      backgroundImage: 'linear-gradient(hsl(217 100% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 100% 55%) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-mono text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
            The Complete System
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne tracking-tight text-foreground mb-4 sm:mb-6 px-2">
            AI Sales <span className="italic text-primary">Infrastructure</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Not a tool. Not a hack. A complete revenue operations layer that runs invisibly.
          </p>
        </div>

        {/* Schematic Animation */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <SchematicAnimation />
        </div>

        {/* Infrastructure Layers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
          {infrastructureLayers.map((layer, index) => <motion.div key={layer.id} className="group p-4 sm:p-5 rounded-lg sm:rounded-xl bg-card/30 border border-border" initial={{
          opacity: 0,
          y: 20,
          scale: 1,
          borderColor: 'hsl(217 100% 55% / 0)',
          boxShadow: '0 0 0px hsl(217 100% 55% / 0)'
        }} whileInView={{
          opacity: 1,
          y: 0
        }} whileHover={{
          scale: 1.05,
          borderColor: 'hsl(217 100% 55% / 0.5)',
          boxShadow: '0 0 20px hsl(217 100% 55% / 0.3)'
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.3,
          scale: {
            duration: 0.3,
            ease: 'easeOut'
          },
          borderColor: {
            duration: 0.3,
            ease: 'easeOut'
          },
          boxShadow: {
            duration: 0.3,
            ease: 'easeOut'
          }
        }}>
              {/* Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <layer.icon size={16} className="text-primary sm:w-5 sm:h-5" />
              </div>

              {/* Title & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">{layer.title}</h3>
                <span className="font-mono text-[8px] sm:text-[9px] text-primary uppercase tracking-wider">
                  {layer.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed hidden sm:block">
                {layer.description}
              </p>
            </motion.div>)}
        </div>

        {/* Why This Matters */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
              Why This Matters
            </span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-syne text-foreground max-w-3xl mx-auto px-2">
            Custom automation solves problems. <br className="hidden sm:block" />
            <span className="italic text-primary font-syne">Infrastructure transforms revenue operations.</span>
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center px-4 sm:px-0">
          <ControlRoomButton label="See Your Infrastructure Blueprint" icon={ArrowRight} href="https://madeea.ai/audit" />
        </div>
      </div>
    </section>;
};
export default AIInfrastructure;