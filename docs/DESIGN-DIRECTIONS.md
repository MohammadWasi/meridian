# Design directions

Meridian ships in **"Editorial data terminal."** Below are three alternative aesthetics you can
retarget the *same* codebase to. Each is defined as a set of token overrides — the app was built so
that the design system lives in two files:

- **`src/styles.css`** — the CSS custom properties (`:root` for light, `:root[data-theme="dark"]`
  for dark) plus the font stacks.
- **`src/app/data/chart-theme.ts`** — the matching `LIGHT` / `DARK` palettes handed to ECharts & D3.

Change both and everything — KPIs, charts, tables, the command palette — follows. Update the fonts
in `src/index.html` (Google Fonts link) and `--font-display / --font-ui / --font-mono`.

---

## 0. Editorial data terminal — *shipped*

Warm neutrals, Signal Orange accent, Fraunces + Hanken Grotesk + JetBrains Mono. Calm, dense,
premium. This is the default; use it as the reference for how the tokens map.

---

## 1. Kyoto Paper — quiet, warm, generous

A serene, whitespace-forward take. Fewer numbers shouting, more editorial calm. Light-first.

- **Fonts:** display `Newsreader` (or keep Fraunces) · UI `Hanken Grotesk` · mono `IBM Plex Mono`.
- **Accent:** muted terracotta / clay.

```css
:root {
  --bg:#f6f4ee; --bg-sunken:#efece3; --surface:#fffdf8; --surface-2:#f2efe6; --surface-3:#e9e5d9;
  --border:#e2ddce; --border-strong:#d3ccb9;
  --text:#26241d; --text-2:#5c574c; --text-3:#8c8578;
  --accent:#b5623f; --accent-2:#96482a;
  --pos:#5b7f52; --neg:#b0503f; --warn:#c08a2e; --info:#4b7d84;
}
```
Chart series (muted, botanical): `#b5623f, #4b7d84, #c08a2e, #7d8a5a, #a9736e, #5b7f52, #86736b`.
Increase `--sp-*` usage in page padding; soften nothing about the crisp radii — keep it disciplined.

---

## 2. Nocturne — technical, high-contrast, electric

A dark-first "control room." Deep desaturated ink, a single electric accent, maximum data density.
Restrained — the neon is a scalpel, not a floodlight.

- **Fonts:** display `Space Grotesk` · UI `Geist` / `Inter Tight` · mono `Geist Mono` / `JetBrains Mono`.
- **Accent:** electric lime **or** cyan (pick one, use it sparingly).

```css
:root[data-theme="dark"] {
  --bg:#0c0e10; --bg-sunken:#08090a; --surface:#131619; --surface-2:#191d21; --surface-3:#20252a;
  --border:#242a30; --border-strong:#333b43;
  --text:#e8edf1; --text-2:#9aa6b0; --text-3:#66707a;
  --accent:#c6f24e;         /* or cyan #46e5d1 */
  --accent-2:#d7ff6b;
  --pos:#46d19a; --neg:#ff6673; --warn:#ffc24b; --info:#5cc2ff;
}
```
Chart series (cool, technical): `#c6f24e, #5cc2ff, #ff9e64, #b48cff, #46d19a, #ff6673, #7dd3fc`.
Lower elevation, sharpen borders (`--r-md: 6px`), and lean on the mono font for labels too.

---

## 3. Almanac — newsprint & ink

An editorial, almost-printed feel: cream paper, true-black ink, one classic red. Heavy display
serif, generous hairlines, understated color. Great for a "report" personality.

- **Fonts:** display `Fraunces` (heavier optical weight) · UI `Public Sans` · mono `Commit Mono` / `JetBrains Mono`.
- **Accent:** vermilion / classic editorial red.

```css
:root {
  --bg:#faf7f0; --bg-sunken:#f2ede1; --surface:#ffffff; --surface-2:#f5f1e8; --surface-3:#ebe6d9;
  --border:#e3ddcd; --border-strong:#cfc7b3;
  --text:#141210; --text-2:#4a463e; --text-3:#807a6d;
  --accent:#cc3b28; --accent-2:#a82a1a;
  --pos:#2f7d54; --neg:#cc3b28; --warn:#b8860b; --info:#365e7d;
}
```
Chart series (ink + one red): `#cc3b28, #365e7d, #b8860b, #4a463e, #2f7d54, #8a5a44, #6b6f4e`.
Push contrast: black hairlines (`--border-strong` darker), serif section headings a size larger.

---

### Applying a direction — checklist

1. Replace the `:root` (light) and `:root[data-theme="dark"]` blocks in `styles.css`.
2. Update `--font-display / --font-ui / --font-mono` and the Google Fonts `<link>` in `index.html`.
3. Mirror the colors into `LIGHT` / `DARK` (and `series`, `heatLow`) in `chart-theme.ts`.
4. Re-check contrast in both themes and rebuild (`npm run build`).
