
# Hybrid Approach: Server-Side Math + AI Qualitative Analysis

## Problem
GPT is unreliable at arithmetic -- the test showed it reporting $190K savings but $600K-$1.2M reclaimable revenue. We need deterministic, verifiable math on the server, while keeping GPT's strength in generating qualitative insights.

## How It Works

The edge function will:
1. **Server computes all numbers** using variable efficiency per process (not flat 35%)
2. **GPT generates qualitative content** (quick wins, strategies, cost driver analysis, descriptions)
3. **Server overrides GPT's dashboard and computation_breakdown** with the correct math

## Server-Side Calculation Logic

### Process Complexity Detection
Each process gets an efficiency factor based on keywords in its name and pain points:

```text
High efficiency (55-65%) - "data entry", "scheduling", "invoicing", "email", "reporting", "filing", "booking"
Medium efficiency (40-50%) - "follow-up", "onboarding", "tracking", "social media", "content", "review"  
Low efficiency (20-30%) - "strategy", "consulting", "negotiation", "design", "creative", "management"
Default: 40%
```

### Department Role Multipliers
Applied to hourly rate based on department name:

```text
Executive/Strategy/Leadership: 1.5x
Sales/Marketing/Finance: 1.2x
Operations/Admin/Support: 0.8x
Default: 1.0x
```

### Per-Process Calculation
For each process:
- `weeklyHours = hoursPerWeek x peopleInvolved`
- `adjustedRate = effectiveHourlyRate x departmentMultiplier`
- `annualCost = weeklyHours x adjustedRate x 52`
- `savableHours = weeklyHours x processEfficiency`
- `savings = savableHours x adjustedRate x 52`

### Dashboard Totals
- **Reclaimable Revenue** = sum of all process savings
- **Hours Saved** = sum of all savable hours x 52
- **Automation Potential** = weighted average efficiency across all processes
- **ROI** = min(totalSavings / estimatedImplementationCost, roiCeiling)
- **Implementation cost estimate** = $500 per process as baseline

## Changes

### 1. `supabase/functions/analyze-audit/index.ts`

**Add** three helper functions:
- `getProcessEfficiency(processName, painPoints)` -- returns 0.2-0.65 based on keyword matching
- `getDepartmentMultiplier(departmentName)` -- returns 0.8-1.5 based on department type
- `computeServerMetrics(departments, effectiveHourlyRate, roiCeiling)` -- loops through all processes, computes per-process and total metrics

**Add** server-side computation block after input parsing (before GPT call):
- Compute all metrics using the helpers above
- Build a `serverMetrics` object with: `totalSavings`, `totalHoursSaved`, `weightedEfficiency`, `roi`, `perProcessBreakdown`

**Update** the system prompt:
- Remove the dashboard number format instructions (GPT won't compute these)
- Remove `computation_breakdown` from required output
- Keep all qualitative sections: `quick_wins`, `long_term_strategy`, `cost_driver_analysis`, `full_table`
- Add instruction: "The dashboard numbers will be computed separately. Focus on qualitative analysis."

**Update** the user prompt:
- Include the server-computed `totalSavings` and `perProcessBreakdown` so GPT can reference accurate numbers in its descriptions
- Pass savings per process so GPT can cite them in quick wins

**Add** post-GPT override block:
- Set `analysisResult.dashboard` with server-computed values (formatted as strings)
- Set `analysisResult.computation_breakdown` with server-computed breakdown
- Merge server-computed per-process data into `analysisResult.full_table`

### 2. No frontend changes needed
The `ResultsDashboard` already parses `dashboard.revenue` etc. as strings -- the server will format them the same way.

## Expected Outcome
- Dashboard numbers are always mathematically correct and verifiable
- Different process types produce different savings (not flat 35%)
- Executive departments cost more to automate than admin departments
- Quick wins, strategies, and descriptions remain rich and contextual from GPT
- Numbers in quick win descriptions will roughly align with dashboard totals because GPT receives the server-computed figures as context
