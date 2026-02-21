

# Add Actual Backend Formula Breakdown Below Reclaimable Revenue

## Summary
Display the actual computation formula used by the backend directly below the Reclaimable Revenue figure. This will show users the real logic: variable efficiency rates based on process type, department multipliers on the hourly rate, and ROI ceiling tiers.

## What Users Will See

A collapsible formula box below the "Reclaimable Revenue" label (both desktop and mobile) showing:

1. **The Core Formula:**
   `For each process: (Hours/wk x People x Adjusted Rate x 52) x Efficiency %`

2. **Efficiency Rates** (based on process keywords):
   - High (55-65%): data entry, scheduling, invoicing, email, reporting...
   - Medium (40-50%): follow-up, onboarding, tracking, social media...
   - Low (20-30%): strategy, consulting, negotiation, design, creative...
   - Default: 40%

3. **Department Multipliers** (applied to hourly rate):
   - Executive/Strategy: 1.5x
   - Sales/Marketing/Finance: 1.2x
   - Operations/Admin/Support: 0.8x
   - Other: 1.0x

4. **Per-Process Table** (from `computation_breakdown` and `full_table` data already available):
   - Each process with its department, weekly hours, adjusted rate, efficiency %, and savings

5. **Totals**: Hourly rate used (user-provided vs industry default), total annual labor cost, weighted efficiency, and ROI calculation with ceiling cap.

## Technical Details

### File: `src/components/audit/ResultsDashboard.tsx`

- Create a new `FormulaBreakdown` component inside the file
- Insert it after the "Reclaimable Revenue" label in both desktop (after line 192) and mobile (after line 203) layouts
- It will be a collapsible section (similar to existing `ComputationBreakdownSection`) using a `ChevronDown` toggle
- Data sources already available via props:
  - `analysis.computation_breakdown` -- hourly rate, efficiency, annual hours, ROI calc
  - `analysis.full_table` -- per-process breakdown with department, hours, rate, savings
  - `analysis.dashboard` -- totals
- No new props, API calls, or dependencies needed -- everything is already passed to `ResultsDashboard`

### No backend changes needed
All the data (efficiency rates, department multipliers, per-process metrics) is already computed and sent from the backend in `computation_breakdown` and `full_table`.
