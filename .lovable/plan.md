

## Problem

The Voiceflow chat input field shows a bright blue focus ring when clicked. This is caused by the `primaryColor: '#2346DC'` setting in `render.theme`, which Voiceflow uses as a CSS variable internally to style focus states (border/box-shadow) on the `.vfrc-input` wrapper. Our CSS overrides using `!important` are not winning against Voiceflow's internal styling.

## Root cause

Looking at the screenshot, the blue ring appears on the `.vfrc-input` container (the wrapper div around the textarea), not on the textarea itself. Voiceflow applies `box-shadow` and/or `border-color` using the `primaryColor` variable on `:focus-within`. Our current CSS targets `.vfrc-input:focus-within` but the specificity or application order is losing.

## Plan

### Only change: Isolate and fix the input field styling in `index.html`

No other components will be touched. Only the CSS rules related to the input field (lines 58-66 in `index.html`) will be modified.

**Specific changes:**

1. **Add ultra-high specificity selectors** for the input wrapper focus state. Instead of just `.vfrc-input:focus-within`, use repeated class selectors for higher specificity: `.vfrc-input.vfrc-input:focus-within` and target the `box-shadow` and `border-color` properties.

2. **Add wildcard focus override** scoped only to the footer/input area: `.vf-footer *:focus-within, .vfrc-footer *:focus-within` to catch any element that receives the blue focus styling.

3. **Replace the input CSS lines (58-66)** with these rules:

```css
/* Input wrapper - normal state */
.vfrc-input,
.vfrc-input.vfrc-input {
  background: #161A22 !important;
  background-color: #161A22 !important;
  color: #E9ECFC !important;
  -webkit-text-fill-color: #E9ECFC !important;
  caret-color: #E9ECFC !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
  border-radius: 8px !important;
  outline: none !important;
  box-shadow: none !important;
}

/* Input wrapper - ALL focus states (the blue ring killer) */
.vfrc-input:focus,
.vfrc-input:focus-within,
.vfrc-input:focus-visible,
.vfrc-input.vfrc-input:focus,
.vfrc-input.vfrc-input:focus-within,
.vfrc-input.vfrc-input:focus-visible,
.vfrc-input:has(:focus),
.vfrc-input:has(textarea:focus) {
  outline: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(255,255,255,0.2) !important;
  border-color: rgba(255,255,255,0.2) !important;
}

/* Everything inside input - no focus styles */
.vfrc-input *,
.vfrc-input *:focus,
.vfrc-input *:focus-within,
.vfrc-input *:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

/* Textarea and input elements inside */
.vfrc-input textarea,
.vfrc-input input {
  background: transparent !important;
  background-color: transparent !important;
  color: #E9ECFC !important;
  -webkit-text-fill-color: #E9ECFC !important;
  caret-color: #E9ECFC !important;
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

.vfrc-input textarea:focus,
.vfrc-input input:focus,
.vfrc-input textarea:focus-visible,
.vfrc-input input:focus-visible {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

.vfrc-input textarea::placeholder,
.vfrc-input input::placeholder {
  color: #64748B !important;
  -webkit-text-fill-color: #64748B !important;
}
```

4. **Override the CSS custom property** that Voiceflow uses for the primary color inside the input scope:

```css
.vfrc-input {
  --vf-primary: rgba(255,255,255,0.12) !important;
  --vfrc-primary: rgba(255,255,255,0.12) !important;
}
```

5. **Keep the existing global `textarea,input` rules** (lines 64-66) but those are a fallback only.

### File changed

- `index.html` — lines 58-66 only (the input-specific CSS rules in the `css` array)

### What will NOT change

- All other Voiceflow CSS rules (chat backgrounds, bubbles, buttons, launcher, etc.)
- No React components
- No other files

