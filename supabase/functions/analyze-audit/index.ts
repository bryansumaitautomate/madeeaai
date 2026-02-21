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

const SYSTEM_PROMPT = `You are the Chief of Staff and Executive Assistant to a high-level CEO. You are conducting an operational audit to find "Found Money" and "Recaptured Capacity." Your tone is loyal, highly professional, and protective of the CEO's time.

PERSONA GUIDELINES:
- Speak as if you are delivering a briefing to your boss.
- Use terms like "Operational Drag," "Protocol Optimization," and "Leakage."
- Frame Quick Wins as "Immediate Action Items" you've identified to clear their desk.
- Frame Strategies as "Quarterly Roadmap Initiatives."
- Consider the user's income goals, time commitment, and biggest cost driver when making recommendations.

REALISTIC CALCULATION LOGIC:

1. INDUSTRY HOURLY RATES (use the rate provided in the prompt):
   - Technology/Finance/Consulting: $75-100/hr
   - Marketing/Media/Healthcare: $60-80/hr
   - Retail/Manufacturing/E-commerce: $40-55/hr

2. DEPARTMENT ROLE MULTIPLIERS (apply to the industry base rate):
   - Executive/Strategy roles: 1.5x base rate
   - Professional/Specialized: 1.2x base rate
   - Administrative/Support: 0.8x base rate
   - Entry-level/Repetitive: 0.6x base rate

3. AUTOMATION EFFICIENCY FACTORS:
   - Simple/repetitive tasks: 50-65% time savings
   - Moderate complexity: 35-50% time savings
   - High complexity/judgment tasks: 15-30% time savings

4. ROI CALCULATION (use the ROI ceiling provided - be conservative):
   - First Year ROI must NOT exceed the ROI ceiling provided
   - Account for implementation costs and learning curve
   - Use weighted averages across all processes

5. COST DRIVER PRIORITY:
   - Weight 40% of quick wins toward addressing the user's stated biggest cost driver
   - Provide specific savings estimates for addressing their pain point

6. TIME COMMITMENT REALITY CHECK:
   - 1-5 hrs/week: Focus on fully automated solutions only
   - 5-10 hrs/week: Mix of automated + light oversight
   - 10-20 hrs/week: More comprehensive transformation possible
   - 20+ hrs/week: Full implementation roadmap viable

REQUIRED JSON OUTPUT FORMAT:
{
  "dashboard": {
    "revenue": "[Formatted String, e.g., $120,000 - be conservative]",
    "roi": "[e.g., 1.8x - realistic first-year ROI, do not exceed ceiling]",
    "hours_saved": "[Total annual hours - be specific]",
    "potential_pct": "[Actual efficiency percentage based on process types, typically 35-55%]",
    "industry_rate": "[e.g., $65/hr - the base rate used]"
  },
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
  },
  "computation_breakdown": {
    "hourly_rate_used": "$XX/hr",
    "hourly_rate_source": "user-provided or industry-default",
    "total_weekly_hours": 0,
    "total_annual_hours": 0,
    "total_annual_labor_cost": "$X,XXX",
    "automation_efficiency": "XX%",
    "projected_hours_saved": 0,
    "projected_cost_savings": "$X,XXX",
    "roi_calculation": "Clear explanation of how ROI was calculated: (Projected Annual Savings / Estimated Implementation Cost) = ROI",
    "roi_ceiling_applied": "X.Xx"
  }
}

IMPORTANT: Your response must be ONLY the JSON object above, filled with calculated values based on the user inputs. Be CONSERVATIVE and REALISTIC with projections - credibility matters more than impressive numbers. Prioritize recommendations that address the user's stated biggest cost driver. Include a detailed computation_breakdown showing exactly how you arrived at the numbers.`;

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
  let cleaned = response
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const jsonStart = cleaned.search(/[\{\[]/);
  const jsonEnd = cleaned.lastIndexOf(
    jsonStart !== -1 && cleaned[jsonStart] === '[' ? ']' : '}'
  );

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No JSON object found in response");
  }

  cleaned = cleaned.substring(jsonStart, jsonEnd + 1);

  try {
    return JSON.parse(cleaned);
  } catch {
    cleaned = cleaned
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/[\x00-\x1F\x7F]/g, "")
      .replace(/'/g, '"');

    return JSON.parse(cleaned);
  }
}

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

    const userPrompt = `Analyze this business operation audit:

**Company Profile:**
- Company: ${companyInfo.companyName || 'Not specified'}
- Industry: ${companyInfo.industry}
- Employee Count: ${companyInfo.employeeCount}
- Current Tech Stack: ${companyInfo.techStack || 'Not specified'}
- Referral Source: ${companyInfo.referralSource || 'Not specified'}

**IMPORTANT CALCULATION PARAMETERS:**
- User-Provided Hourly Rate: $${userProvidedRate ? userProvidedRate : 'Not provided'}/hr
- Industry Fallback Rate: $${industryRate}/hr
- Effective Hourly Rate for Calculations: $${effectiveHourlyRate}/hr (USE THIS for all cost calculations)
- Maximum ROI Ceiling: ${roiCeiling}x (do NOT exceed this in projections)

**Goals & Readiness Assessment:**
- Current Monthly Revenue: ${currentRevenue}${goalsReadiness?.currentMonthlyRevenue === "other" ? ` (${goalsReadiness?.currentMonthlyRevenueCustom})` : ''}
- Biggest Cost Driver: ${biggestCostDriver} (PRIORITIZE recommendations addressing this)
- 90-Day Income Goal: ${incomeGoal}${goalsReadiness?.incomeGoal90Days === "other" ? ` (${goalsReadiness?.incomeGoal90DaysCustom})` : ''}
- Previous AI/Business Investment: ${goalsReadiness?.previousAIInvestment || 'Not specified'}
- Why Implementing AI: ${goalsReadiness?.whyImplementAI || 'Not specified'}
- Expected Changes: ${goalsReadiness?.expectedChanges || 'Not specified'}

**Departments & Workflows:**
${departments.map((dept: any) => `
**${dept.name}**
${((dept.processes || []) as any[]).map((proc: any) => `
  - Process: ${proc.processName}
  - Hours/Week: ${proc.hoursPerWeek}
  - People Involved: ${proc.peopleInvolved}
  - Pain Points: ${proc.painPoints || 'Not specified'}
  - Annual Cost Estimate: $${(Number(proc.hoursPerWeek) || 0) * (Number(proc.peopleInvolved) || 1) * effectiveHourlyRate * 52}
`).join('')}
`).join('')}

**Total Weekly Hours Logged:** ${departments.reduce((acc: number, dept: any) =>
  acc + ((dept.processes || []) as any[]).reduce((pAcc: number, proc: any) =>
    pAcc + ((Number(proc.hoursPerWeek) || 0) * (Number(proc.peopleInvolved) || 1)), 0), 0)} hours

Provide a comprehensive analysis with specific, actionable recommendations.
- PRIORITIZE addressing the "${biggestCostDriver}" cost driver in your quick wins.
- Ensure ROI projections do NOT exceed ${roiCeiling}x.
- Use $${effectiveHourlyRate}/hr as the hourly rate for all cost calculations.
- Structure long-term strategy as a Q1-Q3 quarterly roadmap.`;

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Calling OpenAI for audit analysis...');
    console.log('Effective hourly rate:', effectiveHourlyRate, 'ROI ceiling:', roiCeiling);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
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
    let content = data.choices?.[0]?.message?.content || data.content || '';
    const analysisResult = extractJsonFromResponse(content);

    console.log('Analysis complete - AI-driven calculations');

    // Send results to n8n webhook in background (non-blocking)
    try {
      fetch('https://madeeas.app.n8n.cloud/webhook/madeea-com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyInfo,
          goalsReadiness,
          departments,
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
