import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

let uid = 0;

/** Tiny inline-SVG sparkline. Pure math — renders identically on server & client. */
@Component({
  selector: 'app-sparkline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 ' + w() + ' ' + h()" [attr.width]="w()" [attr.height]="h()"
         preserveAspectRatio="none" aria-hidden="true" class="spark">
      <defs>
        <linearGradient [attr.id]="gid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="currentColor" stop-opacity="0.22" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0" />
        </linearGradient>
      </defs>
      @if (area()) { <path [attr.d]="areaPath()" [attr.fill]="'url(#' + gid + ')'" /> }
      <path [attr.d]="linePath()" fill="none" stroke="currentColor"
            [attr.stroke-width]="stroke()" stroke-linecap="round" stroke-linejoin="round" />
      <circle [attr.cx]="lastX()" [attr.cy]="lastY()" [attr.r]="stroke() + 0.8"
              fill="currentColor" />
    </svg>
  `,
  styles: `
    :host { display: inline-block; line-height: 0; }
    .spark { display: block; overflow: visible; }
  `,
})
export class Sparkline {
  readonly data = input.required<number[]>();
  readonly w = input(120);
  readonly h = input(34);
  readonly stroke = input(1.6);
  readonly area = input(true);

  protected readonly gid = `spk${uid++}`;

  private readonly pts = computed(() => {
    const d = this.data();
    const n = d.length;
    const min = Math.min(...d);
    const max = Math.max(...d);
    const span = max - min || 1;
    const pad = this.stroke() + 1;
    const w = this.w();
    const h = this.h();
    return d.map((v, i) => {
      const x = n === 1 ? w / 2 : (i / (n - 1)) * w;
      const y = h - pad - ((v - min) / span) * (h - pad * 2);
      return [x, y] as const;
    });
  });

  protected readonly linePath = computed(() =>
    this.pts()
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(' '),
  );

  protected readonly areaPath = computed(() => {
    const p = this.pts();
    if (!p.length) return '';
    const line = p.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
    return `M${p[0][0].toFixed(1)} ${this.h()} ${line} L${p[p.length - 1][0].toFixed(1)} ${this.h()} Z`;
  });

  protected readonly lastX = computed(() => this.pts()[this.pts().length - 1]?.[0] ?? 0);
  protected readonly lastY = computed(() => this.pts()[this.pts().length - 1]?.[1] ?? 0);
}
