
# Add Vertical Grid Lines to AI Hub Hero

## Change

Add the same 4-column vertical grid lines from the homepage's `AuraBackground` component to the AI Hub hero section. These are subtle `border-white/5` vertical dividers that create a refined grid overlay, hidden on mobile for performance.

## Technical Details

### File: `src/components/ai-hub/AutomationHero.tsx`

Add the following block inside the `<section>` element (after the gradient orb div, before the container):

```tsx
{/* 4-column vertical grid lines - matching homepage */}
<div className="absolute inset-0 hidden sm:flex pointer-events-none">
  <div className="flex-1 border-r border-white/5" />
  <div className="flex-1 border-r border-white/5" />
  <div className="flex-1 border-r border-white/5" />
  <div className="flex-1" />
</div>
```

This is the exact same pattern used in `AuraBackground.tsx` (lines 18-23), with `pointer-events-none` added so the lines don't interfere with the search input or other interactive elements.

No other files need changes.
