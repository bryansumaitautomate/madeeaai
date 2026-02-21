
# Revert to Original AI-Driven Audit Calculations

## Problem
The current edge function hardcodes automation efficiency at a flat 35% and overrides all AI-calculated dashboard values with server-side math. This produces artificially low reclaimable revenue ($6.9K) because it ignores:
- Process-specific complexity (simple tasks should get 50-65% efficiency, not 35%)
- Department role multipliers (Executive 1.5x, Admin 0.8x)
- The AI's ability to analyze each process individually

Your previous website let GPT do this analysis and produced realistic figures like $120K+.

## Solution
Replace the current edge function with the exact logic from your previous website, keeping only the improvements we added (input sanitization, JSON cleanup helper, expanded CORS headers, n8n webhook).

## Changes

### 1. `supabase/functions/analyze-audit/index.ts` - Full replacement

**Remove:**
- The `formatCurrency` helper (line 28-30)
- The "PRE-COMPUTED VALUES" instructions in the system prompt (lines 74-77)
- The locked dashboard format in the system prompt (lines 82-86) that says "Use the pre-computed value exactly"
- The deterministic computation block (lines 254-270)
- The "PRE-COMPUTED VALUES" section in the user prompt (lines 282-292)
- The server-side dashboard override block (lines 359-379)

**Restore from your previous website:**
- System prompt with flexible dashboard format: `"revenue": "[Formatted String, e.g., $120,000 - be conservative]"`
- System prompt instruction to include detailed `computation_breakdown` showing the AI's math
- User prompt that passes calculation parameters as guidelines (not fixed values) and per-process annual cost estimates
- Direct return of the AI's analysis result (no overrides)

**Keep (improvements we added):**
- `sanitizeInput` and `sanitizeObject` functions
- `extractJsonFromResponse` JSON cleanup helper
- Expanded CORS headers
- n8n webhook integration
- Cost driver mapping, revenue mapping, income goal mapping

### 2. What stays the same
- All frontend code (no UI changes)
- The types in `src/types/audit.ts`
- The wizard flow in `AuditWizard.tsx`
- Industry hourly rates and ROI ceiling logic

## Expected Outcome
- Reclaimable revenue will reflect realistic process-specific analysis (like your previous site)
- The AI will apply variable efficiency factors (15-65%) per process type
- Role multipliers will affect cost calculations appropriately
- Computation breakdown will show the AI's detailed reasoning
