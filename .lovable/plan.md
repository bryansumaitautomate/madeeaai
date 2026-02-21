
# Remove "(Optional)" Labels from Audit Forms

## What Changes
Remove the two `(Optional)` label annotations in `src/components/audit/CompanyInfoStep.tsx`:

1. **Line 114** — "Current Tech Stack" label: remove `<span className="text-muted-foreground font-normal">(Optional)</span>`
2. **Line 128** — "Where did you hear about us?" label: remove `<span className="text-muted-foreground font-normal">(Optional)</span>`

These are the only two instances across all audit form components. No other files need changes.
