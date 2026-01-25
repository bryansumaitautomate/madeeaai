import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { time: '9am', leads: 12 },
  { time: '10am', leads: 28 },
  { time: '11am', leads: 45 },
  { time: '12pm', leads: 38 },
  { time: '1pm', leads: 52 },
  { time: '2pm', leads: 67 },
  { time: '3pm', leads: 78 },
  { time: '4pm', leads: 85 },
];

export default function LeadVelocityChart() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Lead Velocity
        </span>
        <span className="font-mono text-[10px] text-primary">
          +23% today
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: 'hsl(240 5% 55%)' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: 'hsl(240 5% 55%)' }}
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="hsl(217 100% 55%)"
              strokeWidth={2}
              dot={false}
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow" height="300%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
