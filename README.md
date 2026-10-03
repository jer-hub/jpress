# JPress — Redesigned (UI/UX v2)

A complete redesign of the personal site: modern, accessible and dependency-free.

## What changed
- **Removed** the old Bootstrap 4 + jQuery + Font Awesome stack (`css/styles.css` deleted).
  The site is now plain HTML/CSS/JS — faster to load, easier to maintain.
- **New design system** in `css/theme.css`: dark-first theme with a persisted
  light-mode toggle, design tokens (CSS variables), Inter/Sora typography,
  glass navbar, gradient accents, card grids and fluid type via `clamp()`.
- **New interactions** in `js/scripts.js` (vanilla): theme toggle (localStorage +
  prefers-color-scheme), mobile hamburger menu, accessible dropdown, sticky-nav
  scroll state, reveal-on-scroll animations and TOC scroll-spy.
- **Pages redesigned**
  - `index.html` — hero with badge/CTAs, project-collection cards, featured-work grid, about teaser.
  - `about/about.html` — profile header with avatar ring, skill chips, Bio / Email / Hobbies cards, social links.
  - `collection/DataScience.html` & `collection/IAS.html` — sticky "On this page" table of contents, responsive 16:9 video frames, per-project articles with dates and write-ups.

## UX / accessibility improvements
- Skip-to-content link, `aria-current`, `aria-expanded`, labelled landmarks, focus-visible outlines.
- Semantic structure (`nav/main/section/article/footer`), one `h1` per page.
- Responsive down to small phones; reduced-motion respected; lazy-loaded images/iframes.
- Real `mailto:` link replaces dead `href="#!"`; footer year auto-updates.

## Preview locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
