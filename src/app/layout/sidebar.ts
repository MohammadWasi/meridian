import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../core/icon';
import { NAV } from '../core/nav';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <div class="brand">
      <span class="mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="2" opacity="0.55" />
          <path d="M3.5 16h25" stroke="currentColor" stroke-width="1.4" opacity="0.35" />
          <path d="M5 20.5 14 14l5 3 7.5-8.5" stroke="var(--accent)" stroke-width="2.6"
                stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="26.5" cy="8.5" r="2.7" fill="var(--accent)" />
        </svg>
      </span>
      <span class="word">Meridian</span>
      <span class="tag">v1.0</span>
    </div>

    <nav aria-label="Primary">
      @for (item of nav; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="active"
           (click)="layout.closeMobile()" [attr.title]="item.label">
          <app-icon [name]="item.icon" [size]="19" />
          <span class="label">{{ item.label }}</span>
        </a>
      }
    </nav>

    <div class="spacer"></div>

    <div class="callout">
      <div class="callout-top">
        <app-icon name="sparkles" [size]="16" />
        <span>Live demo</span>
      </div>
      <p>Seeded with a full quarter of realistic SaaS data. Self-host your own in minutes.</p>
      <a class="cta" href="https://github.com" target="_blank" rel="noopener">
        Read the docs <app-icon name="arrow-up-right" [size]="14" [stroke]="2" />
      </a>
    </div>

    <div class="user">
      <span class="avatar" aria-hidden="true">MK</span>
      <span class="who">
        <span class="name">Mara Køhler</span>
        <span class="role">Growth · Owner</span>
      </span>
      <button class="ghost" title="Sign out" aria-label="Sign out">
        <app-icon name="logout" [size]="17" />
      </button>
    </div>
  `,
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly nav = NAV;
  protected readonly layout = inject(LayoutService);
}
