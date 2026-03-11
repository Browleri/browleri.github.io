# ARCHITECTURE.md

Technical architecture of `markka.net`.

## 1. System overview
`markka.net` is a static, client-rendered portfolio site deployed on GitHub Pages.

There is no backend and no build step. The runtime is just:
- HTML structure (`index.html`)
- CSS presentation (`assets/css/styles.css`)
- Vanilla JS behavior + i18n (`assets/js/main.js`)

## 2. Repository layout
- `index.html`
  Single-page app shell with all sections and tab panels.
- `assets/css/styles.css`
  Global design tokens, layout, component styles, responsive behavior, and animations.
- `assets/js/main.js`
  Language/theme state, translation application, tab switching, and tech-filter highlighting.
- `assets/img/`
  Portrait and visual assets (coin images, etc.).
- `docs/`, `cars/`, `fund-o-matic/`, `literary-lions/`, `pi-hole/`, `stations/`
  Project pages and README-based content used by project links.
- `CNAME`
  Custom domain binding for GitHub Pages (`markka.net`).

## 3. UI composition (HTML)
The page is structured into the following high-level regions:
1. Header
2. Hero
3. Tab navigation (`role="tablist"`)
4. Tab panels (`role="tabpanel"`)
5. Footer

Tab panels are identified via `data-panel` and mapped to tabs via `data-tab`.

### Important HTML data contracts
- `data-i18n`, `data-i18n-placeholder`, `data-i18n-content`, `data-i18n-aria`
  Translation hooks consumed by JS.
- `data-tab`
  Tab id for switching visible panel.
- `data-panel`
  Panel id for visibility toggling.
- `data-tab-link`
  Cross-links (buttons/links) that jump to a specific tab.
- `data-tech`
  Filter token used by tech pills.
- `data-tags` on `.project-card`
  Space-separated tokens matched against `data-tech`.

## 4. Behavior architecture (JavaScript)
`assets/js/main.js` owns all interactive state.

### 4.1 Runtime state
- `currentTheme`: `light | dark`
- `currentLanguage`: `en | fi`
- `activeTech`: current tech filter token (or `null`)

### 4.2 Initialization flow
1. Read persisted `theme` and `language` from `localStorage`.
2. Fallback to system preferences:
   - theme via `prefers-color-scheme`
   - language via browser locale (`fi` if browser language starts with `fi`, else `en`)
3. Apply language first (`setLanguage`) then theme (`setTheme`).
4. Resolve initial tab from URL hash (fallback `about`).
5. Attach event listeners for:
   - theme toggle
   - language toggle
   - tab click + keyboard navigation
   - tech pill filtering
   - tab-link CTA navigation

### 4.3 i18n engine
`translations` contains parallel dictionaries for `en` and `fi`.

`applyTranslations()` updates:
- text content for `data-i18n`
- placeholders for `data-i18n-placeholder`
- meta/content attributes for `data-i18n-content`
- ARIA labels for `data-i18n-aria`

Constraint: all keys used in HTML must exist in both language objects.

### 4.4 Tab switching
`activateTab(name, setFocus, updateHash)`:
- sets `aria-selected`
- updates `tabIndex`
- toggles `hidden` attribute on panels
- optionally focuses active tab
- optionally syncs `location.hash`

Keyboard support:
- Left/Right arrows rotate focus/selection across tabs.

### 4.5 Tech filter highlighting
`applyTechFilter(nextTech)`:
- toggles active filter (click same tag again clears)
- parses each card's `data-tags`
- adds/removes:
  - `.is-highlight` on matching cards
  - `.is-dim` on non-matching cards
- toggles `.is-active` on matching pills

If a tech pill is clicked outside Projects tab, JS activates Projects and scrolls to it.

## 5. Styling architecture (CSS)
`styles.css` is token-driven using CSS variables.

### 5.1 Theme model
- Default `:root` variables define light theme.
- `[data-theme="dark"]` overrides variables for dark theme.
- JS toggles theme by setting `data-theme` on `<html>`.

### 5.2 Component classes
Core reusable classes:
- Layout: `.page`, `.hero`, `.panel-grid`, `.projects-grid`, `.contact-grid`
- Surfaces: `.card`, `.status-pill`, `.tab`, `.btn`
- Feature states: `.project-card.is-highlight`, `.project-card.is-dim`, `.tag-link.is-active`

### 5.3 Responsive behavior
- Mobile/tablet breakpoints optimize spacing, sticky tabs, and card layout.
- Motion fallbacks use `@media (prefers-reduced-motion: reduce)`.

## 6. Accessibility model
Implemented patterns:
- Semantic tab system with `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Keyboard arrow navigation between tabs
- `aria-selected` state synchronization
- `aria-live="polite"` on tab content container
- Translatable ARIA labels
- Reduced-motion support

## 7. Content and SEO integration points
Current SEO-relevant elements are in `index.html` head:
- localized `<title>` via `data-i18n`
- localized `meta[name="description"]` via `data-i18n-content`
- favicon/manifest set

When adding SEO features (Open Graph, schema, sitemap), keep static-hosting constraints in mind.

## 8. Deployment architecture
Deployment target: GitHub Pages with custom domain.

Flow:
1. Commit/push to publishing branch.
2. GitHub Pages serves static assets.
3. `CNAME` binds to `markka.net`.
4. DNS is managed externally (Cloudflare per project docs).

## 9. Extension guide

### Add a new translatable text
1. Add HTML hook (`data-i18n` / placeholder/content/aria variant).
2. Add same key under both `translations.en` and `translations.fi`.
3. Verify both languages in browser.

### Add a new project card
1. Add new `.project-card` block in Projects section.
2. Add i18n keys for title/meta/description if translatable.
3. Add `data-tags` tokens for filter compatibility.
4. Ensure matching tech pills use identical `data-tech` tokens.

### Add a new filter tech
1. Add pill button with `data-tech="token"`.
2. Add token to relevant project cards' `data-tags`.
3. Verify highlight/dim behavior and active pill state.

## 10. Known coupling points (important)
- HTML `data-*` attributes are tightly coupled to JS selectors.
- i18n keys are tightly coupled between HTML and JS translation map.
- Tech filtering depends on exact string equality between `data-tech` and card `data-tags` tokens.

If any of the above changes, behavior breaks silently. Validate after edits.

## 11. Quick regression checklist
- Theme toggle persists across reloads.
- Language toggle updates all translatable fields.
- Tabs work via click, keyboard arrows, and hash links.
- Tech pills correctly highlight/dim project cards.
- Mobile layout keeps spacing and sticky tab behavior intact.
- Contact/status links route to Contact tab.
