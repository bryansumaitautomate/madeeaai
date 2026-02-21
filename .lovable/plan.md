

# Italicize Blue Headline Text in Audit Hero

## What's Changing
On the main website, blue/primary text in headlines is always italicized (e.g., *"AI finds them."*). The audit hero page has a blue gradient headline -- "Start Automating Smarter." -- that is missing this italic treatment.

## The Change

### File: `src/components/audit/AuditHero.tsx`
- **Line 28**: Add `italic` to the blue gradient `<span>` so "Start Automating Smarter." renders in italic Instrument Serif, matching the main site's style.

This is a single class addition -- no other files or blue headline text need updating.
