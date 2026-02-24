

# Fix Voiceflow Chatbot Color Issues on Interaction

## Problem
After clicking elements in the Voiceflow chatbot, certain interactive states (hover, active, focus) and transitional elements still flash white or show incorrect colors. The broad CSS selectors we've been adding incrementally have created conflicts — some rules override each other, and interactive states aren't covered.

## Root Cause
The current CSS injection has grown organically with many overlapping and sometimes contradictory rules. The `button` override (line 119) forces all buttons to `#161A22`, but the launcher needs `#2346DC`. The broad `div[class*="content"]` selector (line 122) may be catching containers that should be transparent. Focus/active states aren't styled at all.

## Change

**File: `index.html`** (lines 58-128 — full replacement of the CSS rules array)

Replace the entire CSS rules array with a clean, organized, non-conflicting set that covers:

1. **Base & host variables** — `:host` and `*` defaults
2. **Main containers** — `.vfrc-chat`, `.vfrc-chat--dialog`, header, footer
3. **Messages** — system responses, user responses, bubbles
4. **Input area** — textarea, input, placeholder, focus states
5. **Cards & carousels** — `.vfrc-card`, action buttons
6. **Buttons & chips** — all interactive elements with hover/active/focus states
7. **Loading/typing indicators** — transparent backgrounds
8. **Typography** — all text elements forced to `#E9ECFC`
9. **Launcher** — explicitly re-set to blue at the end (highest specificity)

Key fixes:
- Add `button:focus`, `button:active`, `textarea:focus`, `input:focus` rules
- Add `*:focus-visible { outline-color: #2346DC !important; }`
- Remove conflicting broad selectors like `div[class*="content"]` and `div[class*="body"]` that may catch unintended elements
- Add `.vfrc-message--request, .vfrc-user-response .vfrc-bubble { background: #2346DC !important; color: #fff !important; }` with higher specificity
- Ensure `button.vfrc-launcher` uses class-specific selector to beat the generic `button` rule

```js
style.textContent = [
  // 1. Base
  ':host { --vf-primary: #2346DC !important; }',
  '* { color: #E9ECFC; box-sizing: border-box; }',
  
  // 2. Main containers
  '.vfrc-chat, .vfrc-chat--dialog { background: #0C0F14 !important; color: #E9ECFC !important; }',
  '.vfrc-header { background: #0C0F14 !important; border-bottom: 1px solid rgba(35,70,220,0.2) !important; }',
  '.vfrc-header--title { color: #fff !important; }',
  '.vfrc-header--subtitle { color: #94A3B8 !important; }',
  '.vfrc-footer { background: #0C0F14 !important; border-top: 1px solid rgba(35,70,220,0.15) !important; }',
  '.vfrc-chat-input { background: #0C0F14 !important; }',
  '.vfrc-assistant-info { background: #0C0F14 !important; }',
  '.vfrc-assistant-info--title { color: #fff !important; }',
  '.vfrc-assistant-info--description { color: #94A3B8 !important; }',
  
  // 3. Messages & bubbles
  '.vfrc-message { background: transparent !important; }',
  '.vfrc-system-response { background: transparent !important; }',
  '.vfrc-bubble { background: #161A22 !important; color: #E9ECFC !important; }',
  '.vfrc-message--response, .vfrc-system-response .vfrc-bubble { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(255,255,255,0.06) !important; border-radius: 12px !important; }',
  '.vfrc-message--request, .vfrc-user-response .vfrc-bubble { background: #2346DC !important; color: #fff !important; }',
  '.vfrc-system-response .vfrc-message { color: #E9ECFC !important; }',
  
  // 4. Input area
  'input, textarea { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(255,255,255,0.1) !important; }',
  'input:focus, textarea:focus { border-color: rgba(35,70,220,0.5) !important; outline: none !important; }',
  '::placeholder { color: #64748B !important; }',
  '.vfrc-footer input, .vfrc-input textarea, .vfrc-chat-input textarea { background: #161A22 !important; color: #E9ECFC !important; }',
  
  // 5. Cards & carousels
  '.vfrc-card { background: #161A22 !important; border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 12px !important; overflow: hidden !important; }',
  '.vfrc-card--title, .vfrc-card--description { color: #E9ECFC !important; }',
  '.vfrc-card--image { border-bottom: 1px solid rgba(255,255,255,0.06) !important; }',
  '.vfrc-card--action, .vfrc-card--button { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(35,70,220,0.3) !important; }',
  '.vfrc-card--action:hover, .vfrc-card--button:hover { background: #1e2430 !important; border-color: rgba(35,70,220,0.6) !important; }',
  '.vfrc-carousel { background: transparent !important; }',
  
  // 6. Buttons & chips
  '.vfrc-button, .vfrc-chip { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(35,70,220,0.3) !important; }',
  '.vfrc-button:hover, .vfrc-chip:hover { background: #1e2430 !important; border-color: rgba(35,70,220,0.6) !important; }',
  'button { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(255,255,255,0.1) !important; }',
  'button:hover { background: #1e2430 !important; }',
  'button:focus, button:active { background: #1e2430 !important; outline: none !important; }',
  '*:focus-visible { outline-color: #2346DC !important; }',
  
  // 7. Loading/typing
  '.vfrc-loading, .vfrc-typing { background: transparent !important; }',
  '.vfrc-typing-indicator { background: #161A22 !important; }',
  
  // 8. Typography
  'p, span, h1, h2, h3, h4, h5, h6, label { color: #E9ECFC !important; }',
  'a { color: #5B8DEF !important; }',
  'img { border-radius: 8px !important; }',
  
  // 9. Broad fallbacks (case-insensitive class matching)
  'div[class*="chat"], div[class*="Chat"], div[class*="dialog"], div[class*="Dialog"] { background: #0C0F14 !important; }',
  'div[class*="footer"], div[class*="Footer"] { background: #0C0F14 !important; }',
  'div[class*="message"], div[class*="Message"] { background: transparent !important; }',
  'div[class*="response"], div[class*="Response"] { background: transparent !important; }',
  'div[class*="input"], div[class*="Input"] { background: #161A22 !important; color: #E9ECFC !important; }',
  'div[class*="loading"], div[class*="Loading"], div[class*="typing"], div[class*="Typing"] { background: transparent !important; }',
  'div[class*="indicator"], div[class*="Indicator"] { background: #161A22 !important; }',
  'div[class*="card"], div[class*="Card"] { background: #161A22 !important; color: #E9ECFC !important; border-color: rgba(255,255,255,0.08) !important; }',
  'div[class*="carousel"], div[class*="Carousel"] { background: transparent !important; }',
  'div[class*="container"], div[class*="Container"], div[class*="wrapper"], div[class*="Wrapper"] { background: transparent !important; }',
  'div[class*="actions"], div[class*="Actions"] { background: transparent !important; }',
  
  // 10. Launcher — MUST be last to override generic button rule
  '.vfrc-launcher { background: #2346DC !important; border: none !important; box-shadow: 0 0 24px rgba(35,70,220,0.5) !important; }',
  '.vfrc-launcher:hover { background: #1a38b8 !important; }',
  '.vfrc-launcher:focus, .vfrc-launcher:active { background: #2346DC !important; }'
].join('\n');
```

This is a full clean replacement of lines 58-128 — organized, deduplicated, and with all interactive states (hover, focus, active) covered. The removed broad selectors (`div[class*="content"]`, `div[class*="body"]`, `div[class*="status"]`, `div[class*="busy"]`) were causing unintended side effects without adding value.

