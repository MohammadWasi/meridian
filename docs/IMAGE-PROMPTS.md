# Image-generation prompts

Meridian's in-app art — the brand mark, empty-state illustration and avatars — is hand-authored SVG
(it themes and stays crisp). Use these prompts when you want **raster** art with a top-tier model:
a marketing hero, background textures, or photographic avatars.

The goal is a **cohesive set**. Prepend the *Style DNA* block to every prompt so all outputs share
one art direction. Then swap the subject line.

## Which tool
- **Flux.1 (Black Forest Labs)** — best all-round quality for illustration & texture. *(Recommended.)*
- **Google Imagen 3 / "Nano Banana" (Gemini)** — great for photoreal + clean edits.
- **Midjourney v6+** — strongest for mood/hero imagery; add `--style raw --ar 16:9`.
- **Ideogram** — use when the image must contain **legible text** (a logo lockup, a labeled cover).

## Style DNA (prepend to every prompt)
```
Editorial data-terminal art direction. Warm, restrained palette: warm near-black #141210 and warm
off-white #fbf9f5, with a single signature accent Signal Orange #ea5b2a used sparingly. Flat, refined,
confident; Swiss/editorial sensibility; precise thin line work; generous negative space. Muted,
cohesive, premium. NOT glossy 3D blobs, NOT corporate-memphis, NOT neon, NOT gradient mush.
```

## Negative prompt (for models that support one)
```
purple, indigo-to-pink gradient, glassmorphism, neon glow, drop shadows everywhere, 3d blob mascots,
corporate memphis, clip art, stock-photo cheesiness, watermark, jpeg artifacts, text errors, clutter
```

---

## 1. Brand mark / logo lockup  → `public/brand/logo.png` (use Ideogram for the wordmark)
```
{Style DNA}
A minimal geometric logo mark for "Meridian", a SaaS analytics console: a thin circle crossed by a
horizontal meridian line, with a small ascending trend line breaking the top-right of the circle and
ending in a Signal Orange dot. Beside it, the wordmark "Meridian" set in an elegant high-contrast
serif. Monochrome ink on off-white, accent only on the dot. Vector-clean, balanced, 1:1 and wide
lockup variants.
```

## 2. Empty-state illustrations (a matched set of 3) → `public/illustrations/empty-*.png`
Keep the same line weight, palette and framing across all three.
```
{Style DNA}
A single editorial line-art illustration on a transparent/paper background, thin 2px strokes, one
Signal Orange highlight object. Subject: "no results found" — a stylized document/table with a
magnifying glass over it. Calm, spacious, centered. ~640×480.
```
Variants (swap the subject): `"no accounts yet — an open, empty ledger with a single seedling"` ·
`"connection lost — an unplugged data cable and a dotted signal arc"`.

## 3. Avatar set (photographic, diverse) → `public/avatars/user-01..08.png`
```
{Style DNA}
Studio headshot of a professional, soft warm key light, plain warm off-white #fbf9f5 background,
natural expression, shoulders-up, subtle film grain, muted color grade that leans warm. Square 1:1,
512×512. [vary: age, ethnicity, gender presentation, hair] Consistent lighting and background across
the whole set.
```
> If you'd rather not use synthetic faces, the app already ships tasteful monogram avatars — keep those.

## 4. Marketing / hero image → `docs/hero.png` (README, landing)
```
{Style DNA}  --ar 16:9 --style raw
A wide, atmospheric still-life of a "data terminal": a matte dark desk surface with faint printed
grid paper, an abstract glowing line-chart rising left-to-right rendered as thin Signal Orange
strokes, a few crisp UI cards floating with real numbers, shallow depth of field. Quiet, premium,
editorial. No literal screens, no logos.
```

## 5. Background texture (subtle, tileable) → `public/textures/paper.webp`
```
{Style DNA}
A very subtle seamless tileable texture: fine warm-paper grain with a faint 8px dot grid, extremely
low contrast, near-invisible. Off-white #fbf9f5. Must tile without visible seams. 512×512.
```

---

## Output & integration
- Export **AVIF or WebP** for raster (PNG only where transparency + sharp edges matter); provide
  `@1x` and `@2x`. Compress (e.g. `squoosh`, `sharp`).
- Drop files in `public/` (served at the site root) and reference by path, e.g.
  `<img src="illustrations/empty-search.avif" alt="No results" loading="lazy" width="…" height="…">`.
  Always set `width`/`height` (no layout shift) and a real `alt`.
- Keep the **hand-drawn SVGs** for anything that must adapt to light/dark — raster can't `currentColor`.

## Licensing (this is open source)
Only ship images you can license permissively. Prefer models/plans that grant commercial + open
redistribution rights, keep the generation prompts (above) in-repo for provenance, and avoid
depicting real, identifiable people.
