# CLAUDE.md - Astro Website Project Guide

This repo is the source for https://www.kay-rottmann.de, built with Astro and
deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to
`master`.

## Build & Dev Commands
- Install deps: `npm ci` (requires Node >= 22.12.0)
- Dev server: `npm run dev`
- Production build: `npm run build` (outputs `dist/`)
- Preview build: `npm run preview`

## Project Layout
- `src/` — Astro pages, components, layouts, content
- `public/` — static assets copied verbatim into `dist/`
- `public/webdemos/` — legacy reveal.js slide decks, audio samples, and
  impulse-response demos; ships untouched as part of the build output
- `scripts/` — Node helpers (`generate-og-image.mjs`, `generate-favicons.mjs`)
- `astro.config.mjs` — site config (i18n: de default, en secondary)

## Deployment
GitHub Actions builds with `npm run build` and publishes `./dist` via
`actions/upload-pages-artifact` + `actions/deploy-pages`. No manual steps.
