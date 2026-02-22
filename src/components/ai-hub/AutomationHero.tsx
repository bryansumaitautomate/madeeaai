import { Search } from "lucide-react";

interface AutomationHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const AutomationHero = ({ searchQuery, onSearchChange }: AutomationHeroProps) => {
  return (
    <section className="ai-hub-hero-gradient py-24 px-4 relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* 4-column vertical grid lines - matching homepage */}
      <div className="absolute inset-0 hidden sm:flex pointer-events-none">
        <div className="flex-1 border-r border-white/5" />
        <div className="flex-1 border-r border-white/5" />
        <div className="flex-1 border-r border-white/5" />
        <div className="flex-1" />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Glass pill badge */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="ai-hub-glass-pill flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="uppercase tracking-widest text-xs font-mono">AI Automation Partner</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight font-serif" style={{ animationDelay: "0.1s" }}>
          Automation Library
          <span className="block text-primary ai-hub-glow-text font-serif italic">AI-Powered Workflows</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Discover powerful automations for every department. Find the perfect workflow to save time and boost productivity.
        </p>

        <div className="relative max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="ai-hub-search-input pl-14"
          />
        </div>

        <p className="text-muted-foreground text-sm mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <span className="text-foreground/60">Browse by department</span> to find automations tailored to your team's needs
        </p>
      </div>
    </section>
  );
};

export default AutomationHero;
