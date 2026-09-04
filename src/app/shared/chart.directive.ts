import {
  Directive,
  ElementRef,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { EChartsOption, ECharts } from 'echarts';

/**
 * Thin, dependency-free bridge to Apache ECharts.
 * - SSR-safe: initialises only after the browser render.
 * - Reactive: re-applies whenever the `chart` option signal changes (e.g. theme).
 * - Responsive: resizes with its container. Disposes on destroy.
 */
@Directive({ selector: '[chart]' })
export class ChartDirective {
  readonly options = input.required<EChartsOption>({ alias: 'chart' });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private instance?: ECharts;
  private ro?: ResizeObserver;

  constructor() {
    afterNextRender(async () => {
      if (!this.isBrowser) return;
      const echarts = await import('echarts');
      this.instance = echarts.init(this.host.nativeElement, undefined, {
        renderer: 'canvas',
      });
      this.instance.setOption(this.options());
      this.ro = new ResizeObserver(() => this.instance?.resize());
      this.ro.observe(this.host.nativeElement);
    });

    // Re-render on any option change (guarded until the instance exists).
    effect(() => {
      const opts = this.options();
      this.instance?.setOption(opts, true);
    });

    inject(DestroyRef).onDestroy(() => {
      this.ro?.disconnect();
      this.instance?.dispose();
    });
  }
}
