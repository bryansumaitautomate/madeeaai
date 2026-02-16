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
  return <section id="audit" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-matrix opacity-30 pointer-events-none" />
      
      {/* Subtle aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[800px] h-[300px] sm:h-[600px] md:h-[800px] bg-primary/5 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xs sm:text-sm font-mono text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Efficiency Calculator
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-syne font-light tracking-tight text-foreground px-2">Calculate your <span className="italic text-primary">hidden</span> operational cost.
          </p>
        </div>

        {/* Main simulator panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* LEFT: Input Controls */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="glass-infrastructure rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground">
                System Parameters
              </span>
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Number of Employees */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs sm:text-sm font-medium text-secondary-foreground flex items-center gap-2">
                    <Users size={14} className="text-muted-foreground sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Number of</span> Employees
                  </label>
                  <span className="text-xl sm:text-2xl font-mono text-foreground tabular-nums">
                    {employees}
                  </span>
                </div>
                <Slider value={[employees]} onValueChange={v => setEmployees(v[0])} min={1} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase">
                  <span>1</span>
                  <span>100 employees</span>
                </div>
              </div>

              {/* Weekly Manual Hours */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs sm:text-sm font-medium text-secondary-foreground flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Weekly Manual Hours (per employee)</span>
                    <span className="sm:hidden">Hours/week</span>
                  </label>
                  <span className="text-xl sm:text-2xl font-mono text-foreground tabular-nums">
                    {weeklyHours}h
                  </span>
                </div>
                <Slider value={[weeklyHours]} onValueChange={v => setWeeklyHours(v[0])} min={1} max={40} step={1} className="w-full" />
                <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase">
                  <span>1h</span>
                  <span>40h/week</span>
                </div>
              </div>

              {/* Hourly Cost */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs sm:text-sm font-medium text-secondary-foreground flex items-center gap-2">
                    <DollarSign size={14} className="text-muted-foreground sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Hourly Cost per Employee</span>
                    <span className="sm:hidden">Hourly Cost</span>
                  </label>
                  <span className="text-xl sm:text-2xl font-mono text-foreground tabular-nums">
                    ${hourlyCost}
                  </span>
                </div>
                <Slider value={[hourlyCost]} onValueChange={v => setHourlyCost(v[0])} min={15} max={150} step={5} className="w-full" />
                <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase">
                  <span>$15</span>
                  <span>$150/hr</span>
                </div>
              </div>
            </div>

            {/* Formula display */}
            <div className="mt-6 sm:mt-8 md:mt-10 p-3 sm:p-4 bg-foreground/5 rounded-lg sm:rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calculator size={12} className="text-primary sm:w-3.5 sm:h-3.5" />
                <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Efficiency Formula
                </p>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-secondary-foreground">
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
                <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Efficiency Diagnostic
                  </span>
                </div>

                {/* Cost Comparison */}
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  {/* Annual Manual Cost - Dimmed */}
                  <div className="text-center p-3 sm:p-4 bg-foreground/5 rounded-lg sm:rounded-xl border border-border">
                    <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5 sm:mb-2">
                      Annual Cost of Manual Processes
                    </p>
                    <p className="text-2xl sm:text-3xl font-syne font-light text-foreground/50">
                      {formatCurrency(calculations.annualManualCost)}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      {calculations.hoursRecoveredAnnual.toLocaleString()} hours/year spent on manual tasks
                    </p>
                  </div>

                  {/* Potential Savings - Glowing Blue */}
                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5 sm:mb-2">
                      Potential Savings with Madeea.io
                    </p>
                    <p className="text-4xl sm:text-5xl md:text-6xl font-syne font-light text-primary" style={{
                    textShadow: '0 0 40px hsl(217 100% 55% / 0.6), 0 0 80px hsl(217 100% 55% / 0.3), 0 0 120px hsl(217 100% 55% / 0.1)'
                  }}>
                      {formatCurrency(calculations.annualSavings)}
                    </p>
                    <p className="text-xs sm:text-sm text-primary/80 font-mono mt-2">
                      {calculations.hoursRecoveredWeekly.toLocaleString()} hours recovered weekly
                    </p>
                  </div>
                </div>

                {/* Efficiency Badge */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30">
                    <TrendingUp size={12} className="text-primary sm:w-3.5 sm:h-3.5" />
                    <span className="font-mono text-[10px] sm:text-xs text-primary uppercase tracking-wider">
                      75% Time Savings
                    </span>
                  </div>
                </div>

                {/* Cumulative Savings Chart */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <TrendingUp size={12} className="text-primary sm:w-3.5 sm:h-3.5" />
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Cumulative Savings Projection
                    </span>
                  </div>
                  <div className="h-24 sm:h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={calculations.projectionData}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{
                        fontSize: 9,
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
        <div className="flex justify-center mt-10 sm:mt-12 md:mt-16 px-4 sm:px-0">
          <ControlRoomButton label="Get Your Free AI Audit" icon={ArrowRight} href="https://madeea-aiaudit.lovable.app" />
        </div>
      </div>
    </section>;
};
export default ROISimulator;