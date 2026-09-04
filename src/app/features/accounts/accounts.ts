import {
  ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, signal,
} from '@angular/core';
import { isPlatformBrowser, LowerCasePipe } from '@angular/common';
import { Icon } from '../../core/icon';
import { Sparkline } from '../../shared/sparkline';
import { ACCOUNTS, Account, Plan, Health } from '../../data/seed';
import { usd, num } from '../../core/format';

type SortKey = 'name' | 'mrr' | 'seats' | 'score';

@Component({
  selector: 'app-accounts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Sparkline, LowerCasePipe],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly usd = usd;
  protected readonly num = num;

  protected readonly plans: (Plan | 'All')[] = ['All', 'Free', 'Team', 'Business', 'Enterprise'];

  protected readonly query = signal('');
  protected readonly plan = signal<Plan | 'All'>('All');
  protected readonly sortKey = signal<SortKey>('mrr');
  protected readonly sortDir = signal<'asc' | 'desc'>('desc');
  protected readonly dense = signal(false);

  protected readonly rows = computed<Account[]>(() => {
    const q = this.query().trim().toLowerCase();
    const plan = this.plan();
    const key = this.sortKey();
    const dir = this.sortDir() === 'asc' ? 1 : -1;

    return ACCOUNTS
      .filter((a) => (plan === 'All' ? true : a.plan === plan))
      .filter((a) => !q || a.name.toLowerCase().includes(q) || a.domain.toLowerCase().includes(q))
      .slice()
      .sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * dir;
        return ((av as number) - (bv as number)) * dir;
      });
  });

  protected readonly stats = computed(() => {
    const r = this.rows();
    const mrr = r.reduce((s, a) => s + a.mrr, 0);
    const score = r.length ? Math.round(r.reduce((s, a) => s + a.score, 0) / r.length) : 0;
    const risk = r.filter((a) => a.health === 'At risk').length;
    return { count: r.length, mrr, score, risk };
  });

  protected setSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDir.set(key === 'name' ? 'asc' : 'desc');
    }
  }

  protected onSearch(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  protected trendUp(a: Account): boolean {
    return a.trend[a.trend.length - 1] >= a.trend[0];
  }

  protected healthCls(h: Health): string {
    return { Thriving: 'pos', Steady: 'info', Watch: 'warn', 'At risk': 'neg' }[h];
  }

  protected exportCsv(): void {
    if (!this.isBrowser) return;
    const head = ['Account', 'Domain', 'Plan', 'MRR', 'Seats', 'Health score', 'Status', 'Last active'];
    const lines = this.rows().map((a) =>
      [a.name, a.domain, a.plan, a.mrr, a.seats, a.score, a.health, a.lastActive]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    );
    const csv = [head.join(','), ...lines].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meridian-accounts.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
