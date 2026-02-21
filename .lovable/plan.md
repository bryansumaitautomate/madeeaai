

# Fix "Get Report" Button Gradient Overflow

## Problem
The spinning conic-gradient background on the "Get Report" button overflows beyond the button border, appearing as a visible background bleed.

## Root Cause
The spinning gradient `div` with `absolute inset-0` can overflow rounded corners during GPU-accelerated rotation. The `overflow-hidden` on the wrapper doesn't reliably clip spinning elements in all browsers.

## Fix

### File: `src/components/audit/ResultsDashboard.tsx` (lines 121-126)

Replace the current wrapper+gradient+Button structure with the same proven pattern used in `MadeeaCTA.tsx`:

- Remove the outer wrapper `div`
- Move the spinning gradient **inside** the `Button` itself
- Use `inset-[-1000%]` on the gradient (instead of `inset-0`) so the gradient is oversized and covers evenly during spin
- Add `overflow-hidden` and `relative` directly on the `Button`
- Keep an inner `span` with `bg-black` and `rounded-[7px]` to mask the center, leaving only a 1px animated border visible

This mirrors how `MadeeaCTA` handles the same effect without any overflow issues.
