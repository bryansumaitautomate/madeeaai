

# Smooth Spinning Border on "Get Report" Button

## Problem
The spinning border animation feels "snappy" because the conic gradient has a visible seam. The gradient goes `#3b82f6 -> #60a5fa -> #3b82f6`, creating a hard transition point where the start and end colors meet. Each time the rotation completes a full 360-degree cycle, this seam snaps past, making it look jarring instead of smooth.

## Solution
Spread the gradient across more stops so the color transition is gradual across the full circle, eliminating the visible seam. Also slow down the spin slightly for a more elegant feel.

### File: `src/components/audit/ResultsDashboard.tsx` (line 122)

Update the gradient on the spinning div from:
```
conic-gradient(from 0deg, #3b82f6, #60a5fa, #3b82f6)
```
to a multi-stop gradient with smoother transitions:
```
conic-gradient(from 0deg, #3b82f6 0%, #60a5fa 25%, #93c5fd 50%, #60a5fa 75%, #3b82f6 100%)
```

And change the animation speed from `3s` to `4s` for a calmer, more premium feel:
```
animate-[spin_4s_linear_infinite]
```

This ensures there's no hard color jump at any point during the rotation, making the spin feel continuous and seamless.
