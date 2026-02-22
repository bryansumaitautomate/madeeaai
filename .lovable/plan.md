

# Apply Main Website Fonts and Card Design to AI Hub

## What Changes

The AI Hub page currently uses generic sans-serif styling and simple flat cards. The main website uses a distinct typography hierarchy and premium card designs with rotating gradient borders. This plan brings those same design patterns to the AI Hub.

## 1. Typography Updates

Apply the main site's font hierarchy across all AI Hub components:

- **Hero headline** ("Automation Library"): Switch to `font-serif` (Instrument Serif) with italic accent text, matching the Hero component's headline style
- **Hero subtitle label** ("AI Automation Partner"): Switch to `font-mono` with uppercase tracking, matching the Hero's label style
- **Hero body text**: Keep `font-light` with Geist Sans (already the default)
- **Card titles**: Switch to `font-syne` (Syne), matching how RealityCheck and InfrastructureCard use it
- **Card descriptions**: Add `font-syne`, matching RealityCheck's description style
- **Tool badges**: Switch to `font-mono` for the technical/data aesthetic
- **Category sidebar heading**: Switch to `font-mono` with uppercase tracking
- **Modal title**: Switch to `font-syne`
- **Modal section headers**: Switch to `font-mono`

## 2. Card Design -- Magic Border Effect

Replace the current flat card design with the main website's "magic border" rotating gradient pattern (same as InfrastructureCard):

- Wrap each automation card in the `infrastructure-card-wrapper` pattern
- Add the `infrastructure-card-border` container with `overflow: clip`
- Add the `infrastructure-card-gradient` rotating conic-gradient element (appears on hover)
- Use `infrastructure-card-content` as the inner card with dark `#0a0a0f` background
- Include the subtle top glow line on hover
- Remove the old `ai-hub-card-hover` translateY effect in favor of the rotating border

## Files to Modify

### `src/components/ai-hub/AutomationHero.tsx`
- Hero headline: add `font-serif`, make "AI-Powered Workflows" use `font-serif italic`
- Glass pill label: add `font-mono`
- Body text: keep as-is (Geist Sans is the default)

### `src/components/ai-hub/AutomationCard.tsx`
- Restructure JSX to use the three-layer magic border pattern (`infrastructure-card-wrapper` > `infrastructure-card-border` > `infrastructure-card-gradient` + `infrastructure-card-content`)
- Card title: add `font-syne`
- Card description: add `font-syne`
- Tool badges: add `font-mono`

### `src/components/ai-hub/CategoryTabs.tsx`
- "Categories" heading: add `font-mono uppercase tracking-widest text-xs`
- Category labels: add `font-syne`

### `src/components/ai-hub/AutomationModal.tsx`
- Modal title: add `font-syne`
- Section headings ("What this automation does", "Tools & Integrations"): add `font-mono`
- Tool badges: add `font-mono`

### `src/pages/AIHub.tsx`
- "Showing X workflows" text: add `font-mono` to the count
- Footer text: keep as-is

