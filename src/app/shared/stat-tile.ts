import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from '../core/icon';
import { Sparkline } from './sparkline';
import { Kpi } from '../data/seed';

@Component({
  selector: 'app-stat-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Sparkline],
  template: `
    <article class="tile" [class.feat]="featured()" [style.--tile-accent]="accent()">
      <header>
        <span class="eyebrow">{{ kpi().label }}</span>
        <span class="chip"><app-icon [name]="kpi().icon" [size]="16" [stroke]="1.8" /></span>
      </header>

      <div class="value num">{{ kpi().value }}</div>

      <div class="meta">
        <span class="badge" [class.pos]="kpi().good" [class.neg]="!kpi().good">
          <app-icon [name]="kpi().direction === 'up' ? 'arrow-up' : 'arrow-down'" [size]="11" [stroke]="2.2" />
          {{ kpi().deltaLabel }}
        </span>
        <span class="foot">{{ kpi().footnote }}</span>
      </div>

      <app-sparkline class="spark" [data]="kpi().spark" [h]="featured() ? 54 : 40" [area]="true" />
    </article>
  `,
  styles: `
    .tile {
      position: relative;
      display: flex; flex-direction: column; gap: var(--sp-2);
      padding: var(--sp-4);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-1);
      min-height: 100%;
      overflow: hidden;
      transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
    }
    .tile::before {
      content: ''; position: absolute; inset: 0 0 auto 0; height: 2px;
      background: var(--tile-accent); opacity: 0; transition: opacity var(--dur) var(--ease);
    }
    .tile:hover { border-color: var(--border-strong); transform: translateY(-2px); box-shadow: var(--shadow-2); }
    .tile:hover::before { opacity: .8; }
    .feat {
      background: linear-gradient(165deg, color-mix(in oklab, var(--accent) 9%, var(--surface)), var(--surface) 62%);
      border-color: var(--accent-line);
    }
    .feat::before { opacity: 1; }

    header { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); }
    .chip {
      width: 30px; height: 30px; flex-shrink: 0;
      display: grid; place-items: center; border-radius: var(--r-sm);
      background: color-mix(in oklab, var(--tile-accent) 14%, var(--surface));
      color: var(--tile-accent);
    }
    .value { font-size: var(--step-3); font-weight: 500; line-height: 1; color: var(--text); }
    .feat .value { font-size: var(--step-4); }
    .meta { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
    .foot { font-size: var(--step--2); color: var(--text-3); }
    .spark { margin-top: auto; width: 100%; color: var(--tile-accent); }
  `,
})
export class StatTile {
  readonly kpi = input.required<Kpi>();
  readonly featured = input(false);

  protected readonly accent = computed(() =>
    this.featured() ? 'var(--accent)' : this.kpi().good ? 'var(--pos)' : 'var(--neg)',
  );
}
