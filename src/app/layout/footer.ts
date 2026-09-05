import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../core/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <footer class="footer">
      <div class="inner">
        <div class="brand">
          <span class="mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" opacity=".5" />
              <path d="M4 15 10.5 10.5 14 12.5 20 7" stroke="var(--accent)" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="name">Meridian</span>
          <span class="dot">·</span>
          <span class="muted">© 2026 · MIT</span>
        </div>

        <nav class="links" aria-label="Related resources">
          <a href="https://github.com/MohammadWasi/meridian" target="_blank" rel="noopener">
            GitHub <app-icon name="arrow-up-right" [size]="13" [stroke]="2" />
          </a>
          <a href="https://www.interviewsvector.com/" target="_blank" rel="noopener">Interviews Vector</a>
          <a href="https://aiistack.com/" target="_blank" rel="noopener">AII Stack</a>
          <a href="https://www.upscgeeks.in/" target="_blank" rel="noopener">UPSC Geeks</a>
        </nav>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    .footer { border-top: 1px solid var(--hairline); margin-top: var(--sp-6); }
    .inner {
      max-width: var(--content-max);
      margin: 0 auto;
      padding: var(--sp-5) var(--sp-6);
      display: flex; align-items: center; justify-content: space-between;
      gap: var(--sp-4); flex-wrap: wrap;
    }
    .brand { display: flex; align-items: center; gap: var(--sp-2); font-size: var(--step--1); }
    .mark { width: 20px; height: 20px; color: var(--text); }
    .mark svg { width: 100%; height: 100%; display: block; }
    .name { font-family: var(--font-display); font-weight: 600; letter-spacing: -.01em; }
    .dot { color: var(--text-3); }
    .muted { color: var(--text-3); font-family: var(--font-mono); font-size: var(--step--2); }
    .links { display: flex; align-items: center; gap: var(--sp-5); flex-wrap: wrap; }
    .links a {
      display: inline-flex; align-items: center; gap: 4px;
      color: var(--text-2); font-size: var(--step--1); font-weight: 500;
      transition: color var(--dur) var(--ease);
    }
    .links a:hover { color: var(--accent); }
    @media (max-width: 640px) { .inner { padding: var(--sp-4); } .links { gap: var(--sp-4); } }
  `,
})
export class Footer {}
