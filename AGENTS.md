# AGENTS.md

Guidelines and context for future coding agents working on `markka.net`.

## Documentation responsibilities

This repository owns the implementation.

The central documentation repository (`Browleri/documentation-repo`) owns:

- infrastructure documentation
- architecture documentation
- host documentation
- service documentation
- operational procedures
- network documentation

Whenever changes in this repository materially affect deployment,
architecture, networking, operations, monitoring or maintenance,
update the documentation repository as part of the same work item.

Do not duplicate large documentation blocks here unless relevant for showcasing a project.
Keep README focused on this repository.

## Project purpose
- Personal portfolio site for Martti Koivisto (`markka.net`).
- Primary audience: Nordic tech recruiters and hiring teams.
- Site goals:
  - Present profile, projects, experience, and stack clearly.
  - Make contact frictionless.
  - Keep visual style distinctive but professional.

## Tech stack and structure
- Static site only.
- Main files:
  - `index.html` (all page structure and content sections)
  - `assets/css/styles.css` (all styling, responsive rules, animations)
  - `assets/js/main.js` (theme toggle, language toggle, tab logic, tech filtering)
- Project subfolders (for portfolio links/readmes):
  - `cars/`, `docs/`, `fund-o-matic/`, `literary-lions/`, `pi-hole/`, `stations/`

## Core UI behavior
- Tabs are controlled via `data-tab` / `data-panel` attributes and ARIA roles.
- Hero and header CTA links use `data-tab-link` to switch tabs.
- Theme toggle stores mode in `localStorage` key `theme`.
- Language toggle stores mode in `localStorage` key `language`.
- Tech filtering:
  - Trigger elements use `data-tech`.
  - Project cards use `data-tags` (space-separated slugs).
  - Matching is exact slug-based in JS.
  - If a tag should filter, ensure both sides use the exact same slug.

## Internationalization rules
- Text in `index.html` uses `data-i18n` keys.
- English and Finnish strings live in `assets/js/main.js` under `translations.en` and `translations.fi`.
- If you add/change any `data-i18n` key in HTML, update both EN and FI entries in JS in the same change.
- Also maintain:
  - `data-i18n-content` (meta content)
  - `data-i18n-placeholder` (form placeholders)
  - `data-i18n-aria` (ARIA labels)

## Content and tone constraints
- Keep tone concise, concrete, and recruiter-friendly.
- Prefer "junior developer" positioning over "student" positioning unless explicitly requested otherwise.
- Keep claims factual and consistent with `docs/ABOUT_ME.md` and project READMEs.
- Do not invent achievements, employers, or credentials.

## HTML and CSS conventions
- Keep semantic structure and ARIA tab pattern intact.
- Keep section comments in `index.html`; extend them when adding major blocks.
- Do not use inline styles in HTML unless unavoidable; move styling to CSS.
- Preserve mobile behavior:
  - tab strip sticky on mobile,
  - consistent grid/card gaps,
  - no overlap/regression in hero or cards.

## JavaScript conventions
- Keep logic framework-free and readable.
- Prefer small helper functions over duplicated event logic.
- Preserve accessibility behavior:
  - keyboard tab navigation with arrow keys,
  - correct `aria-selected` and `hidden` state handling.
- When changing filters, verify:
  - toggle-on / toggle-off behavior,
  - active tag visual state,
  - dim/highlight classes applied correctly.

## Links and routing
- This is a static site on GitHub Pages with custom domain.
- Use relative links for internal project folders (`docs/`, `cars/`, etc.).
- External links must include protocol (for example, `https://...`).

## QA checklist after edits
- Verify both languages (EN/FI) for all edited content.
- Verify both themes (light/dark).
- Verify desktop and mobile layouts.
- Verify tabs, CTA links, and tech filtering.
- Verify no broken internal links.

## Deployment and ops notes
- Domain is `markka.net` and `CNAME` is present.
- Hosting/deploy is GitHub Pages (static files from repo).
- DNS is handled via Cloudflare; email routing is handled via Microsoft 365 per project docs.

## Editing safety
- This repo may be dirty; do not revert unrelated changes.
- Make targeted edits only.
- Keep changes small and reviewable.
- When unsure about content intent, align with existing copy before rewriting broadly.
