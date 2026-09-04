# The master prompt

This is the brief Meridian was built from — a reusable, anti-"AI-slop" prompt for generating a
flagship Angular 22 dashboard. Copy it into your coding agent as-is, or swap the two marked slots
(**product domain** and **design direction**). The design tokens are the biggest levers for
uniqueness: pin your own accent color and typeface trio and the whole app becomes yours.

---

## ROLE
You are a senior product designer + Angular staff engineer building an open-source flagship
dashboard meant to be screenshotted and shared. Not a template. Not a v0 default. A statement piece.

## THE PRODUCT  «swap this slot»
An open-source, self-hostable analytics console for indie SaaS founders — real revenue (MRR,
churn, expansion, a revenue bridge), usage (active accounts, feature adoption, an activation
funnel, retention cohorts) and account health. Give it a name and a wordmark. Seed it with
**realistic, internally-consistent** data (MRR is the running sum of monthly movements; the bridge
reconciles to the latest month; table rows roll up to the headline totals). No lorem ipsum, no
`$0 / --`, no gray placeholder rectangles.
*(Alt domains: energy/grid monitoring, a logistics fleet tracker, an air-quality network, an
artist's streaming analytics.)*

## TECH STACK — Angular 22, modern idioms only
- Standalone components; **no NgModules**.
- Signals everywhere; `input()` / `output()` / `model()`, `computed()`, `effect()`.
- New control flow (`@if` / `@for` / `@switch`) and `@defer` for heavy/below-the-fold widgets.
- `provideZonelessChangeDetection()`. New application builder (esbuild/Vite).
- SSR + hydration (`provideClientHydration(withEventReplay())`) with prerendered static routes.
- `ChangeDetectionStrategy.OnPush`, `inject()`, strict TypeScript, lazy routes.
- Styling: modern CSS only (custom properties, `color-mix`, `oklch`, `clamp`, container-friendly
  grids). No component library that imposes its own look; if Tailwind, fully themed via tokens.

## DESIGN DIRECTION  «swap this slot» — "Editorial data terminal"
Calm, dense, premium — Swiss typographic discipline meets a trading terminal. Define real tokens
and use them **everywhere**:
- **Type:** display/headings = a variable serif with soul (Fraunces); UI = a neutral grotesque
  (Hanken Grotesk / Geist / Public Sans); **every number** = a monospace with tabular figures
  (JetBrains Mono / Geist Mono). Establish a modular scale with `clamp()`.
- **Color:** warm near-black + warm off-white "paper" neutrals (via `oklch`), and **one** signature
  accent used sparingly (Signal Orange — not indigo→pink). Derive a full neutral ramp + semantic
  tokens (positive / negative / warning / info).
- **Space & grid:** strict 4/8px grid, generous margins, hard alignment. Density is a feature.
- **Edges:** a deliberate, mostly-crisp radius language. Hairline borders + subtle layered
  elevation, never heavy drop shadows.

## ANTI-SLOP — hard rules (do NOT)
- No purple/indigo→pink gradients, no gradient blobs, no glassmorphism-everywhere, no card glow.
- No emoji as icons. No default Chart.js/Material look. No stock hero photo.
- No grid of identical shadowed cards — vary hierarchy and sizes (bento layout).
- No decorative sparklines that carry no data. No filler copy — write real microcopy.
- No centered marketing hero; this is an app. If it looks like a Bootstrap admin theme, start over.

## SCREENS & LAYOUT
- Persistent collapsible left rail + top bar with global search (⌘K palette), date range, theme
  toggle, notifications.
- **Overview:** a hero KPI row (large tabular numerals + delta + sparkline), then a **bento grid**
  mixing chart sizes — not a uniform 3-col grid.
- A **table-heavy** page: sortable (with `aria-sort`), searchable, plan filters, inline sparklines,
  health bars, a density toggle, and a working CSV export.
- A settings page that doubles as a **design-token showcase** (palette swatches, type specimens).
- Responsive: reflow the bento and rail into a mobile drawer; genuinely usable at ≤ 900px.

## DATA VISUALIZATION
- Use **Apache ECharts** as the primary engine and **D3** for one or two bespoke, signature visuals
  no template has (e.g., a revenue-bridge waterfall). Style **every** chart to the design tokens —
  custom fonts, tabular numerals, our axis/grid/tooltip chrome. No library defaults.
- Include variety, done well: smooth area, diverging stacked bars, a retention **heatmap**, a
  **funnel**, ranking bars, and the custom viz. Rich tooltips, skeleton/empty/error states.
- Chart color: a purpose-built categorical palette (muted, cohesive, distinguishable in **both**
  themes), sequential ramps for magnitude — never rainbow.

## IMAGERY & ICONOGRAPHY (real assets, no placeholders)
- Icons: a crisp inline-SVG set driven by `currentColor` — consistent stroke, never emoji/raster.
- Brand mark + empty-state illustrations: hand-authored SVG so they theme and stay sharp.
- For raster art (hero, textures, avatars), generate a **cohesive** set from one art-direction spec
  with a top-tier model (Flux / Imagen / Midjourney / Ideogram). Optimize to AVIF/WebP, lazy-load,
  alt text on everything.
- Open-source hygiene: OFL fonts, MIT/Apache libraries, freely-licensable generated images.

## INTERACTION, THEMING, A11Y, PERF
- Purposeful micro-interactions (⌘K palette, number roll-ups, chart transitions); fast easing;
  honor `prefers-reduced-motion`.
- First-class light **and** dark themes via CSS custom properties; set before first paint; charts
  re-theme reactively.
- WCAG 2.2 AA: contrast, keyboard nav, focus-visible, ARIA, chart fallbacks.
- Lighthouse 95+, route-level code splitting, keep heavy libs lazy, no layout shift.

## DELIVERABLES
Reusable primitives (Card/StatTile/ChartFrame/DataTable/CommandPalette/token file), a seed-data
module, README with run instructions, MIT LICENSE, CONTRIBUTING. `npm install && npm start` just works.

## DEFINITION OF DONE
It reads like a product a design-led startup shipped — distinctive, cohesive, dense, screenshot-worthy
in both themes. If a viewer can't tell it was AI-built, you nailed it.
