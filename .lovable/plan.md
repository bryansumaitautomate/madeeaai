

# Fix Audit Analyzer JSON Parsing Failures

## Problem
The edge function intermittently fails with a 500 error because OpenAI sometimes returns slightly malformed JSON (e.g., single quotes instead of double quotes, trailing commas, or control characters). The logs confirm:
- `Expected double-quoted property name in JSON at position 1402 (line 41 column 29)`

The current fallback parsing tries to extract JSON from code blocks but does NOT fix malformed JSON content.

## Solution
Add a robust `extractJsonFromResponse` helper that cleans up common JSON issues before parsing.

## Changes

### 1. Update `supabase/functions/analyze-audit/index.ts`

**Add a new helper function** (before the `serve` block) that:
- Strips markdown code block wrappers
- Finds JSON boundaries
- Attempts direct parse first
- On failure, fixes common issues: trailing commas, control characters, single quotes
- Retries parse with cleaned content

**Replace the JSON parsing block** (lines 149-168) to use this new helper instead of the current fragile try/catch chain.

### Technical Detail

```text
function extractJsonFromResponse(response: string): unknown {
  // Remove markdown code blocks
  let cleaned = response
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  // Find JSON boundaries
  const jsonStart = cleaned.search(/[\{\[]/);
  const jsonEnd = cleaned.lastIndexOf(
    jsonStart !== -1 && cleaned[jsonStart] === '[' ? ']' : '}'
  );

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No JSON object found in response");
  }

  cleaned = cleaned.substring(jsonStart, jsonEnd + 1);

  // Attempt direct parse
  try {
    return JSON.parse(cleaned);
  } catch {
    // Fix common malformed JSON issues
    cleaned = cleaned
      .replace(/,\s*}/g, "}")       // trailing commas before }
      .replace(/,\s*]/g, "]")       // trailing commas before ]
      .replace(/[\x00-\x1F\x7F]/g, "")  // control characters
      .replace(/'/g, '"');           // single quotes to double quotes

    return JSON.parse(cleaned);
  }
}
```

Then in the main handler, replace lines 149-168 with:
```text
const analysisResult = extractJsonFromResponse(content);
```

## What stays the same
- All frontend code (no UI changes)
- The system prompt, sanitization, CORS headers
- The n8n webhook integration
- The OpenAI API call configuration

## Expected outcome
The function will handle malformed JSON responses gracefully instead of crashing with a 500 error.
