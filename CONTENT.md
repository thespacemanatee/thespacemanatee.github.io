# Content refresh checklist

This site was ported from `my-portfolio-v2` (Gatsby, ~2022). The following content is preserved verbatim from that era and should be reviewed.

## Hero / intro

- [ ] `src/sections/Hero.astro` — verify the "Hello World! / My name is Chee Kit / I'm a software developer (and so much more)." copy still resonates.
- [ ] CTA text "Find out why!" — keep or update.

## About

- [ ] `src/sections/About.astro` — bio says "Final Year Computer Science student from SUTD, specialising in Software Engineering and Cloud Computing." Update to reflect current role.
- [ ] The phrase "alot of full-stack work" has a typo (`alot` → `a lot`) — preserved during port; fix when refreshing copy.

## Projects

Each entry is an MDX file in `src/content/projects/`. Marked with `# TODO: verify still relevant in 2026`.

- [ ] `01-floating-bridge.mdx` — verify game.floatingbridge.me still live; CloudFront video URL still resolves.
- [ ] `02-singhealth.mdx` — verify Netlify URL still live.
- [ ] `03-beever.mdx` — verify Play Store listing still active.
- [ ] `04-evam-dashboard.mdx` — verify GitHub repo URL.
- [ ] `05-hikari-prints.mdx` — verify shop URL.
- [ ] `06-react-native-chess.mdx` — `expo.io/@…` URL format may have changed (now `expo.dev/`).
- [ ] Add any new projects done since 2022 (just create another MDX file with `order: 7+`).
- [ ] Drop projects no longer representative (set `draft: true` in frontmatter or delete the file).

## Contact

- [ ] `src/site.config.ts` — verify `cheekit.chong98@gmail.com`, GitHub handle, LinkedIn URL.

## SEO

- [ ] `src/site.config.ts` — `description`, `twitterHandle`.
- [ ] `public/og-image.jpg` — currently the original `banner.jpg` from 2022. Generate a fresh 1200×630 social card if desired.

## Optional follow-ups

- [ ] Add a custom domain: drop a `CNAME` file in `public/` with the domain, update `site` in `astro.config.mjs`, configure DNS at the registrar.
- [ ] Add analytics (Plausible / Umami / etc.) — see `src/layouts/BaseLayout.astro`.
- [ ] Add a blog: create another content collection (`src/content/posts/`), routes `src/pages/blog/[slug].astro`.
- [ ] Suppress autoplay on the Floating Bridge `<video>` for users with `prefers-reduced-motion: reduce`. Currently the muted/looping autoplay is left as-is; if a future a11y pass cares, add a tiny inline script that pauses videos when the media query matches.
- [ ] Migrate `profile.jpg` from the original repo if the About section grows into a layout with a portrait. Currently unused.
- [ ] Use `Cabinet Grotesk` instead of `Outfit` for display font (Fontshare-hosted; needs a self-hosted setup since it's not on Google Fonts).
