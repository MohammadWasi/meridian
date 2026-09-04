import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../core/icon';
import { Sparkline } from './sparkline';
import { Kpi } from '../data/seed';

@Component({
  selector: 'app-stat-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Sparkline],
  template: `
    <article class="tile" [class.feat]="featured()">
      <header>
        <span class="eyebrow">{{ kpi().label }}</span>
      </header>

      <div class="value num">{{ kpi().value }}</div>

      <div class="meta">
        <span class="badge" [class.pos]="kpi().good" [class.neg]="!kpi().good">
          <app-icon [name]="kpi().direction === 'up' ? 'arrow-up' : 'arrow-down'" [size]="11" [stroke]="2.2" />
          {{ kpi().deltaLabel }}
        </span>
        <span class="foot">{{ kpi().footnote }}</span>
      </div>

      <app-sparkline class="spark" [data]="kpi().spark" [h]="featured() ? 48 : 36" [area]="true" />
    </article>
  `,
  styles: `
    .tile {
      display: flex; flex-direction: column; gap: var(--sp-2);
      padding: var(--sp-4);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-1);
      min-height: 100%;
      transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease);
    }
    .tile:hover { border-color: var(--border-strong); transform: translateY(-1px); }
    header { display: flex; align-items: center; justify-content: space-between; }
    .value {
      font-size: var(--step-3);
      font-weight: 500;
      line-height: 1;
      color: var(--text);
    }
    .feat .value { font-size: var(--step-4); }
    .meta { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
    .foot { font-size: var(--step--2); color: var(--text-3); }
    .spark { margin-top: auto; width: 100%; color: var(--accent); }
    .feat .spark { color: var(--accent); }
  `,
})
export class StatTile {
  readonly kpi = input.required<Kpi>();
  readonly featured = input(false);
}
