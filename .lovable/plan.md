
# Fix Formula Breakdown Overlapping ROI/Hours Badges

## Problem
On desktop, the "Reclaimable Revenue" and the ROI/Hours Saved badges sit side-by-side in a flex row. The `FormulaBreakdown` component is nested inside the left column, so when expanded it pushes content and overlaps with the right-side badges.

## Fix
Move the `FormulaBreakdown` component **below** the flex row so it spans the full width of the card, preventing any overlap with the badges.

### File: `src/components/audit/ResultsDashboard.tsx`

**Desktop layout (line 194):** Remove `FormulaBreakdown` from inside the left `<div>` of the flex row, and place it after the closing `</div>` of the flex row (after line 200), so it sits below both the revenue figure and the badges.

**Mobile layout (line 206):** Keep as-is since it already works in a stacked layout.

This is a 2-line move -- no new components or logic changes needed.
