# Port my-portfolio-v2 to thespacemanatee.github.io

**Date:** 2026-05-09
**Status:** Design — pending implementation
**Source repo:** `thespacemanatee/my-portfolio-v2` (Gatsby 4 + `@lekoarts/gatsby-theme-cara`)
**Target repo:** `thespacemanatee/thespacemanatee.github.io` (currently empty user-site)
**Development branch:** `claude/port-portfolio-github-pages-O62a3`
**Production URL:** `https://thespacemanatee.github.io`

## Goal

Rebuild the existing one-page portfolio on the absolute latest static-site stack so it deploys to GitHub Pages at the user-site root, with the same playful personality as the Cara theme but a modernized look and a fraction of the JS payload. Keep all current content (with TODO markers for stale parts) so the only follow-up is a content refresh pass.

## Non-goals

- Visual redesign beyond "refreshed but recognizable".
- Updating bio, project list, or links during this port (tracked in `CONTENT.md` for a later pass).
- Custom domain / DNS setup. Site stays at `thespacemanatee.github.io`.
- PWA / offline support, Google Analytics, blog, CMS, comments. The original had a few of these; we are dropping them as YAGNI for a personal portfolio.
- Any changes to the `my-portfolio-v2` repo. It is left untouched.

## What exists today (source)

- **Stack:** Gatsby 4, React 17, TypeScript, Theme-UI, Emotion, `@react-spring/parallax`, `react-awesome-reveal`, MDX.
- **Theme:** `@lekoarts/gatsby-theme-cara` v3 — playful one-page portfolio, parallax sections, floating SVG shapes (triangle, hexa, box, circle, cross, arrow, upDown), gradient project cards, animated SVG wave at contact, dark/light toggle.
- **Sections:** Hero (intro + CTA) → Projects (6 cards) → About → Contact.
- **Content (verbatim from source, all destined for TODO markers):**
  - *Intro:* "Hello World! My name is Chee Kit. I'm a software developer (and so much more)."
  - *About:* "I am currently a Final Year Computer Science student from SUTD, specialising in Software Engineering and Cloud Computing. My specific interests include mobile application development, but I have done alot of full-stack work as well. I am passionate about programming and acquired many of my programming skills in my own free time." — clearly stale (written ~2022).
  - *Projects (6):* Floating Bridge Game, SingHealth Project, Beever, Electric Vehicle Dashboard, Hikari Prints, Chess with React Native — all keep their existing copy, gradients, links, and images.
  - *Contact:* email `cheekit.chong98@gmail.com`, GitHub `thespacemanatee`, LinkedIn `chee-kit`.
- **Assets:** 5 project images in `src/images/` (`beever.jpg`, `evam-dashboard.jpg`, `hikariprints.jpg`, `react-native-chess.png`, `singhealth-project.png`); `floating-bridge` uses a CloudFront-hosted `.mp4`; `profile.jpg`; favicons + app icons + `banner.jpg` in `static/`.

## Decisions

| Topic | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (`output: 'static'`) | Smallest JS-on-the-wire for a content-first portfolio; first-class Tailwind v4, Content Collections, Image, Fonts API. |
| Architecture | **Pure Astro + minimal React islands** (Approach A) | Best Core Web Vitals; aligns with "absolute latest tech". CSS scroll-driven animations replace `@react-spring/parallax`. Two React islands only: `ThemeToggle` and `ScrollToTop`. |
| Visual direction | **Refreshed but recognizable** | Keep playful + colorful + motion-rich personality. Modern typography, smoother animations, current trends (subtle gradients, View Transitions). |
| Content | **Port as-is + TODO markers** | Bio + project list will be refreshed by the user in a later pass. `CONTENT.md` checklist enumerates every TODO. |
| Domain | **`thespacemanatee.github.io`** (no custom domain) | Default GitHub Pages URL. No `base` path needed since this is a user-site (deploys at root). Custom domain can be added later via `CNAME`. |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, CSS-first `@theme` config | No `tailwind.config.js`; tokens live next to the CSS. |
| Fonts | Astro Fonts API (built-in) — one variable display font + Inter Variable body | Auto subsetting + fallback metric matching, no extra plugin. |
| Images | Astro `<Image>` (Sharp) → AVIF + WebP, multi-width | Best-in-class for static sites. |
| Lint/format | **Biome** | One tool, fast, modern. |
| Package manager | **pnpm** | Deterministic, smaller `node_modules`. |
| Node | **22 LTS** | Local dev and CI. |
| TypeScript | **Strict mode**, `astro check` in CI | |
| Animation libs | **None** — raw CSS scroll-driven animations + SVG `<animate>` | No `react-spring`, no `react-awesome-reveal`, no Motion. |
| PWA | **Dropped** | YAGNI for personal portfolio. |
| Analytics | **Dropped** | Privacy-friendly default. Easy to add later. |
| Sitemap | `@astrojs/sitemap` | One integration line; near-free SEO win. |

## Project structure

