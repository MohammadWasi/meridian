import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Titled surface for a chart or any block. Project the body as default content
 * and optional controls via `[actions]`, a caption via `[foot]`.
 */
@Component({
  selector: 'app-chart-frame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="frame">
      <header>
        <div class="titles">
          @if (eyebrow()) { <span class="eyebrow">{{ eyebrow() }}</span> }
          <h3>{{ title() }}</h3>
        </div>
        <div class="actions"><ng-content select="[actions]" /></div>
      </header>

      <div class="body" [style.height.px]="bodyHeight()">
        <ng-content />
      </div>

      <div class="foot"><ng-content select="[foot]" /></div>
    </section>
  `,
  styles: `
    .frame {
      display: flex; flex-direction: column;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-1);
      overflow: hidden;
      height: 100%;
    }
    header {
      display: flex; align-items: flex-start; justify-content: space-between; gap: var(--sp-3);
      padding: var(--sp-4) var(--sp-4) var(--sp-3);
    }
    .titles { display: flex; flex-direction: column; gap: 3px; }
    h3 {
      font-family: var(--font-display);
      font-optical-sizing: auto;
      font-size: var(--step-1);
      font-weight: 500;
      letter-spacing: -.015em;
    }
    .actions { display: flex; align-items: center; gap: var(--sp-2); flex-shrink: 0; }
    .body { padding: 0 var(--sp-3) var(--sp-2); min-height: 0; }
    .foot:not(:empty) {
      padding: var(--sp-3) var(--sp-4);
      border-top: 1px solid var(--hairline);
      color: var(--text-2);
      font-size: var(--step--1);
    }
  `,
})
export class ChartFrame {
  readonly title = input.required<string>();
  readonly eyebrow = input('');
  readonly bodyHeight = input(248);
}
