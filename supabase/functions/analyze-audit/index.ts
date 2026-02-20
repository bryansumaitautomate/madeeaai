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

REALISTIC CALCULATION LOGIC:
1. Use the hourly rate provided in the prompt for all cost calculations.
2. AUTOMATION EFFICIENCY: Simple tasks 50-65%, moderate 35-50%, high complexity 15-30%.
3. First Year ROI must NOT exceed the ROI ceiling provided.
4. Weight 40% of quick wins toward addressing the user's stated biggest cost driver.

REQUIRED JSON OUTPUT FORMAT:
{
  "dashboard": { "revenue": "$X", "roi": "X.Xx", "hours_saved": "X,XXX", "potential_pct": "XX%", "industry_rate": "$XX/hr" },
  "quick_wins": [{ "title": "...", "desc": "...", "estimated_savings": "$X", "implementation_time": "X weeks" }],
  "long_term_strategy": [{ "quarter": "Q1", "title": "...", "desc": "...", "focus_areas": [], "expected_outcome": "$X saved" }],
  "full_table": [{ "process": "...", "department": "...", "hrs_week": 0, "hourly_rate": "$XX", "annual_cost": "$X", "savings": "$X", "roi_score": "X.X" }],
  "cost_driver_analysis": { "identified_driver": "...", "current_impact": "$X", "optimization_potential": "XX%", "recommended_actions": [] },
  "computation_breakdown": { "hourly_rate_used": "$XX/hr", "hourly_rate_source": "user-provided or industry-default", "total_weekly_hours": 0, "total_annual_hours": 0, "total_annual_labor_cost": "$X", "automation_efficiency": "XX%", "projected_hours_saved": 0, "projected_cost_savings": "$X", "roi_calculation": "...", "roi_ceiling_applied": "X.Xx" }
}

Provide ONLY the JSON object. Be CONSERVATIVE and REALISTIC.`;

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
      ? goalsReadiness?.biggestCostDriverCustom || 'Custom'
      : costDriverMap[goalsReadiness?.biggestCostDriver] || 'Not specified';

    const userPrompt = `Analyze this business operation audit:

**Company:** ${companyInfo.companyName || 'N/A'} | Industry: ${companyInfo.industry} | Employees: ${companyInfo.employeeCount}
**Effective Hourly Rate:** $${effectiveHourlyRate}/hr | **ROI Ceiling:** ${roiCeiling}x
**Biggest Cost Driver:** ${biggestCostDriver}
**Revenue:** ${goalsReadiness?.currentMonthlyRevenue || 'N/A'} | **90-Day Goal:** ${goalsReadiness?.incomeGoal90Days || 'N/A'}

**Departments:**
${departments.map((dept: any) => `${dept.name}: ${dept.processes.map((p: any) => `${p.processName} (${p.hoursPerWeek}hrs/wk × ${p.peopleInvolved} people, Pain: ${p.painPoints || 'N/A'})`).join('; ')}`).join('\n')}

Total Weekly Hours: ${departments.reduce((acc: number, dept: any) => acc + dept.processes.reduce((pAcc: number, proc: any) => pAcc + (proc.hoursPerWeek * proc.peopleInvolved), 0), 0)}

Use $${effectiveHourlyRate}/hr for all calculations. Do NOT exceed ${roiCeiling}x ROI.`;

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Calling OpenAI for audit analysis...');

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
    
    // Extract JSON from response
    let content = data.choices?.[0]?.message?.content || data.content || '';
    
    // Try to parse JSON from content
    const analysisResult = extractJsonFromResponse(content);

    console.log('Analysis complete');

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
