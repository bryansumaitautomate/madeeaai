

# Fix Voiceflow Widget: Dual-Strategy Approach

## Problem Analysis

The `assistant.stylesheet` data-URL approach we implemented is the documented method, but it appears to not be reliably applying with the **new** Voiceflow widget (`widget-next/bundle.mjs`). The docs examples use `widget/bundle.mjs` (old widget). The new AI-native webchat (released Jan 2025) may handle stylesheet injection differently.

Evidence from screenshots:
- Launcher button ("Need Help?") still has default white/light styling, not the Ion Blue gradient we specified
- Input field collapses/disappears on focus
- Typed text appears dark (invisible against dark background)

## Root Cause

The `assistant.stylesheet` data-URL may not be loaded by `widget-next/bundle.mjs` at all, or it loads but gets overridden by the widget's own higher-specificity styles. We need a **dual strategy**: keep the official method AND add a carefully-scoped Shadow DOM injection as backup.

## Implementation Plan

### File: `index.html` (complete rewrite of the Voiceflow script block, lines 31-125)

**Strategy: Two layers of CSS application**

1. **Layer 1** — Keep `assistant.stylesheet` with the data URL (official documented method). This may work on some versions of the widget.

2. **Layer 2** — Add a Shadow DOM injection function that:
   - Finds the widget's shadow root
   - Injects a `<style>` tag with an `id` (so it can be updated in place, not duplicated)
   - Uses a `MutationObserver` (not `setInterval`) to detect when the widget mounts/remounts
   - Only targets `.vfrc-*` documented classes — **NO** generic `button`, `input`, `textarea` selectors

### CSS Rules (used in both layers)

All rules use `!important` for specificity against widget defaults.

**Launcher:**
```css
.vfrc-launcher {
  background: linear-gradient(135deg, #3b82f6, #2346DC) !important;
  border: 1px solid rgba(59,130,246,0.3) !important;
  box-shadow: 0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(35,70,220,0.2) !important;
  color: #fff !important;
}
```

**Chat background:**
```css
.vfrc-chat, .vfrc-chat--dialog {
  background: #0C0F14 !important;
  color: #E9ECFC !important;
}
```

**Input area — CRITICAL: only color changes, no layout/border/outline overrides:**
```css
.vfrc-input {
  background: #161A22 !important;
  color: #E9ECFC !important;
}
.vfrc-input textarea,
.vfrc-input input {
  background: transparent !important;
  color: #E9ECFC !important;
  caret-color: #E9ECFC !important;
}
```
No `border: none`, no `outline: none`, no `*:focus` wildcards — these are what keep breaking the input.

**Send button:**
```css
.vfrc-chat-input--button {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #E9ECFC !important;
}
.vfrc-chat-input--button svg {
  stroke: currentColor !important;
}
```

**Footer:**
```css
.vf-footer {
  background: #0C0F14 !important;
  border-top: 1px solid rgba(255,255,255,0.06) !important;
}
```

**Messages, cards, chips, header, scroll button** — same rules as current, all using `.vfrc-*` classes only.

### Shadow DOM Injection Method

```js
function injectVfStyles() {
  var host = document.getElementById('voiceflow-chat');
  if (!host || !host.shadowRoot) return;
  var sr = host.shadowRoot;
  var existing = sr.getElementById('madeea-vf-theme');
  if (existing) return; // already injected
  var style = document.createElement('style');
  style.id = 'madeea-vf-theme';
  style.textContent = vfCss;
  sr.appendChild(style);
}

// Use MutationObserver to detect widget mount
var observer = new MutationObserver(function() {
  injectVfStyles();
});
observer.observe(document.body, { childList: true, subtree: true });
// Also try immediately and after a delay
setTimeout(injectVfStyles, 1000);
setTimeout(injectVfStyles, 3000);
```

This is more reliable than `setInterval` — it triggers only when DOM changes, checks for existing style tag (no duplicates), and uses the `id` attribute so it can be verified/replaced.

### Key Differences from Previous Attempts

1. **No generic selectors** — never `button { ... }`, `input { ... }`, `textarea { ... }`, or `* { ... }`
2. **No focus overrides** — never `.vfrc-chat-input *:focus { ... }` or `input:focus { outline: none }` which collapse the input
3. **No layout changes** — never `border: none`, `box-sizing`, or `height`/`width` on input elements
4. **Dual delivery** — both `assistant.stylesheet` and Shadow DOM injection, so at least one works
5. **MutationObserver** instead of `setInterval` — cleaner, no polling, reacts to widget mount/remount
6. **Idempotent injection** — checks for existing `#madeea-vf-theme` style tag before adding

## Technical Details

- Widget script: `https://cdn.voiceflow.com/widget-next/bundle.mjs` (new AI-native webchat)
- The widget creates a `#voiceflow-chat` element with a Shadow DOM
- CSS classes documented at: `https://github.com/voiceflow/react-chat/blob/master/packages/react-chat/src/styles.css`
- Official docs confirm `assistant.stylesheet` accepts both URLs and data URIs

