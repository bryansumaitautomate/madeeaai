import { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

// Waveform that flatlines animation
const WaveformVisual = () => {
  const [flatlined, setFlatlined] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlatlined(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 200 40" className="w-full h-full">
        <path
          d={flatlined 
            ? "M0,20 L200,20" 
            : "M0,20 L20,20 L30,5 L40,35 L50,10 L60,30 L70,15 L80,25 L90,20 L100,20 L110,5 L120,35 L130,10 L140,30 L150,15 L160,25 L170,20 L200,20"
          }
          fill="none"
          stroke="hsl(217 100% 55%)"
          strokeWidth="2"
          className="transition-all duration-1000"
          style={{
            filter: 'drop-shadow(0 0 6px hsl(217 100% 55% / 0.6))'
          }}
        />
        {flatlined && (
          <circle cx="180" cy="20" r="4" fill="hsl(0 84% 60%)" className="animate-pulse">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
      {flatlined && (
        <span className="absolute bottom-0 right-0 font-mono text-[10px] text-destructive uppercase tracking-wider">
          Signal Lost
        </span>
      )}
    </div>
  );
};

// Latency counter for slow follow-up
const LatencyCounter = () => {
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const newVal = prev + Math.floor(Math.random() * 200) - 50;
        return Math.max(14, Math.min(newVal, 2400));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getLatencyColor = () => {
    if (latency < 100) return 'text-emerald-400';
    if (latency < 500) return 'text-amber-400';
    return 'text-destructive';
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="font-mono text-4xl font-bold tracking-tight">
        <span className={getLatencyColor()}>{latency}</span>
        <span className="text-muted-foreground text-lg">ms</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${latency > 500 ? 'bg-destructive animate-pulse' : 'bg-emerald-400'}`} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Response Latency
        </span>
      </div>
    </div>
  );
};

// Disappearing dots for ghosting leads
const GhostingDots = () => {
  const [dots, setDots] = useState([
    { id: 1, opacity: 1, x: 20, y: 30 },
    { id: 2, opacity: 1, x: 50, y: 60 },
    { id: 3, opacity: 1, x: 80, y: 25 },
    { id: 4, opacity: 1, x: 35, y: 70 },
    { id: 5, opacity: 1, x: 65, y: 45 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        const newDots = prev.map(dot => ({
          ...dot,
          opacity: Math.random() > 0.3 ? dot.opacity - 0.15 : Math.min(1, dot.opacity + 0.3)
        }));
        return newDots;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-24 w-full">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute w-3 h-3 rounded-full bg-primary transition-all duration-500"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            opacity: Math.max(0.1, dot.opacity),
            transform: `scale(${dot.opacity})`,
            boxShadow: `0 0 ${8 * dot.opacity}px hsl(217 100% 55% / ${dot.opacity * 0.6})`
          }}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between font-mono text-[9px] text-muted-foreground uppercase">
        <span>5 leads</span>
        <span className="text-destructive">3 ghosted</span>
      </div>
    </div>
  );
};

// Data health bar dropping
const DataHealthBar = () => {
  const [health, setHealth] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth(prev => {
        const drop = Math.random() * 8;
        const newHealth = prev - drop;
        return newHealth < 20 ? 87 : newHealth;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getHealthColor = () => {
    if (health > 70) return 'bg-emerald-500';
    if (health > 40) return 'bg-amber-500';
    return 'bg-destructive';
  };

  return (
    <div className="flex flex-col gap-3 h-full justify-center">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Data Health
        </span>
        <span className={`font-mono text-sm ${health < 40 ? 'text-destructive' : 'text-foreground'}`}>
          {Math.round(health)}%
        </span>
      </div>
      <div className="h-2 bg-card rounded-full overflow-hidden border border-border">
        <div 
          className={`h-full ${getHealthColor()} transition-all duration-1000 ease-out`}
          style={{ 
            width: `${health}%`,
            boxShadow: health < 40 ? '0 0 10px hsl(0 84% 60% / 0.5)' : 'none'
          }}
        />
      </div>
      <div className="flex gap-1 flex-wrap">
        {['Duplicates', 'Stale', 'Invalid'].map((tag, i) => (
          <span 
            key={tag}
            className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-destructive/20 text-destructive border border-destructive/30"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Clock with scanning line
const AfterHoursClock = () => {
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition(prev => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full gap-3">
      <div className="relative">
        <Clock size={48} className="text-muted-foreground" />
        {/* Scanning line */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - scanPosition}% 0 0)` }}
        >
          <Clock size={48} className="text-primary" style={{ filter: 'drop-shadow(0 0 8px hsl(217 100% 55% / 0.8))' }} />
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono text-2xl text-foreground">11:47 PM</div>
        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
          No agents online
        </div>
      </div>
    </div>
  );
};

const RealityCheck = () => {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <AlertTriangle size={12} className="text-primary" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary">
              Reality Check
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            Growth stalls because leads are <br className="hidden md:block" />
            <span className="italic text-primary">not handled fast.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 - Large: Missed Calls */}
          <div className="md:col-span-2 group relative p-6 rounded-2xl bg-card/50 border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(217_100%_55%/0.15)]">
            <div className="flex flex-col h-full min-h-[200px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-sm uppercase tracking-widest text-foreground">
                  Missed Calls
                </h3>
                <span className="font-mono text-[10px] text-destructive uppercase tracking-wider">
                  -47% conversion
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Every unanswered call is a lead walking to your competitor. The waveform doesn't lie.
              </p>
              <div className="flex-1 flex items-center">
                <WaveformVisual />
              </div>
            </div>
          </div>

          {/* Card 2: Slow Follow Up */}
          <div className="group relative p-6 rounded-2xl bg-card/50 border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(217_100%_55%/0.15)]">
            <div className="flex flex-col h-full min-h-[200px]">
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-2">
                Slow Follow Up
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Speed to lead determines close rate.
              </p>
              <div className="flex-1">
                <LatencyCounter />
              </div>
            </div>
          </div>

          {/* Card 3: Leads Ghosting */}
          <div className="group relative p-6 rounded-2xl bg-card/50 border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(217_100%_55%/0.15)]">
            <div className="flex flex-col h-full min-h-[180px]">
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-2">
                Leads Ghosting
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Watch them fade without timely follow-up.
              </p>
              <div className="flex-1">
                <GhostingDots />
              </div>
            </div>
          </div>

          {/* Card 4: Decaying Databases */}
          <div className="group relative p-6 rounded-2xl bg-card/50 border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(217_100%_55%/0.15)]">
            <div className="flex flex-col h-full min-h-[180px]">
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-2">
                Decaying Databases
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Your CRM is rotting in real-time.
              </p>
              <div className="flex-1">
                <DataHealthBar />
              </div>
            </div>
          </div>

          {/* Card 5: After-Hours Silence */}
          <div className="group relative p-6 rounded-2xl bg-card/50 border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(217_100%_55%/0.15)]">
            <div className="flex flex-col h-full min-h-[180px]">
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-2">
                After-Hours Silence
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Leads don't wait for business hours.
              </p>
              <div className="flex-1">
                <AfterHoursClock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealityCheck;
