

# Add "weeks" Label to Formula Display

## Change

In `src/components/audit/FormulaBreakdown.tsx`, line 50, update the core formula text from:

```
(Hours/wk x People x Adjusted Rate x 52) x Efficiency %
```

to:

```
(Hours/wk x People x Adjusted Rate x 52 weeks) x Efficiency %
```

## Computation Verification

The backend logic in the edge function is correct:
- `weeklyHours = hoursPerWeek * peopleInvolved` (line 89)
- `annualCost = weeklyHours * adjustedRate * 52` (line 91)
- `savings = savableWeeklyHours * adjustedRate * 52` (line 95)
- `annualHoursSaved = savableWeeklyHours * 52` (line 94)

The 52 correctly converts weekly figures to annual. No computation changes needed -- just the label fix.

## File Modified
- `src/components/audit/FormulaBreakdown.tsx` -- single text change on line 50
