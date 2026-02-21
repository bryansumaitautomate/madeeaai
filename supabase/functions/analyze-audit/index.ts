import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const INDUSTRY_HOURLY_RATES: Record<string, number> = {
  "Technology": 85, "Finance": 90, "Healthcare": 80, "Consulting": 95, "Coaching": 75,
  "Professional Services": 75, "Marketing & Advertising": 65, "Real Estate": 60,
  "Media & Entertainment": 70, "Education": 55, "Fitness": 55, "E-commerce": 50,
  "Retail": 40, "Manufacturing": 45, "Salons & Spas": 40, "Restaurants & Hospitality": 35, "Other": 50
};

function getIndustryRate(industry: string): number {
  return INDUSTRY_HOURLY_RATES[industry] || 50;
}

function getROICeiling(monthlyRevenue: string): number {
  const map: Record<string, number> = {
    "under-10k": 1.3, "10k-25k": 1.5, "25k-50k": 1.8, "50k-100k": 2.0,
    "100k-250k": 2.3, "250k-500k": 2.5, "500k-1m": 2.8, "1m-5m": 3.0, "5m+": 3.2, "other": 2.5
  };
  return map[monthlyRevenue] || 1.5;
}

// --- Server-side calculation helpers ---

const HIGH_EFFICIENCY_KEYWORDS = ["data entry", "scheduling", "invoicing", "email", "reporting", "filing", "booking", "invoice", "schedule", "report"];
const MEDIUM_EFFICIENCY_KEYWORDS = ["follow-up", "follow up", "onboarding", "tracking", "social media", "content", "review", "posting", "monitoring", "updating"];
const LOW_EFFICIENCY_KEYWORDS = ["strategy", "consulting", "negotiation", "design", "creative", "management", "planning", "decision", "leadership"];

function getProcessEfficiency(processName: string, painPoints: string): number {
  const text = `${processName} ${painPoints}`.toLowerCase();

  for (const kw of HIGH_EFFICIENCY_KEYWORDS) {
    if (text.includes(kw)) return 0.55 + Math.random() * 0.10; // 55-65%
  }
  for (const kw of MEDIUM_EFFICIENCY_KEYWORDS) {
    if (text.includes(kw)) return 0.40 + Math.random() * 0.10; // 40-50%
  }
  for (const kw of LOW_EFFICIENCY_KEYWORDS) {
    if (text.includes(kw)) return 0.20 + Math.random() * 0.10; // 20-30%
  }
  return 0.40; // default
}

function getDepartmentMultiplier(departmentName: string): number {
  const name = departmentName.toLowerCase();
  if (/executive|strategy|leadership|c-suite|ceo|cfo|cto/.test(name)) return 1.5;
  if (/sales|marketing|finance|accounting|legal/.test(name)) return 1.2;
  if (/operations|admin|support|customer service|hr|human/.test(name)) return 0.8;
  return 1.0;
}

interface ProcessMetrics {
  processName: string;
  department: string;
  weeklyHours: number;
  adjustedRate: number;
  annualCost: number;
  efficiency: number;
  savableWeeklyHours: number;
  annualHoursSaved: number;
  savings: number;
}

interface ServerMetrics {
  totalSavings: number;
  totalAnnualHours: number;
  totalHoursSaved: number;
  totalWeeklyHours: number;
  totalAnnualLaborCost: number;
  weightedEfficiency: number;
  roi: number;
  processCount: number;
  perProcess: ProcessMetrics[];
}

