
## What I can and can’t do (no hallucinating)
- I **can** fix this reliably.
- The reason it’s “still the same” is **not** that the CSS is wrong—it’s that our overrides are **losing the CSS cascade order inside the widget’s Shadow DOM**. Voiceflow injects/updates its own styles after ours (or re-renders), so the blue/bright focus treatment wins again.
- The fix is to **isolate an input-only theme** and ensure it is **always the last `<style>` in the widget shadow root** (so it wins), without touching any other widget styling.

## What we’ll change (strictly input-field only)
Only `index.html`, and only:
1) Add a **second CSS string** containing **input-only** overrides (scoped to footer).
2) Update the existing Shadow DOM injection code to insert (and keep) that **input-only style tag last** via a small “upsert + re-append” routine + a `MutationObserver`.

No React components, no other site styles, no other Voiceflow widget parts.

---

## Why the input is “blending with the bg” when active
In the screenshot, the focus state is applying a **strong outline/glow ring** (blue) and the input border/background contrast is not controlled by our winning rules. Once our rules actually win, we’ll:
- Keep the input background `#161A22` (slightly lighter than the footer)
- Use a clearer focus border (light grey) + subtle inner highlight (not blue, not glowing)

---

## Design: “Input-only theme” rules (scoped + high-specificity)
We’ll create a new `inputCss` string containing ONLY rules for the footer input.

Key properties:
- Scope to footer only: `.vf-footer ...` and `.vfrc-footer ...`
- Target the likely wrappers Voiceflow uses: `.vfrc-input`, `.vfrc-chat-input`, `.vfrc-chat-input--textarea`
- Kill any ring coming from pseudo-elements: `::before` / `::after`
- Override Voiceflow’s “primary” variables **only within the footer**, so the rest of the widget can still use your brand blue

Proposed CSS (input-only; example—final selectors kept narrow to footer):

```css
/* ===== Input-only theme (FOOTER SCOPED) ===== */

/* 1) Neutralize Voiceflow primary vars ONLY in the footer/input scope */
.vf-footer,
.vfrc-footer {
  --vf-primary: rgba(255,255,255,0.22) !important;
  --vfrc-primary: rgba(255,255,255,0.22) !important;
}

/* 2) Base input wrapper styling */
.vf-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea),
.vfrc-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea) {
  background: #161A22 !important;
  background-color: #161A22 !important;
  border: 1px solid rgba(255,255,255,0.18) !important;
  border-radius: 9999px !important;
  outline: none !important;
  box-shadow: none !important; /* start from true none */
  filter: none !important;
}

/* 3) Focus state: clearer separation without glow */
.vf-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea):focus,
.vf-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea):focus-within,
.vf-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea):focus-visible,
.vfrc-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea):focus,
.vfrc-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea):focus-within,
.vfrc-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea):focus-visible {
  outline: none !important;
  border-color: rgba(255,255,255,0.38) !important;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10) !important; /* subtle inner highlight */
}

/* 4) Kill rings drawn by pseudo-elements (common culprit) */
.vf-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea)::before,
.vf-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea)::after,
.vfrc-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea)::before,
.vfrc-footer :is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea)::after {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
  filter: none !important;
}

/* 5) Textarea itself stays transparent, readable */
.vf-footer :is(textarea, input),
.vfrc-footer :is(textarea, input) {
  background: transparent !important;
  background-color: transparent !important;
  color: #E9ECFC !important;
  -webkit-text-fill-color: #E9ECFC !important;
  caret-color: #E9ECFC !important;
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* 6) Placeholder */
.vf-footer :is(textarea, input)::placeholder,
.vfrc-footer :is(textarea, input)::placeholder {
  color: rgba(148,163,184,0.9) !important;
  -webkit-text-fill-color: rgba(148,163,184,0.9) !important;
}
```

This keeps the input visually separated on focus without any bright glow.

---

## The actual “make it work” part: ensure input CSS wins (Shadow DOM ordering)
### Problem today
Even with `!important`, if Voiceflow re-injects style tags after we inject ours, their rules can still win due to later order.

### Solution
We will inject **two** style tags into the widget shadow root:
- `data-madeea-theme` (existing; leave as-is)
- `data-madeea-input-theme` (NEW; input-only)

And we will ensure `data-madeea-input-theme` is **always appended last**, including after re-renders, using:
- an “upsertStyle” helper that *re-appends the style node* (moving it to the end)
- a `MutationObserver` on the shadow root to re-append if Voiceflow adds styles later

Pseudo-implementation detail inside your existing `injectStyles()`:

```js
function upsertStyle(shadowRoot, key, cssText) {
  const attr = 'data-' + key;
  let style = shadowRoot.querySelector('style[' + attr + ']');
  if (!style) {
    style = document.createElement('style');
    style.setAttribute(attr, '1');
  }
  style.textContent = cssText;
  shadowRoot.appendChild(style); // critical: moves it to LAST
}

function ensureInputThemeLast(shadowRoot) {
  upsertStyle(shadowRoot, 'madeea-input-theme', inputCss);
}
```

Then:
- call `ensureInputThemeLast(el.shadowRoot)` inside the existing interval injection
- attach a MutationObserver once (guarded) that calls `ensureInputThemeLast()` whenever shadow DOM children change

This is the missing lever that makes the override stick.

---

## Step-by-step implementation plan (single file: `index.html`)
1. **Do not touch any non-input CSS rules** in your existing `css` array.
2. Add a new variable `inputCss` (string) containing only the footer/input overrides shown above.
3. Extend the existing `injectStyles()` function to:
   - keep the current behavior for `data-madeea-theme` (your existing full theme CSS)
   - add `upsertStyle(..., 'madeea-input-theme', inputCss)` and ensure it is appended **after** the main style tag
4. Add a `MutationObserver` on `el.shadowRoot` (stored on the element, e.g. `el.__madeeaObserver`) to re-append the input style as the last style whenever the widget mutates.
5. Test in preview:
   - Open widget → click input → confirm focus border is clear light-grey, no blue glow
   - Type + send message
   - Close & reopen widget
   - Hard refresh and repeat (verifies persistence)

---

## Acceptance criteria (what you should see)
- Input background remains `#161A22` (dark) at all times
- On focus, input has a **clear but subtle** border (light grey) and **no blue ring/glow**
- No other widget components change appearance (messages, buttons, header, etc.)

---

## Notes / risks
- If Voiceflow ever changes class names, our fallback `:is(.vfrc-input, .vfrc-chat-input, .vfrc-chat-input--textarea)` within `.vf-footer` should still cover most variants.
- The MutationObserver approach is the most robust fix across updates because it enforces cascade order rather than guessing new selectors.

