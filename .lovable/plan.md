

# Fix White Backgrounds in Voiceflow Chatbot Cards & Buttons

## Problem
The Voiceflow chatbot has card elements (like "Custom Pricing & ROI Analysis") and action buttons ("Start Free AI Audit", "Calculate ROI") that still render with white backgrounds. These are Voiceflow's card/carousel components which aren't covered by the current CSS overrides.

## Change

**File: `index.html`** (line 110, add new rules before the closing of the array)

Add CSS rules targeting Voiceflow card, carousel, and action button elements:

```js
// Card & carousel components
'.vfrc-card { background: #161A22 !important; border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 12px !important; overflow: hidden !important; }',
'.vfrc-card--title, .vfrc-card--description { color: #E9ECFC !important; }',
'.vfrc-card--image { border-bottom: 1px solid rgba(255,255,255,0.06) !important; }',
'.vfrc-carousel { background: transparent !important; }',
'div[class*="card"], div[class*="Card"] { background: #161A22 !important; color: #E9ECFC !important; border-color: rgba(255,255,255,0.08) !important; }',
'div[class*="carousel"], div[class*="Carousel"] { background: transparent !important; }',

// Action buttons inside cards
'.vfrc-card--action, .vfrc-card--button { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(35, 70, 220, 0.3) !important; }',
'.vfrc-card--action:hover, .vfrc-card--button:hover { background: #1e2430 !important; border-color: rgba(35, 70, 220, 0.6) !important; }',
'button { background: #161A22 !important; color: #E9ECFC !important; border: 1px solid rgba(255,255,255,0.1) !important; }',
'button:hover { background: #1e2430 !important; }',

// Broad catch-all for any remaining white containers
'div[class*="actions"], div[class*="Actions"] { background: transparent !important; }',
'div[class*="content"], div[class*="Content"] { background: #161A22 !important; color: #E9ECFC !important; }',
'div[class*="body"], div[class*="Body"] { background: #161A22 !important; }',
'div[class*="container"], div[class*="Container"] { background: transparent !important; }',
'div[class*="wrapper"], div[class*="Wrapper"] { background: transparent !important; }',
'img { border-radius: 8px !important; }',

// Exclude launcher from button override
'.vfrc-launcher { background: #2346DC !important; border: none !important; }'
```

This covers Voiceflow's card components (used for rich content with images and action buttons), carousels, and ensures the launcher button retains its blue styling despite the broad `button` override.

## Technical details
- The white card in the screenshot is a `.vfrc-card` component with action buttons
- We use broad `div[class*="..."]` selectors as fallback since Voiceflow may use different internal class names across versions
- The launcher button gets re-declared at the end to override the generic `button` rule

