# browleri.github.io

## Build process
- Static site: plain HTML, CSS, and JavaScript, no build step required.
- Deploy by pushing to the default branch; GitHub Pages serves `index.html` with linked assets in `assets/`.
- Local preview: open `index.html` directly in a browser or use any simple static server.

## Design principles
- Accessibility first: semantic HTML, ARIA-backed tabs, and keyboard navigation.
- Performance aware: lightweight assets, minimal JS, and no external runtime dependencies.
- Responsive by default: fluid grids, flexible typography, and mobile-friendly spacing.
- Visual clarity: navy-forward palette, high contrast, and clear hierarchy.

## Technical features
- Light/dark mode toggle with `localStorage` persistence and system preference fallback.
- Tabbed sections with ARIA roles, keyboard support, and URL hash deep-linking.
- Smooth anchor transitions and staggered reveal animations with `prefers-reduced-motion` support.
- Structured assets with separate `assets/css/styles.css` and `assets/js/main.js`.
