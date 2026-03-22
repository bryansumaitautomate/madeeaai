

## Design System Export — MADEEA.AI Brand Kit

This is not an implementation task — it's a reference document. Here is your complete design system to embed on another website.

---

### Color Palette

| Token | Name | HEX | HSL | Usage |
|-------|------|-----|-----|-------|
| Background | Ignito Black | `#0C0F14` | `220 20% 6%` | Page background, "The Void" |
| Card | Carbon Steel | `#161A22` | `220 16% 11%` | Card/container backgrounds |
| Primary | Ion Blue | `#1A6BFF` | `217 100% 55%` | CTAs, links, focus states, "The Signal" |
| Accent | Plasma Purple | `#7B3FF2` | `260 87% 60%` | AI/brain features, "The Intel" |
| Foreground | White | `#FFFFFF` | `0 0% 100%` | Headlines, primary text |
| Muted Text | — | `#8A8A9A` | `240 5% 55%` | Secondary/caption text |
| Border | — | `#2A2E38` | `220 13% 20%` | Subtle borders |
| Destructive | Red | `#E5484D` | `0 84% 60%` | Error states |

**Glow effects (box-shadow):**
```css
--glow-primary: 0 0 30px hsl(217 100% 55% / 0.3);
--glow-primary-hover: 0 0 40px hsl(217 100% 55% / 0.5);
--glow-accent: 0 0 30px hsl(260 87% 60% / 0.3);
```

---

### Typography

| Role | Font Family | Weight | Notes |
|------|-------------|--------|-------|
| Body / UI | **Geist** (sans-serif) | 400–700 | Primary UI font |
| Headlines | **Instrument Serif** | 400 italic for key phrases | "Precision" aesthetic |
| Data / Labels | **Geist Mono** | 400 | Monospace, uppercase, `letter-spacing: 0.15em` |
| Card Titles (Reality Check) | **Syne** | 500–700 | Modern high-end feel |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Geist fonts: download from [vercel.com/font](https://vercel.com/font)

---

### Glass & Card Styles

```css
/* Standard glass card */
.glass-card {
  background: #161A22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}
.glass-card:hover {
  border-color: rgba(26, 107, 255, 0.4);
  box-shadow: 0 0 20px rgba(26, 107, 255, 0.15);
}

/* Infrastructure glass (heavier blur) */
.glass-infrastructure {
  background: rgba(22, 26, 34, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(26, 107, 255, 0.1);
}
.glass-infrastructure:hover {
  border-color: rgba(26, 107, 255, 0.25);
  box-shadow: 0 0 30px rgba(26, 107, 255, 0.1);
}
```

---

### Background Patterns

```css
/* Dot matrix overlay */
.dot-matrix {
  background-image: radial-gradient(circle, rgba(26, 107, 255, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Text gradient (headline fade) */
.text-gradient {
  background: linear-gradient(to bottom, #fff, rgba(255,255,255,0.6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

### Button System ("Control Room Button")

```css
.control-room-btn {
  background: #0a0a0f;
  border: 1px solid rgba(26, 107, 255, 0.3);
  border-radius: 9999px;
  padding: 0.75rem 24px;
  box-shadow: 0 0 25px rgba(26, 107, 255, 0.3),
              inset 0 0 20px rgba(26, 107, 255, 0.05);
  color: white;
  font-weight: 600;
}
.control-room-btn:hover {
  transform: scale(1.03);
  border-color: rgba(26, 107, 255, 0.6);
  /* Animated glow pulse on hover */
}
```

---

### Border Radius

```css
--radius: 0.5rem; /* 8px base */
/* lg: 0.5rem, md: 6px, sm: 4px */
```

---

### Quick-Start CSS Variables (copy-paste)

```css
:root {
  --background: 220 20% 6%;
  --foreground: 0 0% 100%;
  --card: 220 16% 11%;
  --card-foreground: 0 0% 100%;
  --primary: 217 100% 55%;
  --primary-foreground: 0 0% 100%;
  --accent: 260 87% 60%;
  --accent-foreground: 0 0% 100%;
  --muted: 220 16% 11%;
  --muted-foreground: 240 5% 55%;
  --border: 220 13% 20%;
  --input: 220 13% 20%;
  --ring: 217 100% 55%;
  --radius: 0.5rem;
  --glow-primary: 0 0 30px hsl(217 100% 55% / 0.3);
  --glow-primary-hover: 0 0 40px hsl(217 100% 55% / 0.5);
  --glow-accent: 0 0 30px hsl(260 87% 60% / 0.3);
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Geist', system-ui, sans-serif;
}
```

This is a reference document — no code changes needed.

