import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Icon } from '../core/icon';
import { NAV } from '../core/nav';
import { ACCOUNTS } from '../data/seed';
import { ThemeService } from '../core/theme.service';
import { CommandService } from '../shared/command.service';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <button class="icon-btn only-mobile" (click)="layout.toggleMobile()" aria-label="Open menu">
      <app-icon name="menu" [size]="20" />
    </button>
    <button class="icon-btn only-desktop" (click)="layout.toggleCollapsed()" aria-label="Collapse sidebar">
      <app-icon name="panel" [size]="19" />
    </button>

    <div class="crumb">
      <span class="here">{{ title() }}</span>
      <span class="sub">Workspace · Acme Analytics</span>
    </div>

    <div class="grow"></div>

    <button class="search" (click)="cmd.show()" aria-label="Search (Command or Control + K)">
      <app-icon name="search" [size]="17" />
      <span class="ph">Search…</span>
      <span class="keys"><kbd>⌘</kbd><kbd>K</kbd></span>
    </button>

    <span class="range">
      <app-icon name="calendar" [size]="15" />
      <span>Mar ’25 – Aug ’26</span>
    </span>

    <button class="icon-btn" (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
      <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="18" />
    </button>

    <button class="icon-btn bell" aria-label="Notifications">
      <app-icon name="bell" [size]="18" />
      <span class="dot" aria-hidden="true"></span>
    </button>
  `,
  styleUrl: './topbar.css',
})
export class Topbar {
  protected readonly theme = inject(ThemeService);
  protected readonly cmd = inject(CommandService);
  protected readonly layout = inject(LayoutService);
  private readonly router = inject(Router);

  protected readonly title = signal(this.resolve(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => this.title.set(this.resolve(e.urlAfterRedirects)));
  }

  private resolve(url: string): string {
    const clean = url.split('?')[0].split('#')[0];
    const detail = clean.match(/^\/accounts\/(.+)$/);
    if (detail) {
      const domain = decodeURIComponent(detail[1]);
      return ACCOUNTS.find((a) => a.domain === domain)?.name ?? 'Account';
    }
    return NAV.find((n) => clean.startsWith(n.path))?.label ?? 'Overview';
  }
}
