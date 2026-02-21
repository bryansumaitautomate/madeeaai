

# Fix Inconsistent Computation in Audit Analyzer

## Problem

All financial calculations are currently performed by GPT-4o, which produces inconsistent numbers across different sections of the same response:

- **Reclaimable Revenue (dashboard)**: $8,000
- **Projected Cost Savings (computation breakdown)**: $7,280
- **Full Table Savings**: $2,800
- **Quick Wins Total**: $4,900

These should all be derived from the same math, but the AI invents different values for each section.

## Solution

Compute the core financial metrics **deterministically in the edge function** (server-side), then:
1. Inject those pre-computed values into the AI prompt so it uses them consistently
2. Override the AI's dashboard numbers with the server-computed values in the response

## Changes

### 1. Server-Side Computation (Edge Function)

Add a computation block in `supabase/functions/analyze-audit/index.ts` **before the OpenAI call** that calculates:

```text
totalWeeklyHours = sum of (hoursPerWeek * peopleInvolved) across all processes
totalAnnualHours = totalWeeklyHours * 52
totalAnnualLaborCost = totalAnnualHours * effectiveHourlyRate
automationEfficiency = 0.35 (conservative default for mixed tasks)
projectedHoursSaved = Math.round(totalAnnualHours * automationEfficiency)
projectedCostSavings = projectedHoursSaved * effectiveHourlyRate
estimatedImplementationCost = projectedCostSavings / roiCeiling
actualROI = Math.min(projectedCostSavings / estimatedImplementationCost, roiCeiling)
```

### 2. Inject Into AI Prompt

Add a new section to the user prompt:

```text
**PRE-COMPUTED VALUES (USE THESE EXACTLY - DO NOT RECALCULATE):**
- Total Weekly Hours: XX
- Total Annual Hours: XX
- Total Annual Labor Cost: $XX,XXX
- Automation Efficiency: 35%
- Projected Hours Saved: XXX
- Reclaimable Revenue (Projected Cost Savings): $X,XXX
- ROI: X.Xx
- These numbers are FINAL. Use them in the dashboard and ensure quick_wins
  estimated_savings sum to approximately the Reclaimable Revenue figure.
```

### 3. Override AI Dashboard in Response

After receiving the AI response, override the dashboard values with the server-computed ones:

```text
analysisResult.dashboard.revenue = formatCurrency(projectedCostSavings)
analysisResult.dashboard.roi = actualROI.toFixed(1) + "x"
analysisResult.dashboard.hours_saved = projectedHoursSaved.toString()
analysisResult.dashboard.potential_pct = (automationEfficiency * 100) + "%"
analysisResult.dashboard.industry_rate = "$" + effectiveHourlyRate + "/hr"
```

Also override the computation_breakdown to match:

```text
analysisResult.computation_breakdown = {
  hourly_rate_used, hourly_rate_source, total_weekly_hours,
  total_annual_hours, total_annual_labor_cost, automation_efficiency,
  projected_hours_saved, projected_cost_savings,
  roi_calculation (with actual formula), roi_ceiling_applied
}
```

### 4. What the AI Still Controls

The AI will still generate the **qualitative** content:
- Quick win titles, descriptions, and implementation timelines
- Long-term strategy titles, descriptions, and focus areas
- Cost driver analysis recommendations
- Full table ROI scores and per-process breakdown descriptions

But the **hard numbers** (dashboard, computation breakdown) will always be mathematically consistent.

## What Stays the Same
- All frontend code (ResultsDashboard, types, etc.)
- Input sanitization and JSON cleanup
- CORS headers, n8n webhook
- The system prompt persona and qualitative guidelines

## Expected Outcome
- Reclaimable Revenue, ROI, hours saved, and computation breakdown will always be mathematically consistent
- Quick wins estimated savings will approximately sum to the reclaimable revenue figure
- No more contradictory numbers across sections