```
thespacemanatee.github.io/
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── tsconfig.json
├── biome.json
├── package.json
├── pnpm-lock.yaml
├── CONTENT.md                          # checklist of every TODO marker
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png, favicon-32x32.png
│   ├── apple-touch-icon.png, apple-touch-icon-precomposed.png
│   ├── android-chrome-192x192.png, android-chrome-512x512.png
│   ├── og-image.jpg                    # generated from banner.jpg
│   └── robots.txt
└── src/
    ├── site.config.ts                  # title, description, social URLs
    ├── content.config.ts               # Projects collection schema
    ├── content/projects/
    │   ├── 01-floating-bridge.mdx
    │   ├── 02-singhealth.mdx
    │   ├── 03-beever.mdx
    │   ├── 04-evam-dashboard.mdx
    │   ├── 05-hikari-prints.mdx
    │   └── 06-react-native-chess.mdx
    ├── assets/
    │   ├── profile.jpg
    │   └── projects/
    │       ├── beever.jpg
    │       ├── evam-dashboard.jpg
    │       ├── hikariprints.jpg
    │       ├── react-native-chess.png
    │       └── singhealth-project.png
    ├── styles/
    │   └── global.css                  # @theme tokens, base, scroll-driven keyframes
    ├── components/
    │   ├── Shapes.astro                # all floating SVG icons
    │   ├── ParallaxLayer.astro         # CSS-driven parallax wrapper (--speed)
    │   ├── ProjectCard.astro
    │   ├── WaveDivider.astro
    │   ├── ThemeToggle.tsx             # React island, client:load
    │   ├── ScrollToTop.tsx             # React island, client:visible
    │   └── SEO.astro
    ├── layouts/
    │   └── BaseLayout.astro            # html, head, theme bootstrap, ThemeToggle slot
    ├── sections/
    │   ├── Hero.astro
    │   ├── Projects.astro
    │   ├── About.astro
    │   └── Contact.astro
    └── pages/
        ├── index.astro                 # composes the four sections
        └── 404.astro
```

### Component contracts

