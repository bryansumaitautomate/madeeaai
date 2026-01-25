import { useEffect, useState } from 'react';

const logEntries = [
  { time: '14:32:01', type: 'info', message: 'Lead captured: john@acme.co' },
  { time: '14:32:02', type: 'success', message: 'AI response sent in 0.3s' },
  { time: '14:32:05', type: 'info', message: 'Qualification score: 87/100' },
  { time: '14:32:08', type: 'success', message: 'Meeting booked: Thu 2pm' },
  { time: '14:33:12', type: 'info', message: 'Lead captured: sarah@corp.io' },
  { time: '14:33:14', type: 'success', message: 'AI response sent in 0.2s' },
  { time: '14:33:18', type: 'warn', message: 'Low intent detected - nurture' },
  { time: '14:34:01', type: 'info', message: 'Lead captured: mike@startup.co' },
  { time: '14:34:03', type: 'success', message: 'AI response sent in 0.4s' },
  { time: '14:34:06', type: 'success', message: 'High intent - fast track' },
  { time: '14:34:09', type: 'success', message: 'Meeting booked: Fri 10am' },
  { time: '14:35:22', type: 'info', message: 'Lead captured: lisa@ent.com' },
];

export default function TerminalLog() {
  const [visibleLogs, setVisibleLogs] = useState(logEntries.slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % logEntries.length;
        setVisibleLogs((logs) => {
          const newLogs = [...logs.slice(1), logEntries[nextIndex]];
          return newLogs;
        });
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-400';
      case 'warn':
        return 'text-amber-400';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Live Activity
        </span>
      </div>
      <div className="flex-1 overflow-hidden font-mono text-[11px] space-y-1.5">
        {visibleLogs.map((log, index) => (
          <div
            key={`${log.time}-${index}`}
            className="flex gap-2 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-muted-foreground/60">{log.time}</span>
            <span className={getTypeColor(log.type)}>●</span>
            <span className="text-foreground/80 truncate">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
