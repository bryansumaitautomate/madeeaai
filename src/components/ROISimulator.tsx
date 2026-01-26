import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Clock, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Slider } from '@/components/ui/slider';
import ControlRoomButton from './ControlRoomButton';
const ROISimulator = () => {
  const [employees, setEmployees] = useState(10);
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(35);

  // AI saves 75% of manual time (70-90% range, using 75% as middle)
  const AI_EFFICIENCY_RATE = 0.75;
  const calculations = useMemo(() => {
    const annualManualCost = employees * weeklyHours * hourlyCost * 52;
    const annualSavings = annualManualCost * AI_EFFICIENCY_RATE;
    const monthlySavings = annualSavings / 12;
    const hoursRecoveredWeekly = employees * weeklyHours * AI_EFFICIENCY_RATE;
    const hoursRecoveredAnnual = hoursRecoveredWeekly * 52;

    // Generate 12-month projection with compounding effect
    const projectionData = Array.from({
      length: 12
    }, (_, i) => {
      const month = i + 1;
      return {
        month: `M${month}`,
        savings: Math.round(monthlySavings * month),
        monthly: Math.round(monthlySavings)
      };
    });
    return {
      annualManualCost,
      annualSavings,
      monthlySavings,
      hoursRecoveredWeekly: Math.round(hoursRecoveredWeekly),
      hoursRecoveredAnnual: Math.round(hoursRecoveredAnnual),
      projectionData
    };
  }, [employees, weeklyHours, hourlyCost]);
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };
  return <section id="audit" className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-matrix opacity-30 pointer-events-none" />
      
      {/* Subtle aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">
            Efficiency Calculator
          </h2>
          <p className="text-3xl font-syne font-light tracking-tight text-foreground md:text-4xl">Calculate your  hidden  operational cost.<span className="italic text-primary"> hidden</span> operational cost.
          </p>
        </div>

        {/* Main simulator panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Input Controls */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="glass-infrastructure rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                System Parameters
              </span>
            </div>

            <div className="space-y-10">
              {/* Number of Employees */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-secondary-foreground flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    Number of Employees
                  </label>
                  <span className="text-2xl font-mono text-foreground tabular-nums">
                    {employees}
                  </span>
                </div>
                <Slider value={[employees]} onValueChange={v => setEmployees(v[0])} min={1} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                  <span>1</span>
                  <span>100 employees</span>
                </div>
              </div>

              {/* Weekly Manual Hours */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-secondary-foreground flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    Weekly Manual Hours (per employee)
                  </label>
                  <span className="text-2xl font-mono text-foreground tabular-nums">
                    {weeklyHours}h
                  </span>
                </div>
                <Slider value={[weeklyHours]} onValueChange={v => setWeeklyHours(v[0])} min={1} max={40} step={1} className="w-full" />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                  <span>1h</span>
                  <span>40h/week</span>
                </div>
              </div>

              {/* Hourly Cost */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-secondary-foreground flex items-center gap-2">
                    <DollarSign size={16} className="text-muted-foreground" />
                    Hourly Cost per Employee
                  </label>
                  <span className="text-2xl font-mono text-foreground tabular-nums">
                    ${hourlyCost}
                  </span>
                </div>
                <Slider value={[hourlyCost]} onValueChange={v => setHourlyCost(v[0])} min={15} max={150} step={5} className="w-full" />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
                  <span>$15</span>
                  <span>$150/hr</span>
                </div>
              </div>
            </div>

            {/* Formula display */}
            <div className="mt-10 p-4 bg-foreground/5 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calculator size={14} className="text-primary" />
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Efficiency Formula
                </p>
              </div>
              <p className="text-xs font-mono text-secondary-foreground">
                (Employees × Hours × Cost × 52) × <span className="text-primary">75%</span> = <span className="text-primary">Annual Savings</span>
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Results Readout with Magic Border */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="infrastructure-card-wrapper">
            <div className="infrastructure-card-border h-full">
              <div className="infrastructure-card-gradient" />
              <div className="infrastructure-card-content h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Efficiency Diagnostic
                  </span>
                </div>

                {/* Cost Comparison */}
                <div className="space-y-6 mb-8">
                  {/* Annual Manual Cost - Dimmed */}
                  <div className="text-center p-4 bg-foreground/5 rounded-xl border border-border">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Annual Cost of Manual Processes
                    </p>
                    <p className="text-3xl font-serif font-light text-foreground/50">
                      {formatCurrency(calculations.annualManualCost)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculations.hoursRecoveredAnnual.toLocaleString()} hours/year spent on manual tasks
                    </p>
                  </div>

                  {/* Potential Savings - Glowing Blue */}
                  <div className="text-center">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Potential Savings with Madeea.io
                    </p>
                    <p className="text-5xl md:text-6xl font-serif font-light text-primary" style={{
                    textShadow: '0 0 40px hsl(217 100% 55% / 0.6), 0 0 80px hsl(217 100% 55% / 0.3), 0 0 120px hsl(217 100% 55% / 0.1)'
                  }}>
                      {formatCurrency(calculations.annualSavings)}
                    </p>
                    <p className="text-sm text-primary/80 font-mono mt-2">
                      {calculations.hoursRecoveredWeekly.toLocaleString()} hours recovered weekly
                    </p>
                  </div>
                </div>

                {/* Efficiency Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                    <TrendingUp size={14} className="text-primary" />
                    <span className="font-mono text-xs text-primary uppercase tracking-wider">
                      75% Time Savings
                    </span>
                  </div>
                </div>

                {/* Cumulative Savings Chart */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Cumulative Savings Projection
                    </span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={calculations.projectionData}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{
                        fontSize: 10,
                        fill: 'hsl(240, 5%, 55%)'
                      }} />
                        <YAxis hide domain={[0, 'dataMax + 1000']} />
                        <Tooltip contentStyle={{
                        backgroundColor: '#0a0a0f',
                        border: '1px solid hsl(220, 13%, 20%)',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} labelStyle={{
                        color: 'hsl(240, 5%, 55%)'
                      }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cumulative Savings']} />
                        <Line type="monotone" dataKey="savings" stroke="hsl(217, 100%, 55%)" strokeWidth={2} dot={false} filter="drop-shadow(0 0 8px hsl(217 100% 55% / 0.5))" />
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
          <ControlRoomButton label="Get Your Free AI Audit" icon={ArrowRight} />
        </div>
      </div>
    </section>;
};
export default ROISimulator;