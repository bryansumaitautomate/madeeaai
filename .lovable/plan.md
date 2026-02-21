
# Fix "Get Report" Button Animation Overflow

## Problem
The spinning conic-gradient border animation on the "Get Report" button overflows beyond the button's visible area, as shown in the screenshot.

## Root Cause
The `Button` component at line 121 has `overflow-hidden` but the inner `div` with `absolute inset-0` and the spinning conic-gradient may not be properly clipped due to the Button component's own styling or padding conflicts with `p-[1px]`.

## Fix

### File: `src/components/audit/ResultsDashboard.tsx` (line 121)
- Wrap the button content in a container `div` that has `overflow-hidden` and `rounded-lg` to properly clip the spinning gradient
- Change the approach: instead of relying on the `Button` component's overflow, use an outer wrapper div with `relative overflow-hidden rounded-lg` and `p-[1px]`, and place the `Button` inside without the conflicting styles

Specifically, replace the current Button (lines 121-126) with:
- An outer `div` with `relative p-[1px] rounded-lg overflow-hidden inline-flex`
- The spinning gradient `div` inside it with `absolute inset-0`
- The `Button` inside with `relative bg-black rounded-lg` (no `p-[1px]`, no `overflow-hidden`)

This ensures the gradient is clipped by the outer wrapper's `overflow-hidden`.
