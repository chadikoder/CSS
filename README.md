<div align="center">

# CSS Tracker

**A clean, drawer-based study tracker for modern CSS3 — built as a teaching reference.**

[![Made by Chadi Khoder](https://img.shields.io/badge/made_by-Chadi_Khoder-0ea5e9?style=for-the-badge)](https://github.com/chadikoder)
[![No build](https://img.shields.io/badge/no_build-static-0ea5e9?style=for-the-badge)](https://github.com/chadikoder/CSS)
[![License](https://img.shields.io/badge/license-PolyForm_NC-0ea5e9?style=for-the-badge)](#license)

[**Open the tracker →**](https://chadikoder.github.io/CSS/)

</div>

---

## What is this

A single-page study tracker for **CSS**, built as a teaching reference. Same UI/UX as my other trackers (PHP / HTML / CSS / JS / SQL), retuned per language with its own accent color. Zero build, zero dependency — open `index.html` and you are in.

```
7 days   · 7-day attack plan
73+      · exercises with full solutions
16       · W3Schools-style reference lessons
1        · clickable progress cube per lesson
∞        · re-readable until the exam
```

## Features

- **7-day plan** — one focused day at a time, exam-style
- **Real exercises** — every exercise has a worked solution you can reveal
- **Quizzes** — short MCQ per day to check what stuck
- **W3Schools references** — every lesson links to the matching W3 page
- **Drawer sidebar** — same on desktop and mobile, burger toggle, ESC closes
- **Click-to-complete** — the cube in the sidebar marks a lesson done
- **Per-day progress bar** — visual feedback as you advance
- **Dark / Light theme** — saved across sessions
- **Search** — `/` shortcut, fuzzy match across all lessons
- **Bookmarks** — pin tricky exercises to revisit
- **CSS-aware syntax highlighter** — properties, values, hex colors highlighted
- **Keyboard shortcuts** — `←` `→` navigate, `T` toggle course/exos, `Esc` close
- **localStorage persistence** — your progress survives reloads
- **Accessibility** — semantic HTML, focus rings, ARIA where needed
- **SEO meta** — Open Graph + Twitter Cards configured

## Curriculum

1. **Selecteurs & cascade** — combinators, specificity, attribute selectors, pseudo-classes, pseudo-elements
2. **Box model & display** — border-box, padding/margin/border, overflow, aspect-ratio, logical properties
3. **Couleurs & typographie** — hex/rgb/hsl/oklch, gradients, web fonts, clamp(), units (rem/em/vh/dvh/ch/fr)
4. **Flexbox** — axes, justify/align, gap, grow/shrink/basis, order, centering tricks
5. **Grid** — template-columns, auto-fit/auto-fill, grid-areas, subgrid, place-items
6. **Animations & transitions** — transform, @keyframes, view-transitions, reduced-motion
7. **Responsive & projet** — mobile-first, container queries, prefers-color-scheme, print styles

Plus a separate **W3Schools reference section** (Basic / Intermediate / Advanced) with 16 reference lessons mirroring the official W3 organization.

## Quick start

```bash
git clone https://github.com/chadikoder/CSS.git
cd CSS
# Open index.html in any browser.
```

Or just visit **https://chadikoder.github.io/CSS/** (enable GitHub Pages in repo Settings → Pages → `main` branch first).

## Project structure

```
CSS/
├── index.html              ← redirect → web/study_tracker.html
├── README.md
├── web/
│   ├── study_tracker.html
│   ├── css/style.css       ← design system, ~660 lines
│   ├── js/
│   │   ├── app.js          ← rendering + state + syntax highlight
│   │   └── data.js         ← curriculum
│   └── image/logo.svg
└── .nojekyll
```

## Extending the curriculum

Edit `web/js/data.js`. Two arrays:

- `DAYS` — numbered 7-day plan lessons
- `GIO` — W3Schools-style reference lessons (`level: basic / intermediate / advanced`)

After editing, bump the `?v=N` cache-bust in `web/study_tracker.html`.

## Tech stack

| | |
|---|---|
| Markup | HTML5 |
| Style | CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (no framework) |
| State | localStorage |
| Fonts | Inter + JetBrains Mono |
| Build | None |

## Related trackers

By the same author, same design system:

- [chadikoder/PHP](https://github.com/chadikoder/PHP) — PHP + NFA042 exam prep
- [chadikoder/HTML](https://github.com/chadikoder/HTML) — HTML5
- [chadikoder/CSS](https://github.com/chadikoder/CSS) — CSS3
- [chadikoder/JS](https://github.com/chadikoder/JS) — Modern JavaScript
- [chadikoder/SQL](https://github.com/chadikoder/SQL) — SQL

## Author

**Chadi Khoder** — [@chadikoder](https://github.com/chadikoder)

## License

**PolyForm Noncommercial License 1.0.0** — Copyright © 2026 Chadi Ikhoder. All rights reserved.

You may read, study, and use this for personal, educational, and non-commercial purposes. You may **not** sell it or use it for any commercial purpose. See [`LICENSE`](./LICENSE) for the full text.
