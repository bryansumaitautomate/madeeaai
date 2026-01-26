import { Cpu, Layers, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';
interface InfrastructureCardProps {
  title: string;
  description: string;
  icon: 'cpu' | 'layers' | 'zap';
  features: string[];
  featured?: boolean;
}
const iconMap = {
  cpu: Cpu,
  layers: Layers,
  zap: Zap
};
const InfrastructureCard = ({
  title,
  description,
  icon,
  features,
  featured = false
}: InfrastructureCardProps) => {
  const IconComponent = iconMap[icon];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5
  }} className="infrastructure-card-wrapper group">
      {/* The rotating border container */}
      <div className="infrastructure-card-border">
        {/* Rotating gradient element */}
        <div className="infrastructure-card-gradient" />
        
        {/* Card content */}
        <div className="infrastructure-card-content">
          {/* Featured badge */}
          {featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <span className="px-4 py-1 text-[10px] font-mono uppercase tracking-widest bg-primary text-primary-foreground rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                Recommended
              </span>
            </div>}

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-shadow duration-500">
            <IconComponent size={28} className="text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-syne font-medium text-foreground mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
            {description}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          {/* Features list */}
          <ul className="space-y-3">
            {features.map((feature, index) => <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-sm text-secondary-foreground">{feature}</span>
              </li>)}
          </ul>
        </div>
      </div>
    </motion.div>;
};

// Showcase component with multiple cards
const InfrastructureCards = () => {
  const cards = [{
    icon: 'zap' as const,
    title: 'Instant Lead Activation',
    description: 'Transform cold leads into qualified appointments within seconds of initial contact.',
    features: ['Sub-60 second speed-to-lead', 'AI voice qualification calls', 'Automatic CRM enrichment', 'Real-time lead scoring']
  }, {
    icon: 'layers' as const,
    title: 'Persistent Follow-Up',
    description: 'Never let a lead go cold with intelligent, context-aware multi-channel sequences.',
    features: ['SMS & email automation', 'Behavior-triggered messaging', 'Smart re-engagement loops', 'Calendar-aware scheduling'],
    featured: true
  }, {
    icon: 'cpu' as const,
    title: 'Revenue Intelligence',
    description: 'Deep analytics and predictive insights to optimize your entire sales pipeline.',
    features: ['Pipeline health monitoring', 'Conversion rate optimization', 'Revenue leak detection', 'Predictive forecasting']
  }];
  return <section className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-matrix opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">
            Core Modules
          </h2>
          <p className="text-3xl md:text-5xl font-serif font-light tracking-tight text-foreground">
            The <span className="italic">infrastructure</span> that powers growth.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => <InfrastructureCard key={index} {...card} />)}
        </div>
      </div>
    </section>;
};
export { InfrastructureCard, InfrastructureCards };
export default InfrastructureCards;