- **`Shapes.astro`** — props: `icon: 'triangle'|'hexa'|'box'|'circle'|'cross'|'arrow'|'upDown'`, `width: number`, `color: string` (CSS var name), `left: string`, `top: string`, `stroke?: boolean`, `hiddenMobile?: boolean`, `motion?: 'up-down'|'up-down-wide'|'none'`. Renders one absolutely-positioned SVG; consumer composes many.
- **`ParallaxLayer.astro`** — props: `speed: number` (typically `-0.4`–`0.4`), `class?: string`. Wraps children in a div whose `transform` is bound to a scroll-progress keyframe. Falls back to no transform under `@supports not (animation-timeline: scroll())`.
- **`ProjectCard.astro`** — props: pulled from a Projects collection entry. Renders gradient background, optimized image, title (uppercase), subtitle, body. Whole card is an `<a target="_blank" rel="noopener noreferrer">`.
- **`WaveDivider.astro`** — no props. The animated SVG `<animate>` from the original contact section, ported verbatim.
- **`ThemeToggle.tsx`** — React island, `client:load`. Reads/writes `localStorage.theme`, flips `data-theme` on `<html>`, button label toggles "Dark"/"Light".
- **`ScrollToTop.tsx`** — React island, `client:visible`. Bouncy button that calls `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- **`SEO.astro`** — props: `title?`, `description?`, `image?`, `canonical?`. Defaults from `src/site.config.ts`.

### Content collection

`src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    link: z.string().url(),
    image: image().optional(),       // src/assets/projects/* via image()
    videoUrl: z.string().url().optional(), // for floating-bridge.mp4 case
    gradient: z.string(),            // 'to right, #498467 0%, #52B788 100%'
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
```

The `floating-bridge` entry uses `videoUrl` (CloudFront-hosted `.mp4`) instead of `image`. `ProjectCard` renders a `<video autoplay muted loop playsinline>` when `videoUrl` is present, otherwise an `<Image>`.

## Animation strategy

| Original mechanism | Replacement |
|---|---|
| `@react-spring/parallax` `<Parallax>` + `<ParallaxLayer>` | CSS `animation-timeline: scroll(root)` on stacked layers with per-layer `--speed`. |
| `react-awesome-reveal` `<Fade>` | CSS `animation-timeline: view()` + `animation-range: entry 0% cover 30%`. |
| Theme's `UpDown` / `UpDownWide` keyframes | `up-down` / `up-down-wide` keyframes in `global.css`, applied via class. |
| Animated wave SVG | Same SVG with `<animate>`, ported as-is. |
| Hero CTA `parallaxRef.scrollTo(1)` | `<a href="#projects">` + `scroll-behavior: smooth`. |
| Footer scroll-to-top | `ScrollToTop.tsx` island calling `window.scrollTo`. |

### Browser compatibility

- **Chromium / Safari (current):** full parallax + reveals + micro-loops.
- **Firefox (still partial on scroll-driven animations as of 2026):** parallax depth degrades to no-op via `@supports (animation-timeline: scroll())`; shapes still float (regular keyframes); section reveals show without slide animation but still fade in (or just appear). Site is fully usable and visually intact.
- **`prefers-reduced-motion: reduce`:** parallax disabled, reveal slides removed (fades kept), shape float loops paused, wave still plays (declarative SVG, low-motion). Implemented via a single `@media` block.

## Theming

- `data-theme="dark" | "light"` on `<html>`.
- Tokens defined once in `@theme { … }` (light) and overridden in `[data-theme="dark"] { … }`.
- Boot script in `<head>` (synchronous, runs before paint):
  ```html
  <script is:inline>
    const t = localStorage.getItem('theme')
      ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = t;
  </script>
  ```
- Palette ported from cara's Theme-UI config: orange, red, blue, purple, pink, green, yellow, teal accents (mapped to Tailwind CSS variables `--color-icon-orange` etc.); `--color-divider`, `--color-background`, `--color-heading`, `--color-text` for semantic tokens.

## SEO

- `<SEO>` component sets title, description, canonical, OG image, Twitter card. Defaults from `src/site.config.ts`.
- `@astrojs/sitemap` generates `/sitemap-index.xml`.
- `public/robots.txt` allows all.
- `public/og-image.jpg` derived from existing `banner.jpg` (1200×630).

## Build & deployment

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://thespacemanatee.github.io',
  output: 'static',
  integrations: [react(), mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

No `base` set — user-site deploys at the domain root.

### `.github/workflows/deploy.yml`

- Triggers: `push` to `main`, manual `workflow_dispatch`.
- Permissions: `pages: write`, `id-token: write`, `contents: read`.
- Concurrency: `group: pages, cancel-in-progress: false`.
- Job 1 (`build`): checkout → setup pnpm → setup Node 22 with pnpm cache → `pnpm install --frozen-lockfile` → `pnpm run check` (typecheck + Biome) → `pnpm run build` → `actions/upload-pages-artifact` from `./dist`.
- Job 2 (`deploy`): needs `build` → `actions/deploy-pages@v4`.
- Uses `withastro/action@v3` to keep the workflow short.
- Pages source must be set to "GitHub Actions" in repo settings (one-time manual step; documented in README).

### Branching

- All work on `claude/port-portfolio-github-pages-O62a3`.
- No PR or merge to `main` without explicit user approval.

## Verification before claiming done

1. `pnpm run build` exits 0 with no warnings.
2. `pnpm astro check` passes (TS + Astro diagnostics, zero errors).
3. `pnpm run preview` served and walked through manually:
   - Hero renders; CTA scrolls to projects.
   - All 6 project cards render with optimized images (or video for floating-bridge), gradients, working external links (`target="_blank"`, `rel="noopener noreferrer"`).
   - About + Contact render; email + GitHub + LinkedIn links work.
   - Dark/light toggle works, persists across reload, no FOUC on first paint.
   - Scroll-to-top button bounces and works.
   - Parallax shapes float; section reveals fire on entry.
   - 404 page works at `/some-bogus-path`.
4. Lighthouse run (preview mode, mobile preset): Performance / Accessibility / Best Practices / SEO each ≥ 95.
5. Cross-browser smoke test: Chromium (full parallax), Firefox (graceful degradation via `@supports`), and Chromium with `prefers-reduced-motion: reduce` (no parallax/loops, fades only).
6. `CONTENT.md` lists every TODO marker added during the port.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| CSS scroll-driven animations are still partial in Firefox in 2026. | `@supports (animation-timeline: scroll())` gate; site degrades gracefully without parallax. |
| Stale content makes the site look outdated immediately on launch. | TODO markers + `CONTENT.md` checklist surface every line that needs the user's edits. |
| User-site root vs project-site sub-path confusion when generating links. | `site` set, no `base`. All internal links use absolute paths from root. Documented in spec. |
| `floating-bridge.mp4` is hosted on third-party CloudFront and could go away. | Keep external URL for now; project-card schema accepts either `image` or `videoUrl` so a future swap to a poster image is one frontmatter edit. |
| Theme bootstrap script causing FOUC if it fails to inline. | Inline `<script is:inline>` runs synchronously in `<head>` before body paint; fallback to `prefers-color-scheme`. |
| GitHub Pages deployment requires manual "Source: GitHub Actions" toggle. | Called out in README and verified in the deploy workflow run. |

## Implementation phases (handoff to writing-plans)

The follow-up implementation plan should sequence:

1. Repo scaffold (Astro init, deps, configs, Biome, TS strict, branch + first commit).
2. Styling foundation (Tailwind v4, design tokens, fonts API, theme bootstrap, dark mode toggle island).
3. Reusable visual primitives (`Shapes.astro`, `ParallaxLayer.astro`, scroll-driven keyframes, reveal mixins).
4. Content collection + asset migration (projects collection schema, MDX entries with TODOs, image moves).
5. Sections (Hero, Projects, About, Contact) + 404 page.
6. SEO + sitemap + robots + OG image.
7. GitHub Actions deploy workflow.
8. Cross-browser + reduced-motion + Lighthouse verification, README, `CONTENT.md`.
