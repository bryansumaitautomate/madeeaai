

# Fix Remaining White Sections in Voiceflow Chatbot

## Problem
The current shadow DOM CSS injection covers many selectors but misses some elements that remain white, specifically:
- Message response bubbles (the text content area)
- The input/message field at the bottom
- Possibly the assistant info card and other container elements

## Change

**File: `index.html`** (lines 58-79)

Expand the CSS rules array to add broader wildcard overrides and additional specific selectors:

```js
// Add these new rules to the existing array:
'* { color: #E9ECFC; }',
'.vfrc-message { background: transparent !important; }',
'.vfrc-system-response { background: transparent !important; }',
'.vfrc-system-response .vfrc-bubble { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(255,255,255,0.06) !important; border-radius: 12px !important; }',
'.vfrc-user-response .vfrc-bubble { background: #2346DC !important; color: #ffffff !important; }',
'div[class*="message"] { background: transparent !important; }',
'div[class*="response"] { background: transparent !important; }',
'div[class*="Message"] { background: transparent !important; }',
'div[class*="Response"] { background: transparent !important; }',
'div[class*="input"] { background: #161A22 !important; color: #E9ECFC !important; }',
'div[class*="Input"] { background: #161A22 !important; color: #E9ECFC !important; }',
'input, textarea { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(255,255,255,0.1) !important; }',
'div[class*="footer"], div[class*="Footer"] { background: #0C0F14 !important; }',
'div[class*="chat"], div[class*="Chat"] { background: #0C0F14 !important; }',
'div[class*="dialog"], div[class*="Dialog"] { background: #0C0F14 !important; }',
'p, span, h1, h2, h3, h4, h5, h6, label { color: #E9ECFC !important; }',
```

This blanket approach ensures that any Voiceflow internal class naming (which may differ across widget versions) gets forced to the dark theme. The specificity chain is: element-wide defaults with `!important`, then more specific selectors for the key interactive elements.

