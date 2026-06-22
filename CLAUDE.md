# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing site for **OpenSea**, a kayak & paddle-surf rental business in Almuñécar (Costa Tropical, Spain). Single-page-app per route, heavily SEO-tuned, trilingual (EN/ES/FR). Originally scaffolded by Lovable; deployed to GitHub Pages.

## Commands

```sh
npm run dev          # Vite dev server on http://localhost:8080 (host ::)
npm run build        # Production SPA build -> dist/  (this is what CI deploys)
npm run build:ssg    # vite-ssg static prerender (NOT used by CI; see note)
npm run build:dev    # build in development mode
npm run lint         # eslint over the repo
npm run preview      # serve the built dist/
npm run deploy       # build + push dist/ to gh-pages branch manually
```

No test runner is configured — there are no tests.

## Architecture

**Stack:** Vite + React 18 + TypeScript, Tailwind + shadcn/ui (Radix), react-router-dom v6, react-helmet-async. Path alias `@` → `src/`.

**Page composition:** Each route is a thin page in `src/pages/` that renders `<SEO>` + `<SchemaMarkup>` + a fixed stack of section components from `src/components/` (Navbar, Hero, Services, Prices, BusinessHours, Location, AboutUs, Footer). `src/components/ui/` is generated shadcn primitives — don't hand-edit unless intentionally customizing.

**Routing is the SEO surface.** Every page exists at three URLs (one per language) with keyword-rich slugs, all declared explicitly in `src/App.tsx`. There is no `:lang` param — routes are literal (`/kayak-rental-almunecar`, `/es/alquiler-kayak-almunecar`, `/fr/location-kayak-almunecar`, …). Same component renders for all three; language is inferred from the path.

**i18n is custom, not a library.** `src/contexts/LanguageContext.tsx` is the single source of truth:
- `language` state is derived from the URL prefix (`/es*` → es, `/fr*` → fr, else en) via a `useEffect` on `location.pathname`.
- `t(key)` looks up a flat `translations` object keyed by language. All UI strings live here.
- `routePaths` maps the 4 logical pages × 3 languages to their literal URLs. `setLanguage()` figures out the current page type by substring-matching the path and navigates to the equivalent URL in the new language.
- Per-page SEO copy (title/description/keywords) is NOT in LanguageContext — it lives inline in each page as a `seoData[language]` object.

**SEO machinery** (the point of the project):
- `src/components/SEO.tsx` — per-page `<Helmet>`: title, description, canonical, hreflang alternates for en/es/fr + x-default, OG/Twitter cards, geo meta, and a default `LocalBusiness` JSON-LD (overridable via `structuredData` prop).
- `src/components/SchemaMarkup.tsx` — additional global JSON-LD (Organization, SportsActivityLocation, FAQ, etc.).
- `vite-plugin-sitemap` in `vite.config.ts` generates `sitemap.xml` + `robots.txt`; its `dynamicRoutes` array must list every route.
- See `SEO-IMPROVEMENTS.md` for the full SEO rationale and keyword strategy.

**Images:** `src/components/OptimizedImage.tsx` does IntersectionObserver lazy-loading + auto srcSet generation (expects `-400w`/`-800w`/`-1200w` variants to exist). `vite-plugin-imagemin` compresses assets at build time. Source images live in `public/images/`.

## Adding or changing a route/page

A new localized page touches these places — keep them in sync or SEO breaks:
1. `src/lib/routes.ts` — add the page to `routePaths` (all 3 langs). This is the **single source** for the URL slugs: `LanguageContext` (hreflang lookup), `vite.config.ts` sitemap `dynamicRoutes`, and `scripts/prerender.mjs` (via `ROUTES`, re-exported from `entry-server.tsx`) all derive from it automatically.
2. `src/App.tsx` — add the three `<Route>` entries (en/es/fr).
3. `src/contexts/LanguageContext.tsx` — extend the page-type matching in `setLanguage()`; add any new `t()` keys to all three `translations` blocks.
4. The page component — provide `seoData` for all three languages and pass it to `<SEO>`.

Adding a UI string: add the key to **all three** language blocks in `translations`, then use `t('key')`.

## Deployment & gotchas

- **CI** (`.github/workflows/deploy.yml`) deploys to GitHub Pages via `peaceiris/actions-gh-pages` on push to `main`, running **`npm run build:ssg`** — `vite build` (client) + `vite build --config vite.config.ssr.ts` (server) + `node scripts/prerender.mjs`, which writes a real `dist/<route>/index.html` for every route plus `dist/404.html`. CI does **not** run `npm run gen:images`, so the resized image variants in `public/images/` must stay committed.
- **One canonical domain: `opensea-almunecar.es`.** It lives in `src/lib/site.ts` (`SITE_URL`) and the `deploy.yml` `cname:`; everything else derives from there. The full-res source PNGs live in `image-sources/` (out of `public/`) so they don't ship to `dist`; `npm run gen:images` reads them and writes variants into `public/images/`.
- `base: "/"` in `vite.config.ts` assumes serving from a domain root (custom domain), not a project subpath.
- Production builds drop `console.*` and `debugger` (terser), so debug logging won't survive `npm run build`.
- `index.html` hardcodes Google Analytics (gtag `G-8382NZEPVG`) and a Lovable (`gpteng.co`) script — leave the marked script tag/comment intact.
