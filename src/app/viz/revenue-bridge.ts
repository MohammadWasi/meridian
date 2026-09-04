import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { scaleLinear } from 'd3';
import { ThemeService } from '../core/theme.service';
import { vizTheme } from '../data/chart-theme';
import { REVENUE_BRIDGE } from '../data/seed';
import { usdCompact } from '../core/format';

interface Bar {
  x: number; y: number; w: number; h: number;
  color: string; label: string; value: string; labelY: number;
}
interface Connector { x1: number; x2: number; y: number; }

const W = 720, H = 300;
const M = { t: 34, r: 16, b: 46, l: 16 };

/**
 * Custom revenue-bridge waterfall. d3-scale handles the value→pixel mapping;
 * the SVG is rendered by Angular so it stays reactive to the theme and renders
 * on the server without touching the DOM.
 */
@Component({
  selector: 'app-revenue-bridge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 ' + W + ' ' + H" preserveAspectRatio="xMidYMid meet"
         role="img" aria-label="Revenue bridge from prior month to current month">
      <line [attr.x1]="M.l" [attr.x2]="W - M.r" [attr.y1]="baseline()" [attr.y2]="baseline()"
            [attr.stroke]="vt().grid" stroke-width="1" />

      @for (c of connectors(); track $index) {
        <line [attr.x1]="c.x1" [attr.x2]="c.x2" [attr.y1]="c.y" [attr.y2]="c.y"
              [attr.stroke]="vt().axis" stroke-width="1" stroke-dasharray="2 3" />
      }

      @for (b of bars(); track b.label) {
        <rect [attr.x]="b.x" [attr.y]="b.y" [attr.width]="b.w" [attr.height]="b.h"
              rx="3" [attr.fill]="b.color" />
        <text [attr.x]="b.x + b.w / 2" [attr.y]="b.y - 8" text-anchor="middle"
              [attr.fill]="vt().text" class="val">{{ b.value }}</text>
        <text [attr.x]="b.x + b.w / 2" [attr.y]="b.labelY" text-anchor="middle"
              [attr.fill]="vt().textMuted" class="cat">{{ b.label }}</text>
      }
    </svg>
  `,
  styles: `
    :host { display: block; width: 100%; height: 100%; }
    svg { display: block; width: 100%; height: 100%; }
    .val { font-family: var(--font-mono); font-size: 13px; font-weight: 600; }
    .cat { font-family: var(--font-ui); font-size: 11px; }
  `,
})
export class RevenueBridge {
  protected readonly W = W;
  protected readonly H = H;
  protected readonly M = M;
  private readonly theme = inject(ThemeService);
  protected readonly vt = computed(() => vizTheme(this.theme.theme()));

  private readonly y = scaleLinear().domain([0, 440_000]).range([H - M.b, M.t]);
  protected readonly baseline = () => this.y(0);

  private readonly geometry = computed(() => {
    const vt = this.vt();
    const steps = REVENUE_BRIDGE;
    const n = steps.length;
    const colW = (W - M.l - M.r) / n;
    const barW = colW * 0.56;
    const bars: Bar[] = [];
    const cumul: number[] = [];
    let running = 0;

    steps.forEach((s, i) => {
      const cx = M.l + colW * i + colW / 2;
      const x = cx - barW / 2;
      let top: number, bot: number;

      if (s.kind === 'base' || s.kind === 'total') {
        running = s.value;
        bot = this.y(0);
        top = this.y(s.value);
      } else {
        const start = running;
        const end = running + s.value;
        running = end;
        top = this.y(Math.max(start, end));
        bot = this.y(Math.min(start, end));
      }
      cumul.push(running);

      const color =
        s.kind === 'base' ? vt.textMuted
        : s.kind === 'total' ? vt.accent
        : s.kind === 'inc' ? vt.pos
        : s.label.startsWith('Contraction') ? vt.warn
        : vt.neg;

      const value =
        s.kind === 'inc' ? '+' + usdCompact(s.value)
        : s.kind === 'dec' ? '−' + usdCompact(Math.abs(s.value))
        : usdCompact(s.value);

      bars.push({
        x, y: top, w: barW, h: Math.max(bot - top, 2),
        color, label: s.label, value, labelY: H - M.b + 20,
      });
    });

    const connectors: Connector[] = [];
    for (let i = 0; i < n - 1; i++) {
      connectors.push({
        x1: bars[i].x + bars[i].w,
        x2: bars[i + 1].x,
        y: this.y(cumul[i]),
      });
    }
    return { bars, connectors };
  });

  protected readonly bars = computed(() => this.geometry().bars);
  protected readonly connectors = computed(() => this.geometry().connectors);
}
