import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Slider } from '@/components/ui/slider';
import ControlRoomButton from './ControlRoomButton';

const ROISimulator = () => {
  const [leadVolume, setLeadVolume] = useState(250);
  const [bookingRate, setBookingRate] = useState(15);
  const [dealValue, setDealValue] = useState(2500);

  // AI fixes 35% of currently missed leads
  const AI_RECOVERY_RATE = 0.35;

  const calculations = useMemo(() => {
    const missedRate = (100 - bookingRate) / 100;
    const missedLeads = leadVolume * missedRate;
    const recoveredLeads = missedLeads * AI_RECOVERY_RATE;
    const recoveredMonthly = recoveredLeads * dealValue;
    const recoveredAnnual = recoveredMonthly * 12;
    
    // Generate 12-month projection with compounding effect
    const projectionData = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      // Slight efficiency improvement over time (learning curve)
      const efficiencyMultiplier = 1 + (i * 0.02);
      return {
        month: `M${month}`,
        revenue: Math.round(recoveredMonthly * efficiencyMultiplier),
        cumulative: Math.round(recoveredMonthly * month * (1 + (i * 0.01))),
      };
    });

    return {
      recoveredMonthly,
      recoveredAnnual,
      recoveredLeads: Math.round(recoveredLeads),
      projectionData,
    };
  }, [leadVolume, bookingRate, dealValue]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <section id="audit" className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-matrix opacity-30 pointer-events-none" />
      
      {/* Subtle aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">
            Revenue Diagnostic
          </h2>
          <p className="text-3xl md:text-5xl font-serif font-light tracking-tight text-foreground">
            Calculate your <span className="italic">invisible</span> revenue leak.
          </p>
        </div>

        {/* Main simulator panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-infrastructure rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                System Parameters
              </span>
            </div>

            <div className="space-y-10">
              {/* Lead Volume */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-secondary-foreground">
                    Monthly Lead Volume
                  </label>
                  <span className="text-2xl font-mono text-foreground tabular-nums">
                    {leadVolume.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[leadVolume]}
                  onValueChange={(v) => setLeadVolume(v[0])}
                  min={0}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                  <span>0</span>
                  <span>1,000 leads</span>
                </div>
              </div>

              {/* Booking Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-secondary-foreground">
                    Current Lead-to-Booking Rate
                  </label>
                  <span className="text-2xl font-mono text-foreground tabular-nums">
                    {bookingRate}%
                  </span>
                </div>
                <Slider
                  value={[bookingRate]}
                  onValueChange={(v) => setBookingRate(v[0])}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                  <span>1%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Deal Value */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-secondary-foreground">
                    Average Deal Value
                  </label>
                  <span className="text-2xl font-mono text-foreground tabular-nums">
                    ${dealValue.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[dealValue]}
                  onValueChange={(v) => setDealValue(v[0])}
                  min={500}
                  max={25000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                  <span>$500</span>
                  <span>$25,000</span>
                </div>
              </div>
            </div>

            {/* Formula display */}
            <div className="mt-10 p-4 bg-foreground/5 rounded-xl border border-border">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Recovery Formula
              </p>
              <p className="text-xs font-mono text-secondary-foreground">
                (Leads × Missed%) × 35% × Deal Value = <span className="text-primary">Recovered Revenue</span>
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Results Readout with Magic Border */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="infrastructure-card-wrapper"
          >
            <div className="infrastructure-card-border h-full">
              <div className="infrastructure-card-gradient" />
              <div className="infrastructure-card-content h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Diagnostic Readout
                  </span>
                </div>

                {/* Primary Metric */}
                <div className="text-center mb-8">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    Recovered Monthly Revenue
                  </p>
                  <p 
                    className="text-5xl md:text-6xl font-serif font-light text-foreground"
                    style={{ 
                      textShadow: '0 0 40px hsl(217 100% 55% / 0.5), 0 0 80px hsl(217 100% 55% / 0.2)'
                    }}
                  >
                    {formatCurrency(calculations.recoveredMonthly)}
                  </p>
                  <p className="text-sm text-primary font-mono mt-2">
                    +{calculations.recoveredLeads} leads recovered/mo
                  </p>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-foreground/5 rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-primary" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Response Time
                      </span>
                    </div>
                    <p className="text-xl font-mono text-foreground">&lt;30s</p>
                    <p className="text-[10px] text-muted-foreground">Speed to lead</p>
                  </div>
                  <div className="p-4 bg-foreground/5 rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-primary" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Annual Impact
                      </span>
                    </div>
                    <p className="text-xl font-mono text-foreground">
                      {formatCurrency(calculations.recoveredAnnual)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Projected recovery</p>
                  </div>
                </div>

                {/* Projection Chart */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      12-Month Growth Projection
                    </span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={calculations.projectionData}>
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: 'hsl(240, 5%, 55%)' }}
                        />
                        <YAxis 
                          hide 
                          domain={['dataMin - 1000', 'dataMax + 1000']}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0a0a0f',
                            border: '1px solid hsl(220, 13%, 20%)',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                          labelStyle={{ color: 'hsl(240, 5%, 55%)' }}
                          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="hsl(217, 100%, 55%)"
                          strokeWidth={2}
                          dot={false}
                          filter="drop-shadow(0 0 8px hsl(217 100% 55% / 0.5))"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <ControlRoomButton 
            label="Diagnose My System" 
            icon={ArrowRight}
          />
        </div>
      </div>
    </section>
  );
};

export default ROISimulator;
