

# Restore Full Audit Analyzer Logic from Previous Website

## Problem
The current edge function has a stripped-down system prompt and user prompt compared to the proven version from your previous website. This causes:
- Less detailed/accurate reclaimable revenue calculations
- Weaker quick wins (missing cost driver prioritization, role multipliers, time commitment context)
- Missing revenue and income goal readable mappings in the AI prompt

## Solution
Replace the system prompt and user prompt construction with the full versions from your previous website, while keeping all the improvements already added (input sanitization, `extractJsonFromResponse` JSON cleanup, n8n webhook, expanded CORS headers).

## Changes

### 1. Update `supabase/functions/analyze-audit/index.ts`

**Replace the SYSTEM_PROMPT** (lines 28-52) with the full version from your previous site, which includes:
- Department Role Multipliers (Executive 1.5x, Professional 1.2x, Admin 0.8x, Entry-level 0.6x)
- Detailed automation efficiency factors
- Cost driver priority weighting (40% of quick wins)
- Time commitment reality checks
- Full JSON output format with examples and field descriptions
- Instruction to include `computation_breakdown`

**Replace the user prompt construction** (lines 128-140) with the full version, which includes:
- Revenue and income goal readable mappings (e.g., "under-10k" becomes "Under $10K/month")
- Custom "other" value handling for revenue/income goals
- Per-process annual cost estimates in the prompt
- Full company profile with tech stack and referral source
- Detailed goals and readiness section

### 2. What stays the same
- Input sanitization (`sanitizeInput`, `sanitizeObject`)
- JSON cleanup helper (`extractJsonFromResponse`)
- CORS headers (expanded version)
- n8n webhook integration
- OpenAI call configuration (gpt-4o, 4000 max_tokens, json_object format)
- Industry rates and ROI ceiling logic (already matching)

## Technical Detail

The key additions to the user prompt:

```text
Revenue mapping:  "under-10k" -> "Under $10K/month"
Income goal:      "other" -> "Custom: {user value}"
Per-process cost:  hoursPerWeek * peopleInvolved * effectiveHourlyRate * 52
Full profile:      tech stack, referral source, previous AI investment
```

The key additions to the system prompt:
- 6 detailed calculation sections (rates, multipliers, efficiency, ROI, cost driver, time commitment)
- Full JSON schema with field-level descriptions and example values
- Explicit instruction to prioritize the user's biggest cost driver

## Expected Outcome
The AI will produce richer, more accurate analysis with proper reclaimable revenue figures, better quick wins tied to the user's cost driver, and a complete computation breakdown.