function computeServerMetrics(departments: any[], effectiveHourlyRate: number, roiCeiling: number): ServerMetrics {
  const perProcess: ProcessMetrics[] = [];

  for (const dept of departments) {
    const deptMultiplier = getDepartmentMultiplier(dept.name || '');
    for (const proc of (dept.processes || [])) {
      const hoursPerWeek = Number(proc.hoursPerWeek) || 0;
      const peopleInvolved = Number(proc.peopleInvolved) || 1;
      const weeklyHours = hoursPerWeek * peopleInvolved;
      const adjustedRate = effectiveHourlyRate * deptMultiplier;
      const annualCost = weeklyHours * adjustedRate * 52;
      const efficiency = getProcessEfficiency(proc.processName || '', proc.painPoints || '');
      const savableWeeklyHours = weeklyHours * efficiency;
      const annualHoursSaved = savableWeeklyHours * 52;
      const savings = savableWeeklyHours * adjustedRate * 52;

      perProcess.push({
        processName: proc.processName || 'Unnamed',
        department: dept.name || 'Unknown',
        weeklyHours,
        adjustedRate: Math.round(adjustedRate * 100) / 100,
        annualCost: Math.round(annualCost),
        efficiency: Math.round(efficiency * 100) / 100,
        savableWeeklyHours: Math.round(savableWeeklyHours * 10) / 10,
        annualHoursSaved: Math.round(annualHoursSaved),
        savings: Math.round(savings),
      });
    }
  }

  const totalSavings = perProcess.reduce((s, p) => s + p.savings, 0);
  const totalWeeklyHours = perProcess.reduce((s, p) => s + p.weeklyHours, 0);
  const totalAnnualHours = totalWeeklyHours * 52;
  const totalHoursSaved = perProcess.reduce((s, p) => s + p.annualHoursSaved, 0);
  const totalAnnualLaborCost = perProcess.reduce((s, p) => s + p.annualCost, 0);

  // Weighted average efficiency
  const weightedEfficiency = totalWeeklyHours > 0
    ? perProcess.reduce((s, p) => s + p.efficiency * p.weeklyHours, 0) / totalWeeklyHours
    : 0.40;

  // ROI: savings / implementation cost, capped at ceiling
  const implCost = perProcess.length * 500;
  const rawRoi = implCost > 0 ? totalSavings / implCost : 0;
  const roi = Math.min(Math.round(rawRoi * 10) / 10, roiCeiling);

  return {
    totalSavings,
    totalAnnualHours,
    totalHoursSaved,
    totalWeeklyHours,
    totalAnnualLaborCost,
    weightedEfficiency: Math.round(weightedEfficiency * 100),
    roi,
    processCount: perProcess.length,
    perProcess,
  };
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

// --- Prompt & sanitization ---

const SYSTEM_PROMPT = `You are the Chief of Staff and Executive Assistant to a high-level CEO. You are conducting an operational audit to find "Found Money" and "Recaptured Capacity." Your tone is loyal, highly professional, and protective of the CEO's time.

PERSONA GUIDELINES:
- Speak as if you are delivering a briefing to your boss.
- Use terms like "Operational Drag," "Protocol Optimization," and "Leakage."
- Frame Quick Wins as "Immediate Action Items" you've identified to clear their desk.
- Frame Strategies as "Quarterly Roadmap Initiatives."
- Consider the user's income goals, time commitment, and biggest cost driver when making recommendations.

IMPORTANT: The dashboard numbers and computation_breakdown will be computed separately by the server. Do NOT include "dashboard" or "computation_breakdown" in your response. Focus entirely on qualitative analysis.

COST DRIVER PRIORITY:
- Weight 40% of quick wins toward addressing the user's stated biggest cost driver
- Provide specific savings estimates for addressing their pain point (use the server-computed figures provided)

TIME COMMITMENT REALITY CHECK:
- 1-5 hrs/week: Focus on fully automated solutions only
- 5-10 hrs/week: Mix of automated + light oversight
- 10-20 hrs/week: More comprehensive transformation possible
- 20+ hrs/week: Full implementation roadmap viable

REQUIRED JSON OUTPUT FORMAT:
{
  "quick_wins": [
    { 
      "title": "Immediate Action Item 1", 
      "desc": "Executive briefing-style description of operational drag identified...",
      "estimated_savings": "$X,XXX",
      "implementation_time": "1-2 weeks"
    },
    { 
      "title": "Immediate Action Item 2", 
      "desc": "Executive briefing-style description of leakage found...",
      "estimated_savings": "$X,XXX",
      "implementation_time": "2-3 weeks"
    },
    { 
      "title": "Immediate Action Item 3", 
      "desc": "Executive briefing-style description of capacity reclamation...",
      "estimated_savings": "$X,XXX",
      "implementation_time": "1 week"
    }
  ],
  "long_term_strategy": [
    { 
      "quarter": "Q1",
      "title": "Foundation & Quick Automation", 
      "desc": "Establish core automation infrastructure and quick wins",
      "focus_areas": ["area1", "area2"],
      "expected_outcome": "$X saved"
    },
    { 
      "quarter": "Q2",
      "title": "Scale & Optimize", 
      "desc": "Expand automation coverage and optimize existing workflows",
      "focus_areas": ["area1", "area2"],
      "expected_outcome": "$X saved"
    },
    { 
      "quarter": "Q3",
      "title": "Full Integration & ROI Realization", 
      "desc": "Complete transformation and realize full ROI potential",
      "focus_areas": ["area1", "area2"],
      "expected_outcome": "$X saved"
    }
  ],
  "full_table": [
    { 
      "process": "Process Name", 
      "department": "Department Name",
      "hrs_week": 0, 
      "hourly_rate": "$XX",
      "annual_cost": "$X", 
      "savings": "$X", 
      "roi_score": "X.X" 
    }
  ],
  "cost_driver_analysis": {
    "identified_driver": "The user's stated biggest cost driver",
    "current_impact": "$XX,XXX annually",
    "optimization_potential": "XX%",
    "recommended_actions": ["action1", "action2", "action3"]
  }
}

IMPORTANT: Your response must be ONLY the JSON object above. Do NOT include "dashboard" or "computation_breakdown" fields. Use the server-computed savings figures provided in the user prompt to keep your qualitative descriptions consistent with the actual numbers.`;

function sanitizeInput(input: string, maxLength = 500): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/ignore (all )?(previous|prior|above) (instructions|prompts|rules)/gi, '[redacted]')
    .replace(/system prompt/gi, '[redacted]')
    .replace(/you are now/gi, '[redacted]')
    .trim().slice(0, maxLength);
}

