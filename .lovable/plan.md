

# Fix the Audit Analyzer Edge Function

## Problem
The audit analysis fails with a 404 error because:
- The function calls a non-existent internal endpoint (`/functions/v1/ai`)
- The function is not registered in the backend config

## Changes

### 1. Register the function in `supabase/config.toml`
Add the function entry so it deploys correctly and allows public access (needed since the audit wizard doesn't require login):

```text
[functions.analyze-audit]
verify_jwt = false
```

### 2. Fix the AI call in `supabase/functions/analyze-audit/index.ts`
Replace lines 112-133 to call OpenAI directly using the existing `OPENAI_API_KEY` secret:

- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Auth**: `Bearer ${OPENAI_API_KEY}`
- **Model**: `gpt-4o` (OpenAI's best model for structured JSON output)
- **Validate** the API key exists before proceeding

### 3. Add n8n webhook call (send results)
After a successful analysis, POST the results to your n8n webhook at `https://madeeas.app.n8n.cloud/webhook/madeea-com`. This runs in the background -- if the webhook fails, the user still sees their results.

### 4. Deploy and test
Deploy the updated function and verify the audit flow works end-to-end.

## What stays the same
- All frontend code (no UI changes)
- The system prompt and persona
- Input sanitization logic
- JSON parsing and error handling

## Technical Summary

| Item | Before (broken) | After (fixed) |
|---|---|---|
| Config | Not registered | `verify_jwt = false` |
| AI endpoint | `${supabaseUrl}/functions/v1/ai` (404) | `https://api.openai.com/v1/chat/completions` |
| API key | Service role key (wrong usage) | `OPENAI_API_KEY` secret |
| Model | `openai/gpt-5` (via broken proxy) | `gpt-4o` |
| Webhook | None | POST results to n8n |
