import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const departments = [
  { label: 'SALES', angle: 0, status: 'scanning' },
  { label: 'OPS', angle: 90, status: 'optimal' },
  { label: 'HR', angle: 180, status: 'alert' },
  { label: 'SUPPORT', angle: 270, status: 'scanning' },
];

const statusColors = {
  scanning: 'text-primary',
  optimal: 'text-emerald-400',
  alert: 'text-amber-400',
};

export default function DepartmentRadar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseData, setPulseData] = useState<{ [key: string]: number }>({
    SALES: 78,
    OPS: 92,
    HR: 45,
    SUPPORT: 67,
  });

  // Rotate through departments
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % departments.length);
      // Simulate live data updates
      setPulseData((prev) => ({
        ...prev,
        [departments[Math.floor(Math.random() * departments.length)].label]:
          Math.floor(Math.random() * 40) + 60,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Radar container */}
      <div className="relative w-64 h-64">
        {/* Concentric circles */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute inset-0 rounded-full border border-border/30"
            style={{
              transform: `scale(${ring / 3})`,
            }}
          />
        ))}

        {/* Radar sweep */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.3) 30deg, transparent 60deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />

        {/* Department labels */}
        {departments.map((dept, index) => {
          const isActive = index === activeIndex;
          const radius = 145; // Pushed further out to avoid overlap
          const angleRad = (dept.angle - 90) * (Math.PI / 180);
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <motion.div
              key={dept.label}
              className="absolute top-1/2 left-1/2 flex flex-col items-center z-10"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative px-2 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border/50">
                <span
                  className={`font-mono text-[11px] uppercase tracking-widest font-bold drop-shadow-lg ${
                    isActive ? statusColors[dept.status as keyof typeof statusColors] : 'text-muted-foreground'
                  }`}
                  style={{
                    textShadow: isActive ? '0 0 8px currentColor' : 'none',
                  }}
                >
                  {dept.label}
                </span>
                <motion.span
                  className={`block font-mono text-sm font-bold text-center ${
                    isActive ? 'text-foreground' : 'text-muted-foreground/70'
                  }`}
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                  style={{
                    textShadow: isActive ? '0 0 6px rgba(255,255,255,0.5)' : 'none',
                  }}
                >
                  {pulseData[dept.label]}%
                </motion.span>
              </div>
              {isActive && (
                <motion.div
                  className="absolute -inset-1 rounded-lg border border-primary/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Blip dots on radar */}
        {departments.map((dept, index) => {
          const blipRadius = 40 + (pulseData[dept.label] / 100) * 50;
          const x = Math.cos((dept.angle - 90) * (Math.PI / 180)) * blipRadius;
          const y = Math.sin((dept.angle - 90) * (Math.PI / 180)) * blipRadius;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={`blip-${dept.label}`}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                boxShadow: isActive ? '0 0 12px hsl(var(--primary))' : 'none',
              }}
              animate={{
                scale: isActive ? [1, 1.5, 1] : 1,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
            />
          );
        })}
      </div>

      {/* Status readout */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Scanning: <span className="text-primary">{departments[activeIndex].label}</span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/60">
            Multi-Department Pulse Active
          </span>
        </div>
      </div>
    </div>
  );
}
