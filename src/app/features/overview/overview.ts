import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { Icon, IconName } from '../../core/icon';
import { StatTile } from '../../shared/stat-tile';
import { ChartFrame } from '../../shared/chart-frame';
import { ChartDirective } from '../../shared/chart.directive';
import { RevenueBridge } from '../../viz/revenue-bridge';
import { vizTheme } from '../../data/chart-theme';
import {
  mrrAreaOption, movementsOption, cohortHeatmapOption, funnelOption, adoptionOption,
} from '../../data/chart-options';
import {
  KPIS, MONTHS, COHORTS, FUNNEL, ADOPTION, ACTIVITY, PLATFORM, EventKind,
} from '../../data/seed';

@Component({
  selector: 'app-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatTile, ChartFrame, ChartDirective, RevenueBridge],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private readonly theme = inject(ThemeService);
  private readonly vt = computed(() => vizTheme(this.theme.theme()));

  protected readonly kpis = KPIS;
  protected readonly activity = ACTIVITY;
  protected readonly platform = PLATFORM;

  protected readonly mrrOpt = computed(() => mrrAreaOption(this.vt(), MONTHS));
  protected readonly moveOpt = computed(() => movementsOption(this.vt(), MONTHS));
  protected readonly cohortOpt = computed(() => cohortHeatmapOption(this.vt(), COHORTS));
  protected readonly funnelOpt = computed(() => funnelOption(this.vt(), FUNNEL));
  protected readonly adoptOpt = computed(() => adoptionOption(this.vt(), ADOPTION));

  protected event(kind: EventKind): { icon: IconName; cls: string } {
    switch (kind) {
      case 'expansion': return { icon: 'trending-up', cls: 'pos' };
      case 'signup': return { icon: 'plus', cls: 'info' };
      case 'alert': return { icon: 'bell', cls: 'warn' };
      case 'churn': return { icon: 'trending-down', cls: 'neg' };
      case 'milestone': return { icon: 'target', cls: 'accent' };
    }
  }
}
