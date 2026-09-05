import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../../core/icon';
import { ChartFrame } from '../../shared/chart-frame';
import { ChartDirective } from '../../shared/chart.directive';
import { ThemeService } from '../../core/theme.service';
import { vizTheme } from '../../data/chart-theme';
import { usageAreaOption } from '../../data/chart-options';
import { ACCOUNTS, Account, Health } from '../../data/seed';
import { usd, pct } from '../../core/format';

interface TimelineItem { icon: IconName; cls: string; text: string; meta: string; time: string; }

@Component({
  selector: 'app-account-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, ChartFrame, ChartDirective],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css',
})
export class AccountDetail {
  /** Bound from the ':id' route param (the account domain). */
  readonly id = input.required<string>();

  private readonly theme = inject(ThemeService);
  private readonly vt = computed(() => vizTheme(this.theme.theme()));
  protected readonly usd = usd;

  protected readonly account = computed<Account | undefined>(() =>
    ACCOUNTS.find((a) => a.domain === this.id()),
  );

  private readonly labels = ['11w', '10w', '9w', '8w', '7w', '6w', '5w', '4w', '3w', '2w', '1w', 'now'];

  protected readonly usageOpt = computed(() => {
    const a = this.account();
    return usageAreaOption(this.vt(), this.labels, a ? a.trend : []);
  });

  protected readonly usageDelta = computed(() => {
    const a = this.account();
    if (!a) return 0;
    return Math.round(((a.trend[a.trend.length - 1] - a.trend[0]) / a.trend[0]) * 100);
  });

  protected readonly region = computed(() => {
    const a = this.account();
    if (!a) return '—';
    return ['North America', 'Europe', 'APAC', 'LATAM'][a.name.length % 4];
  });

  protected pctStr = (n: number) => pct(n, 1);

  protected healthCls(h: Health): string {
    return { Thriving: 'pos', Steady: 'info', Watch: 'warn', 'At risk': 'neg' }[h];
  }

  protected readonly timeline = computed<TimelineItem[]>(() => {
    const a = this.account();
    if (!a) return [];
    const items: TimelineItem[] = [];
    if (a.health === 'Thriving') {
      items.push({ icon: 'trending-up', cls: 'pos', text: 'Expanded plan usage', meta: `+${Math.round(a.seats * 0.12)} seats`, time: '2w' });
    }
    if (a.health === 'At risk') {
      items.push({ icon: 'bell', cls: 'warn', text: 'Health dropped below 45', meta: `${this.usageDelta()}% usage / 30d`, time: '3d' });
    }
    items.push({ icon: 'target', cls: 'accent', text: `Passed ${a.seats * 8} reports built`, meta: 'lifetime', time: '1mo' });
    items.push({ icon: 'card', cls: 'info', text: `On the ${a.plan} plan`, meta: a.mrr ? `${usd(a.mrr)} / mo` : 'no charge', time: '—' });
    items.push({ icon: 'plus', cls: 'accent', text: 'Joined Meridian', meta: 'first workspace', time: '9mo' });
    return items;
  });
}
