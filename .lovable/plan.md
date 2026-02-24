

## Root cause analysis

The blue focus ring, invisible text, and card background have persisted because the current approach (appending a `<style>` element to the shadow root) is being overridden by Voiceflow's own inline styles and CSS specificity rules inside the shadow DOM. The injected stylesheet simply cannot win the specificity war reliably.

**The fix**: Voiceflow's `chat.load()` API supports an `assistant.stylesheet` property that accepts a CSS data URI. Stylesheets loaded this way are applied **inside** the widget's shadow DOM with proper priority -- this is the officially supported customization method. This completely sidesteps the shadow DOM injection hack.

## Plan

### Step 1: Create a dedicated CSS string for the Voiceflow widget

All dark theme overrides (currently in the array joined with `\n`) will be converted into a proper CSS stylesheet string and base64-encoded as a `data:text/css;base64,...` URI.

### Step 2: Pass it via `assistant.stylesheet` in `chat.load()`

Add the `assistant` property to the existing `chat.load()` config:

```js
window.voiceflow.chat.load({
  verify: { projectID: '...' },
  url: '...',
  versionID: 'production',
  voice: { ... },
  render: { ... },
  assistant: {
    stylesheet: 'data:text/css;base64,...'
  }
});
```

### Step 3: Fix the three specific issues in the CSS

1. **Blue focus ring** -- Target the textarea and its wrapper with `outline: none !important; box-shadow: none !important;` on `:focus`, `:focus-within`, and `:focus-visible`. Set border to subtle grey (`rgba(255,255,255,0.15)`) on focus.

2. **Invisible text** -- Set `color: #E9ECFC !important; -webkit-text-fill-color: #E9ECFC !important; caret-color: #E9ECFC !important;` on `textarea` and `input` elements.

3. **Card/branding section** -- Set `display: none !important;` on `[class*="powered"]`, `[class*="branding"]`, `[class*="credit"]`, and the Voiceflow watermark/footer elements.

### Step 4: Remove the old shadow DOM injection code

The entire `injectDarkTheme` function, the `setInterval` retry loop, and the massive CSS array will be removed. They are replaced by the single `assistant.stylesheet` data URI, resulting in much cleaner code.

### Step 5: Keep the `primaryColor` theme config

The `render.theme` config (`primaryColor`, `backgroundColor`, `textColor`) stays since it handles base theming. The stylesheet handles the edge cases Voiceflow's theme config doesn't cover.

## Technical details

- The base64 data URI approach is documented at [Voiceflow Embed Docs](https://docs.voiceflow.com/docs/embed-customize-styling)
- All existing dark theme rules will be preserved but reorganized into proper CSS
- The CSS will use high-specificity selectors with `!important` to override widget defaults
- File changed: `index.html` only

