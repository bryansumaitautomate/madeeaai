

# Update Voiceflow Chatbot Theme Colors

## Context

The chatbot widget's visual appearance is primarily controlled by Voiceflow's own dashboard settings. However, the `render.theme` object in `index.html` can influence some widget versions. Updating these values to match the color palette from your image ensures consistency.

## Change

**File: `index.html`** (lines 42-45)

Update the theme colors from:
```js
primaryColor: '#1A6BFF',
backgroundColor: '#0C0F14',
textColor: '#E6EAF2'
```

To match the palette from the uploaded image:
```js
primaryColor: '#2346DC',
backgroundColor: '#070E2C',
textColor: '#E9ECFC'
```

- `#2346DC` — the 500 shade (strong blue, good for buttons/links)
- `#070E2C` — the 900 shade (deep navy, background)
- `#E9ECFC` — the 50 shade (near-white, text on dark background)

## Important Note

If the chatbot still doesn't reflect these colors after this change, the styling is being controlled from the Voiceflow dashboard. You would need to update the "Primary color" and theme settings there to match.

