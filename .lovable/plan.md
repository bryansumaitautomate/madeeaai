

# Fix "Get Report" Button: Spinning Border + Content-Wrapped + Centered

## Problem
1. The spinning border animation is not visually spinning
2. The button stretches to fill the parent (full width) instead of wrapping its content
3. The button is not centered

## Fix

### File: `src/components/audit/ResultsDashboard.tsx` (line 121)

Update the `Button` classes:
- Remove `inline-flex` (which still stretches inside the form's flex column)
- Add `w-auto self-center` so it wraps content and centers within the flex-column form
- Ensure `animate-[spin_3s_linear_infinite]` is present on the gradient span (it already is, but confirm it's not being overridden by the Button component's default styles)

Specifically change line 121 from:
```
className="group relative p-[1px] inline-flex items-center justify-center overflow-hidden rounded-lg border-0 bg-transparent hover:bg-transparent h-auto"
```
to:
```
className="group relative p-[1px] w-auto self-center overflow-hidden rounded-lg border-0 bg-transparent hover:bg-transparent h-auto"
```

This makes the button wrap its content and center itself in the form's flex column layout, while the spinning gradient border remains animated.
