<div align="center">
  <img src="public/brand/mark.svg" width="64" height="64" alt="Meridian" />

  <h1>Meridian</h1>

  <p><strong>An open-source, self-hostable analytics console for SaaS teams.</strong><br/>
  Built with Angular 22 — zoneless, SSR, signals — and designed as a statement piece, not a template.</p>

  <p>
    <img alt="Angular 22" src="https://img.shields.io/badge/Angular-22-DD0031?style=flat-square" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-1e9e6a?style=flat-square" />
    <img alt="SSR" src="https://img.shields.io/badge/SSR-prerender%20%2B%20zoneless-ea5b2a?style=flat-square" />
  </p>
</div>

---

Meridian is a demonstration of what a modern Angular dashboard can look and feel like when the
design gets the same care as the code. It ships with a full quarter of realistic (fictional) SaaS
data — MRR movements, retention cohorts, an activation funnel, feature adoption and a live account
book — so every chart tells a coherent story out of the box.

> **Design direction: "Editorial data terminal."** Warm neutrals, one signature accent
> (*Signal Orange*), a serif for voice (**Fraunces**), a grotesque for the interface
> (**Hanken Grotesk**), and a monospace for every number (**JetBrains Mono**). Dense, quiet,
> and premium — the opposite of a stock admin theme.

## Highlights

- **Angular 22, modern idioms only** — standalone components, signals & signal inputs, the new
  control flow (`@if` / `@for` / `@switch`), `provideZonelessChangeDetection()`, SSR with
  prerendering and event-replay hydration.
- **First-class light *and* dark themes** — both designed, not inverted. Charts re-theme reactively
  through computed signals; the theme is set before first paint to avoid a flash.
- **Real data visualization** — five bespoke, fully-restyled [Apache ECharts](https://echarts.apache.org/)
  charts (area, diverging stacked bars, retention heatmap, funnel, adoption bars) plus a **custom
  D3 revenue-bridge waterfall** rendered as reactive, SSR-safe SVG.
- **A ⌘K command palette**, a collapsible rail, a responsive bento grid, a sortable/filterable
  data table with a real CSV export, and considered empty / hover states.
- **Accessible & fast** — keyboard-navigable, `aria-sort` tables, focus-visible rings,
  `prefers-reduced-motion` support, and a ~86 KB gzipped initial payload (ECharts loads on demand).

## Screenshots

Run it locally (`npm start`) to see it live. `/overview` is the flagship; `/accounts` is the
data-table showcase; `/settings` exposes the design tokens. Add captured PNGs to `docs/` if you
want them embedded here.

## Quick start

```bash
npm install
npm start          # dev server with SSR at http://localhost:4200
```

Build & serve the production (prerendered) bundle:

```bash
npm run build
npm run serve:ssr:meridian
```

Requires Node 20.19+ (built and tested on Node 24).

## Project structure

```
src/app/
├─ core/            theme service, icon set, nav model, formatters
├─ shared/          chart directive (ECharts bridge), stat tile, chart frame,
│                   sparkline, command palette
├─ layout/          sidebar, topbar, layout state
├─ data/            typed seed data, viz palette, themed ECharts option builders
├─ viz/             custom D3 revenue-bridge waterfall
└─ features/        overview · accounts · settings (lazy routes)
```

The design system lives in [`src/styles.css`](src/styles.css) (tokens) and
[`src/app/data/chart-theme.ts`](src/app/data/chart-theme.ts) (the matching chart palette).
Change the accent in both and the whole app — charts included — follows.

## Design & assets

- **Fonts** are open-licensed (OFL): Fraunces, Hanken Grotesk, JetBrains Mono, loaded via Google Fonts.
- **Icons** are a hand-built inline-SVG set (`core/icon.ts`) — `currentColor`, no emoji, no raster.
- **Illustrations & the brand mark** are hand-authored SVG so they theme and stay crisp.
- Want raster art (a hero image, textures, avatar photography)? Ready-to-run prompts for
  Flux / Imagen / Midjourney / Ideogram are in [`docs/IMAGE-PROMPTS.md`](docs/IMAGE-PROMPTS.md).
- The brief that produced this project is preserved in [`docs/PROMPT.md`](docs/PROMPT.md); three
  alternative aesthetics are in [`docs/DESIGN-DIRECTIONS.md`](docs/DESIGN-DIRECTIONS.md).

## Tech

Angular 22 · TypeScript · Apache ECharts · D3 (scale) · Express (SSR). No CSS framework — the
styling is a small, hand-written token system using modern CSS (custom properties, `color-mix`,
`clamp`, container-friendly grids).

## License

[MIT](LICENSE). The seed data and company names are fictional.
