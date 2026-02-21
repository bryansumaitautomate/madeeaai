

# Fix "Get Report" Button Spinning Border

## Problem
The spinning border animation on the "Get Report" button doesn't visually spin like the ROI/Hours Saved badges do. The `Button` component's default styles (from shadcn) conflict with the custom animation approach.

## Solution
Replace the `Button` component with a plain `button` element using the exact same pattern as `AnimatedBadge` (lines 40-47), which already works correctly in the same page:

### File: `src/components/audit/ResultsDashboard.tsx` (lines 121-126)

Replace the `Button` with a structure matching `AnimatedBadge`:

```tsx
<div className="relative p-[1px] rounded-full overflow-hidden w-auto self-center">
  <div className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, #3b82f6, #60a5fa, #3b82f6)' }} />
  <button type="submit" disabled={isSubmitting} className="relative bg-black px-6 py-2.5 rounded-full flex items-center justify-center gap-2 text-sm font-semibold text-white hover:bg-black/90 transition-all disabled:opacity-50">
    {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Get Report</>}
  </button>
</div>
```

Key changes:
- Use a plain `div` wrapper + native `button` instead of the shadcn `Button` component (avoids style conflicts)
- Use `absolute inset-0` with the gradient on a separate `div` (same as AnimatedBadge), not `inset-[-1000%]` on a `span`
- Use `rounded-full` to match the badge pill shape
- Button wraps content and centers via `w-auto self-center` on the wrapper
- Remove the `Button` import dependency for this specific usage
