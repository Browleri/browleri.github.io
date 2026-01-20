# markka.net developer pages

## Infrastructure
- Static site: plain HTML, CSS, and JavaScript.
- Deployed by pushing to the hosted branch; GitHub Pages serves `index.html` with linked assets in `assets/`. Project ReadMe-files hosted in `project-name/`.
- Cloudflare DNS configured to direct web traffic from `markka.net` domain to the Github pages and email traffic to Gmail. This allows for cost-effective hosting and email services, while still having a custom domain. 

## Technical features
- Light/dark mode toggle with `localStorage` persistence and system preference fallback.
- Tabbed sections with ARIA roles, keyboard support, and URL hash deep-linking.
- Tech pill filtering that highlights matching project cards.
- Smooth anchor transitions and staggered reveal animations with `prefers-reduced-motion` support.
- Structured assets with separate `assets/css/styles.css` and `assets/js/main.js`.
- Formspree.io based Contact me -form allows contacting by email while reducing spam.

## Disclaimers
- I've used the CODEX AI chat and agent in the design of this website. My focus in this project has been to explore the usability and capabilities of LLM's in website development. It is clear to me that developer oversight and planning is needed, but AI-assisted coding is incredibly fast. The end result has been checked and finalised by me, the developer.
