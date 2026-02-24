

# Add Voiceflow Chatbot Widget to All Pages

## Recommendation

I recommend loading the chatbot on **all pages**. It's a sales/support widget — visitors should be able to ask questions regardless of where they are (homepage, AI Hub, audit page). The widget floats in the corner and doesn't interfere with content.

## Approach

Load the Voiceflow script once globally in `index.html`, inside the `<body>` tag before the root div. This ensures it loads on every route without any React-specific code.

## File: `index.html`

Add the Voiceflow script block inside `<body>`, before the `<div id="root">`:

```html
<script type="text/javascript">
  (function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '699daccdde2b01982d12ac5e' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      });
    }
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
```

No React component changes needed. One file, one addition.

