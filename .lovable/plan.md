

# Fix White Loading Message in Voiceflow Chatbot

## Problem
The Voiceflow chatbot's loading/typing indicator (the animated dots that appear while the bot is generating a response) still has a white background because our CSS overrides don't target the loading indicator elements.

## Change

**File: `index.html`** (line 95, before the closing `]`)

Add CSS rules targeting the loading/typing indicator elements. Voiceflow uses classes like `.vfrc-loading`, `.vfrc-typing`, and internal dot indicators, plus broad selectors to catch any remaining white backgrounds:

```js
// Add after the existing 'p, span, ...' rule:
'.vfrc-loading { background: transparent !important; }',
'.vfrc-typing { background: transparent !important; }',
'.vfrc-typing-indicator { background: #161A22 !important; }',
'div[class*="loading"] { background: transparent !important; }',
'div[class*="Loading"] { background: transparent !important; }',
'div[class*="typing"] { background: transparent !important; }',
'div[class*="Typing"] { background: transparent !important; }',
'div[class*="indicator"] { background: #161A22 !important; }',
'div[class*="Indicator"] { background: #161A22 !important; }',
'div[class*="busy"] { background: transparent !important; }',
'div[class*="status"] { background: transparent !important; }',
'div[class*="Status"] { background: transparent !important; }',
'div > div { background-color: inherit !important; }',
```

Additionally, add a nuclear option to catch any remaining white elements inside the shadow DOM:

```js
'div:not(.vfrc-launcher):not(.vfrc-message--request):not(.vfrc-user-response .vfrc-bubble) { background-color: transparent !important; }',
'.vfrc-chat, .vfrc-chat--dialog, .vfrc-header, .vfrc-footer, .vfrc-chat-input, .vfrc-assistant-info { background-color: #0C0F14 !important; }',
'.vfrc-bubble, .vfrc-message--response, .vfrc-system-response .vfrc-bubble, div[class*="input"], div[class*="Input"], input, textarea { background-color: #161A22 !important; }',
```

This ensures the loading message container inherits the dark background instead of defaulting to white.

