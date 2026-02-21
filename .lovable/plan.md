

# Apply Main Website Font Styles to Audit Pages

## Overview
The main website follows a distinct typography system, but the audit pages use generic sans-serif styling throughout. This plan brings the audit pages in line with the main site's font hierarchy.

## Font System Reference (from main site)
- **Headlines**: `font-serif` (Instrument Serif) with tight tracking -- used on Hero h1, section titles
- **Data labels/metrics**: `font-mono` (Geist Mono) with uppercase tracking -- used for small technical labels like "AI Automation Partner", "ROI", "Hours Saved"
- **Body text**: `font-sans` (Geist) with `font-light` -- used for paragraphs and descriptions

## Changes

### 1. AuditHero.tsx
- **h1** (line 26): Change `font-black` to `font-serif font-normal tracking-tight` to match the main Hero's Instrument Serif style
- **Body paragraph** (line 33): Add `font-light` for consistency
- **Small labels** like "Instant Results", "Data-Driven" (line 43-52): Add `font-mono` and `uppercase tracking-wider`
- **Glass card labels** like "AI Analysis", "Cost Reduction" etc: Add `font-mono` where appropriate

### 2. CompanyInfoStep.tsx
- **Step heading** (line 76): Change `font-bold` to `font-serif font-normal tracking-tight` on the h2
- **Form labels**: Keep as `font-medium` (Geist Sans) -- this is correct for form UI

### 3. GoalsReadinessStep.tsx
- **Step heading**: Change to `font-serif font-normal tracking-tight`

### 4. DepartmentWorkflowStep.tsx
- **Step heading**: Change to `font-serif font-normal tracking-tight`

### 5. SummaryPreviewStep.tsx
- **Step heading**: Change to `font-serif font-normal tracking-tight`

### 6. ResultsDashboard.tsx
- **Main heading** "Your Efficiency Report is Ready." (line 185): Change `font-bold` to `font-serif font-normal tracking-tight`
- **Metric labels** like "Reclaimable Revenue", "ROI", "Hours Saved" (lines 193, 196-197, 204, 209-210): Add `font-mono uppercase tracking-wider`
- **Section label** "Top 3 Quick Wins" (line 215): Already has uppercase tracking -- add `font-mono`
- **CTA heading** "Ready to turn these projections into profit?" (line 227): Change to `font-serif font-normal tracking-tight`
- **Lead magnet heading** "Unlock Your 12-Month Strategic Roadmap" (line 110): Change to `font-serif font-normal tracking-tight`
- **Computation breakdown labels** like "Hourly Rate", "Total Hours/Year" etc: Add `font-mono`

### 7. ProcessingAnimation.tsx
- **Heading**: Change to `font-serif font-normal tracking-tight`
- **Status labels**: Add `font-mono`

### 8. ProgressBar.tsx
- **Step labels** (line 53): Add `font-mono` for the small step labels

## Files Modified
- `src/components/audit/AuditHero.tsx`
- `src/components/audit/CompanyInfoStep.tsx`
- `src/components/audit/GoalsReadinessStep.tsx`
- `src/components/audit/DepartmentWorkflowStep.tsx`
- `src/components/audit/SummaryPreviewStep.tsx`
- `src/components/audit/ResultsDashboard.tsx`
- `src/components/audit/ProcessingAnimation.tsx`
- `src/components/audit/ProgressBar.tsx`

No new dependencies or configuration changes needed -- all fonts are already loaded via Google Fonts in `index.html` and registered in `tailwind.config.ts`.
