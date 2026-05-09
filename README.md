# thespacemanatee.github.io

Personal portfolio site for Chee Kit. Live at https://thespacemanatee.github.io.

## Stack

- [Astro 5](https://astro.build) (`output: 'static'`)
- React 19 (two islands only: `ThemeToggle`, `ScrollToTop`)
- Tailwind CSS v4 via `@tailwindcss/vite`, CSS-first `@theme` config
- Astro Fonts API + variable fonts (Inter + Outfit)
- MDX content collections for projects
- Biome for lint + format
- Vitest + Testing Library for the React island unit test
- pnpm 10, Node 22 LTS

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm check        # astro check + biome check
pnpm test         # vitest
pnpm build        # static build to ./dist
pnpm preview      # serve ./dist locally
```

## Deployment

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

**One-time setup in GitHub repo settings → Pages:** set "Source" to "GitHub Actions". This is required and not done by the workflow itself.

## Content

Project entries live in `src/content/projects/*.mdx`. Add or edit a project by creating/editing one MDX file with the schema defined in `src/content.config.ts` (title, subtitle, link, image OR videoUrl, gradient, order).

Stale content from the original 2022 portfolio is marked with `TODO` comments. See `CONTENT.md` for the checklist.

## Architecture notes

- **Parallax** is implemented entirely with CSS scroll-driven animations (`animation-timeline: scroll(root)`); no JavaScript animation library. Browsers without scroll-timeline support (Firefox, partial as of 2026) gracefully degrade to static layers — site stays usable.
- **Section reveals** use CSS `animation-timeline: view()` on the `.reveal-*` classes defined in `src/styles/global.css`.
- **Theme bootstrap** runs synchronously in `<head>` to avoid FOUC; `ThemeToggle.tsx` reads/writes the same `localStorage.theme` key.
- `prefers-reduced-motion: reduce` neutralizes float loops, parallax translation, and reveal slides.