function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') result[key] = sanitizeInput(value);
    else if (typeof value === 'number' || typeof value === 'boolean') result[key] = value;
    else if (Array.isArray(value)) result[key] = value.map(item => typeof item === 'object' && item !== null ? sanitizeObject(item as Record<string, unknown>) : typeof item === 'string' ? sanitizeInput(item) : item);
    else if (typeof value === 'object' && value !== null) result[key] = sanitizeObject(value as Record<string, unknown>);
    else result[key] = value;
  }
  return result;
}

function extractJsonFromResponse(response: string): unknown {
  let cleaned = response.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const jsonStart = cleaned.search(/[\{\[]/);
  const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === '[' ? ']' : '}');
  if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON object found in response");
  cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
  try { return JSON.parse(cleaned); } catch {
    cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "").replace(/'/g, '"');
    return JSON.parse(cleaned);
  }
}

// --- Main handler ---

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const rawBody = await req.json();
    const companyInfo = sanitizeObject(rawBody.companyInfo || {}) as Record<string, string>;
    const goalsReadiness = sanitizeObject(rawBody.goalsReadiness || {}) as Record<string, string>;
    const departments = (rawBody.departments || []).map((dept: Record<string, unknown>) => sanitizeObject(dept));

    const userProvidedRate = goalsReadiness?.averageEmployeeHourlyRate ? parseFloat(goalsReadiness.averageEmployeeHourlyRate) : null;
    const industryRate = getIndustryRate(companyInfo.industry);
    const effectiveHourlyRate = userProvidedRate && userProvidedRate > 0 ? userProvidedRate : industryRate;
    const roiCeiling = getROICeiling(goalsReadiness?.currentMonthlyRevenue || 'under-10k');

    // --- Server-side computation ---
    const serverMetrics = computeServerMetrics(departments, effectiveHourlyRate, roiCeiling);
    console.log('Server metrics computed:', JSON.stringify({
      totalSavings: serverMetrics.totalSavings,
      totalHoursSaved: serverMetrics.totalHoursSaved,
      weightedEfficiency: serverMetrics.weightedEfficiency,
      roi: serverMetrics.roi,
      processCount: serverMetrics.processCount,
    }));

    const costDriverMap: Record<string, string> = {
      "labor-payroll": "Labor/Payroll costs", "marketing-advertising": "Marketing & advertising",
      "software-tools": "Software & tools", "operations-logistics": "Operations & logistics",
      "customer-acquisition": "Customer acquisition", "manual-tasks": "Manual repetitive tasks", "other": "Other"
    };
    const biggestCostDriver = goalsReadiness?.biggestCostDriver === "other"
      ? goalsReadiness?.biggestCostDriverCustom || 'Custom (not specified)'
      : costDriverMap[goalsReadiness?.biggestCostDriver] || goalsReadiness?.biggestCostDriver || 'Not specified';

    const revenueMap: Record<string, string> = {
      "under-10k": "Under $10K/month", "10k-25k": "$10K - $25K/month",
      "25k-50k": "$25K - $50K/month", "50k-100k": "$50K - $100K/month",
      "100k-250k": "$100K - $250K/month", "250k-500k": "$250K - $500K/month",
      "500k-1m": "$500K - $1M/month", "1m-5m": "$1M - $5M/month",
      "5m+": "$5M+/month", "other": "Custom amount"
    };
    const currentRevenue = goalsReadiness?.currentMonthlyRevenue === "other"
      ? `Custom: ${goalsReadiness?.currentMonthlyRevenueCustom || 'Not specified'}`
      : revenueMap[goalsReadiness?.currentMonthlyRevenue] || goalsReadiness?.currentMonthlyRevenue || 'Not specified';
    const incomeGoal = goalsReadiness?.incomeGoal90Days === "other"
      ? `Custom: ${goalsReadiness?.incomeGoal90DaysCustom || 'Not specified'}`
      : goalsReadiness?.incomeGoal90Days || 'Not specified';

    // Build per-process summary for GPT context
    const processContextLines = serverMetrics.perProcess.map(p =>
      `  - ${p.processName} (${p.department}): ${p.weeklyHours} hrs/wk, efficiency ${Math.round(p.efficiency * 100)}%, annual savings ${formatCurrency(p.savings)}`
    ).join('\n');

    const userPrompt = `Analyze this business operation audit:

**Company Profile:**
- Company: ${companyInfo.companyName || 'Not specified'}
- Industry: ${companyInfo.industry}
- Employee Count: ${companyInfo.employeeCount}
- Current Tech Stack: ${companyInfo.techStack || 'Not specified'}

**Goals & Readiness Assessment:**
- Current Monthly Revenue: ${currentRevenue}
- Biggest Cost Driver: ${biggestCostDriver} (PRIORITIZE recommendations addressing this)
- 90-Day Income Goal: ${incomeGoal}
- Previous AI/Business Investment: ${goalsReadiness?.previousAIInvestment || 'Not specified'}
- Why Implementing AI: ${goalsReadiness?.whyImplementAI || 'Not specified'}
- Expected Changes: ${goalsReadiness?.expectedChanges || 'Not specified'}

**SERVER-COMPUTED METRICS (use these exact numbers in your descriptions):**
- Total Reclaimable Revenue: ${formatCurrency(serverMetrics.totalSavings)}/year
- Total Hours Saved: ${serverMetrics.totalHoursSaved} hours/year
- Automation Potential: ${serverMetrics.weightedEfficiency}%
- ROI: ${serverMetrics.roi}x
- Effective Hourly Rate: $${effectiveHourlyRate}/hr

**Per-Process Breakdown (server-computed):**
${processContextLines}

**Departments & Workflows:**
${departments.map((dept: any) => `
**${dept.name}**
${((dept.processes || []) as any[]).map((proc: any) => `
  - Process: ${proc.processName}
  - Hours/Week: ${proc.hoursPerWeek}
  - People Involved: ${proc.peopleInvolved}
  - Pain Points: ${proc.painPoints || 'Not specified'}
`).join('')}
`).join('')}

Provide qualitative analysis with specific, actionable recommendations.
- PRIORITIZE addressing the "${biggestCostDriver}" cost driver in your quick wins.
- Use the server-computed savings figures above when citing dollar amounts.
- Structure long-term strategy as a Q1-Q3 quarterly roadmap.
- For the full_table, use the server-computed per-process data for hrs_week, hourly_rate, annual_cost, savings, and roi_score values.`;

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) throw new Error('OPENAI_API_KEY is not configured');

    console.log('Calling OpenAI for qualitative analysis...');
    console.log('Effective hourly rate:', effectiveHourlyRate, 'ROI ceiling:', roiCeiling);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('AI API error:', errorData);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || data.content || '';
    const analysisResult = extractJsonFromResponse(content) as any;

    // --- Post-GPT override: inject server-computed dashboard & breakdown ---
    analysisResult.dashboard = {
      revenue: formatCurrency(serverMetrics.totalSavings),
      roi: `${serverMetrics.roi}x`,
      hours_saved: `${serverMetrics.totalHoursSaved.toLocaleString('en-US')} hours`,
      potential_pct: `${serverMetrics.weightedEfficiency}%`,
      industry_rate: `$${effectiveHourlyRate}/hr`,
    };

    analysisResult.computation_breakdown = {
      hourly_rate_used: `$${effectiveHourlyRate}/hr`,
      hourly_rate_source: userProvidedRate && userProvidedRate > 0 ? 'user-provided' : 'industry-default',
      total_weekly_hours: serverMetrics.totalWeeklyHours,
      total_annual_hours: serverMetrics.totalAnnualHours,
      total_annual_labor_cost: formatCurrency(serverMetrics.totalAnnualLaborCost),
      automation_efficiency: `${serverMetrics.weightedEfficiency}%`,
      projected_hours_saved: serverMetrics.totalHoursSaved,
      projected_cost_savings: formatCurrency(serverMetrics.totalSavings),
      roi_calculation: `${formatCurrency(serverMetrics.totalSavings)} savings / ${formatCurrency(serverMetrics.processCount * 500)} implementation cost = ${serverMetrics.roi}x (capped at ${roiCeiling}x ceiling)`,
      roi_ceiling_applied: `${roiCeiling}x`,
    };

    // Override full_table with server-computed data
    analysisResult.full_table = serverMetrics.perProcess.map(p => ({
      process: p.processName,
      department: p.department,
      hrs_week: p.weeklyHours,
      hourly_rate: `$${p.adjustedRate}`,
      annual_cost: formatCurrency(p.annualCost),
      savings: formatCurrency(p.savings),
      roi_score: (p.savings / Math.max(500, 1)).toFixed(1),
    }));

    console.log('Analysis complete - hybrid approach (server math + AI qualitative)');

    // Send results to n8n webhook in background (non-blocking)
    try {
      fetch('https://madeeas.app.n8n.cloud/webhook/madeea-com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyInfo, goalsReadiness, departments,
          analysis: analysisResult,
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.error('n8n webhook error (non-blocking):', err));
    } catch (e) {
      console.error('n8n webhook setup error:', e);
    }

    return new Response(JSON.stringify({ success: true, analysis: analysisResult }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in analyze-audit:', errorMessage);
    return new Response(JSON.stringify({ success: false, error: 'An error occurred while processing your request' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
