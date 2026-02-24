
## Goal
Fix Voiceflow web chat so:
- “Need Help?” launcher + the down/scroll button match the site’s dark theme (Ignito Black / Carbon Steel + Ion Blue glow).
- The message input **does not disappear** when focused/clicked.
- Styling changes apply **only to the Voiceflow widget** and do not affect the rest of the website.
- Changes reliably **reflect** on the website (no more “it didn’t update”).

---

## What’s happening (why it keeps breaking)
### 1) Our current approach is fighting the widget
Right now `index.html` injects a `<style>` tag directly into the widget’s **Shadow DOM**, and the CSS includes **generic selectors** like:
- `button { ... }`
- `input, textarea { ... }`
- `.vfrc-chat-input *:focus { outline: none; border: none; ... }`

Even though it’s “inside the widget”, these broad rules can unintentionally override internal widget layout/styles that Voiceflow relies on—this is a common cause of:
- send icon disappearing
- input collapsing/vanishing on focus
- controls looking inconsistent (because multiple button types share `button`)

### 2) Changes not reflecting
The current script:
- appends a new `<style>` each time it runs (no stable `id` / no update-in-place)
- stops retrying as soon as *any* style exists
- can miss re-renders/re-mounts of the widget subtree

So you can end up with stale CSS or duplicated rules.

### 3) Voiceflow’s documented method exists (and we should use it)
Voiceflow’s docs explicitly recommend providing CSS overrides via:
- `assistant.stylesheet` (hosted file), or
- embedded CSS (data URL)

This is more reliable than manual Shadow DOM injection.

Source: Voiceflow “Advanced styling” docs (the `.vfrc-*` class list + `assistant.stylesheet` approach).

---

## Approved direction (what we’ll change)
We will **replace the Shadow DOM injection approach** with **Voiceflow’s official CSS override mechanism**:

1) Build a dedicated Voiceflow CSS string that only targets `.voiceflow-chat` / `.vfrc-*` classes (documented).
2) Pass it to the widget using `assistant: { stylesheet: "data:text/css..." }` so Voiceflow loads it properly.
3) Remove (or fully disable) the existing `injectDarkTheme()` function + `setInterval` shadow injection block to avoid conflicting styles.
4) Tighten selectors so we **never style raw `button`, `input`, `textarea` globally** inside the widget—only Voiceflow classes like:
   - `.vfrc-launcher`
   - `.vfrc-button`
   - `.vfrc-chat-input--button` (send button per docs)
   - `.vfrc-input` (input wrapper per docs)
   - `.vf-footer` (footer wrapper per docs)

For the “down button” (scroll-to-bottom) which isn’t listed in the abbreviated class list, we’ll style it using a **safe, widget-scoped attribute selector**:
- `.voiceflow-chat button[aria-label="scroll"] { ... }`
This won’t touch site buttons because it’s scoped to `.voiceflow-chat`.

---

## Implementation plan (exact steps)

### Step 1 — Rewrite Voiceflow config in `index.html` to use `assistant.stylesheet`
**File:** `index.html`

- Create a `const vfCss = `...`` string containing all overrides.
- Create a data URL:
  ```js
  var vfCssUrl = 'data:text/css;charset=utf-8,' + encodeURIComponent(vfCss);
  ```
- Update `window.voiceflow.chat.load({ ... })` to include:
  ```js
  assistant: {
    stylesheet: vfCssUrl
  }
  ```
  (Keeping your existing `verify/url/versionID` etc.)

**Why:** this is the official documented override path; it should apply consistently and survive widget updates better.

---

### Step 2 — Remove the current Shadow DOM injection block
**File:** `index.html`

Delete or disable:
- `injectDarkTheme()` function
- `setInterval` retry loop
- the entire `style.textContent = [...]` array

**Why:** leaving both systems in place will cause “random” overrides and make the widget unstable again.

---

### Step 3 — Build a safe Voiceflow-only CSS override (no generic selectors)
We’ll implement CSS that matches your site palette without breaking layout:

#### 3.1 Theme variables (easy iteration)
```css
.voiceflow-chat {
  --vf-bg: #0C0F14;
  --vf-surface: #161A22;
  --vf-surface-2: #1e2430;
  --vf-text: #E9ECFC;
  --vf-muted: #94A3B8;
  --vf-primary: #3b82f6; /* Ion Blue */
  --vf-primary-2: #2346DC; /* your current VF primary */
}
```

#### 3.2 Launcher (“Need Help?”) — match site CTA glow
Target documented class:
- `.vfrc-launcher`

We’ll set:
- pill radius
- Ion Blue gradient
- subtle border
- glow shadow
- ensure text/icon are white and centered

#### 3.3 Down/scroll button — match the launcher
Target safely:
- `.voiceflow-chat button[aria-label="scroll"]`

We’ll set:
- circular size
- background to primary
- hover/active states
- icon color enforcement via `svg { stroke: currentColor }`

#### 3.4 Input field disappearing — fix by *not* overriding internal input mechanics
Instead of styling `input, textarea`, we’ll style:
- `.vfrc-input` (wrapper)
- `.vfrc-input textarea` (or the specific internal element)
- `.vf-footer`

Key rules:
- Don’t set `border: none !important` globally.
- Don’t set `.vfrc-chat-input *:focus { ... }` (this can break layout).
- Keep padding/height intact; only adjust colors, border color, and a subtle focus ring.

Example approach:
```css
.vf-footer { background: var(--vf-bg); border-top: 1px solid rgba(255,255,255,0.06); }
.vfrc-input { background: var(--vf-surface); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; }
.vfrc-input textarea {
  background: transparent;
  color: var(--vf-text);
  caret-color: var(--vf-text);
}
.vfrc-input textarea:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.35);
  border-radius: 12px;
}
```

#### 3.5 Send button visibility
Use documented class:
- `.vfrc-chat-input--button`

We’ll enforce:
- `display: inline-flex`
- correct sizing and centering
- icon visibility by setting `color` and `svg` stroke rules *only inside this class*

No more global `button svg path { fill: ... }` rules.

---

### Step 4 — Make sure styles “reflect” reliably
Because we’ll now pass CSS directly via the widget config (data URL), every deploy changes the HTML bundle and the widget re-reads the CSS.

If you still see stale behavior after this:
- we’ll add a trivial version tag inside the CSS string (e.g., `/* build: 2026-02-24T... */`) so the data URL changes even when rules are identical.

---

## QA checklist (what you’ll test after implementation)
1) Open site → click “Need Help?” → launcher matches your site styling (Ion Blue glow, pill shape).
2) Inside chat:
   - input does NOT disappear when clicked/focused
   - typing works
   - send button icon is visible and clickable
3) Scroll in chat → down/scroll button matches theme and remains visible on hover/active.
4) Verify the main site buttons/inputs (outside chat) are unchanged.
5) Test on mobile viewport (launcher + input focus are common failure points on iOS).

---

## Technical details (for reference)
- We will follow Voiceflow’s documented styling model:
  - “Advanced styling” → `.vfrc-*` class targeting
  - `assistant.stylesheet` injection method
- We will avoid Shadow DOM manual injection to prevent:
  - conflicting selectors
  - duplicated `<style>` tags
  - timing issues with widget mount/unmount
