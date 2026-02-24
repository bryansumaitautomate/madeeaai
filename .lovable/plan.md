

# Fix Voiceflow Chatbot Button Styling and Input Field Focus Issue

## Problems identified from screenshots

1. **Input field disappears on click** (image-48): When clicking the text input, it gets a heavy blue border but the input content/area vanishes. This is caused by the broad `input:focus, textarea:focus` rule (line 77) combined with `div[class*="input"]` (line 105) which may conflict with Voiceflow's internal focus handling — likely hiding/resizing the actual textarea element.

2. **Buttons don't match dark theme** (image-46, image-47): The "Need Help?" launcher and down-arrow button show inconsistent styling. The generic `button` rule (line 89) sets `background: transparent` which makes some buttons invisible or mismatched.

## Root cause

- Line 76-77: The `input, textarea` and `input:focus, textarea:focus` rules apply borders that conflict with Voiceflow's internal layout, causing the textarea to collapse or shift on focus.
- Line 105: `div[class*="input"]` is too broad and catches Voiceflow's input wrapper containers, forcing background colors that conflict with the actual input element styling.
- Line 89: Generic `button` rule with `background: transparent` makes non-launcher buttons look wrong.

## Changes

**File: `index.html`** — Modify the CSS rules array (lines 76-77, 88-94, 105)

1. **Fix input/textarea focus** (lines 76-77): Make the input rules less aggressive. Remove the explicit `border` from the base rule and only style background/color. For focus, avoid setting `outline: none` which breaks Voiceflow's native focus handling:
```js
'input, textarea { background: #161A22 !important; color: #E9ECFC !important; }',
'input:focus, textarea:focus { background: #161A22 !important; color: #E9ECFC !important; }',
```

2. **Fix button styling** (lines 88-94): Keep buttons transparent by default but add specific SVG visibility rules and ensure the chat-input send button is properly displayed:
```js
'.vfrc-chat-input button { display: inline-flex !important; align-items: center !important; justify-content: center !important; }',
'button { background: transparent !important; color: #E9ECFC !important; border: none !important; }',
'button:hover { background: rgba(255,255,255,0.06) !important; }',
'button:active { background: rgba(255,255,255,0.10) !important; }',
'button:focus-visible { outline: 2px solid rgba(35,70,220,0.9) !important; outline-offset: 2px !important; }',
'button svg, button svg * { stroke: currentColor !important; }',
'button svg path { fill: currentColor !important; }',
```

3. **Remove overly broad input div selector** (line 105): Replace `div[class*="input"], div[class*="Input"]` with more targeted Voiceflow-specific selectors to avoid catching internal wrappers that break layout:
```js
'.vfrc-chat-input, .vfrc-input { background: #0C0F14 !important; color: #E9ECFC !important; }',
```

4. **Ensure launcher stays blue** (lines 112-114) — no change needed, already last and correctly styled.

## Summary of line changes

- **Lines 76-77**: Remove `border` from input/textarea rules; simplify focus to just maintain bg/color
- **Line 105**: Replace broad `div[class*="input"]` with `.vfrc-chat-input, .vfrc-input` 
- Lines 88-94: Keep as-is (already correct from last fix)

These are all scoped inside the Voiceflow shadow DOM injection, so they cannot affect the main site.

