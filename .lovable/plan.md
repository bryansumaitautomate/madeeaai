

# Fix Navigation Links on AI Hub and Audit Pages

## Problem
The Navigation component uses plain `<a>` tags for all links. This causes two issues when you're on the `/ai-hub` or `/audit` pages:

1. **Hash links don't work** -- Clicking "Problem", "Solutions", "How It Works", or "Results" tries to scroll to `#problems`, `#solutions`, etc., but those sections only exist on the homepage. Nothing happens.
2. **Route links cause full reloads** -- Clicking "AI Hub" or "Free Audit" uses a plain `<a>` tag instead of React Router navigation, so the entire page reloads instead of smoothly transitioning.

## Solution
Update the Navigation component to use React Router's `useNavigate` hook for proper client-side routing:

- **Hash links** (`#problems`, `#solutions`, etc.): When on a sub-page, navigate to `/` first, then scroll to the section. When already on `/`, scroll smoothly as before.
- **Route links** (`/ai-hub`, `/audit`): Use `navigate()` from React Router instead of letting the browser handle `<a>` tags with full reloads.

## Technical Details

### File: `src/components/Navigation.tsx`

1. Import `useNavigate` and `useLocation` from `react-router-dom`
2. Update `handleNavClick`:
   - For hash links (`#...`): Check if we're on `/`. If yes, smooth-scroll. If not, use `navigate('/' + href)` to go to homepage with the hash -- React Router will handle it and the browser will scroll to the anchor.
   - For route links (`/...`): Use `navigate(href)` for client-side routing instead of default `<a>` behavior. Call `e.preventDefault()` to stop the full reload.
3. Keep `<a>` tags in JSX for accessibility/SEO, but override their behavior via `handleNavClick`.

