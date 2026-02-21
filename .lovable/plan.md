
# Add Top Padding to Audit Wizard

## Problem
The progress bar at the top of the audit wizard is partially hidden behind the fixed navigation bar, as visible in the screenshot.

## Fix

### File: `src/components/audit/AuditWizard.tsx`
- **Line 97**: Change `py-16 sm:py-20` to `pt-28 sm:pt-32 pb-16 sm:pb-20` on the `<section>` element. This increases the top padding to clear the navbar while keeping the bottom padding unchanged.

Single-line change, no other files affected.
