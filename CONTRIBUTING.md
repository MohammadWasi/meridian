# Contributing to Meridian

Thanks for your interest! Meridian is a design-led reference dashboard, so contributions are
judged on both code quality and visual craft.

## Getting set up

```bash
npm install
npm start        # http://localhost:4200
```

## Ground rules

- **Angular 22 idioms only.** Standalone components, signals, the new control flow, `inject()`,
  `ChangeDetectionStrategy.OnPush`. No NgModules, no `zone.js` — the app is zoneless.
- **SSR-safe.** Guard browser-only APIs (`localStorage`, `document`, ECharts, `ResizeObserver`)
  behind `isPlatformBrowser` / `afterNextRender`. Everything must render on the server.
- **Use the design tokens.** Never hard-code colors, spacing, radii or fonts in a component —
  reference the CSS custom properties in [`src/styles.css`](src/styles.css). Charts pull from
  [`chart-theme.ts`](src/app/data/chart-theme.ts) so they stay in sync with both themes.
- **Both themes are first-class.** Test light *and* dark before opening a PR.
- **Accessibility is not optional.** Keyboard paths, focus-visible, ARIA, and
  `prefers-reduced-motion` must keep working.

## Checks before a PR

```bash
npm run build           # must pass with no new budget errors
```

- Verify `/overview`, `/accounts`, `/settings` in both themes and at mobile width (≤ 900px).
- Keep the initial bundle lean — heavy libraries (like ECharts) must stay lazy-loaded.

## Commits & PRs

- Small, focused commits with clear messages.
- Describe the visual change (before/after screenshots welcome) as well as the code change.

By contributing you agree your work is licensed under the [MIT License](LICENSE).
