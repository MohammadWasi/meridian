import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Icon } from '../../core/icon';
import { ThemeService, Theme } from '../../core/theme.service';

interface Swatch { name: string; token: string; }
interface Toggle { key: string; label: string; hint: string; on: ReturnType<typeof signal<boolean>>; }

@Component({
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  protected readonly theme = inject(ThemeService);
  protected readonly themes: Theme[] = ['light', 'dark'];

  protected readonly toggles: Toggle[] = [
    { key: 'digest', label: 'Weekly revenue digest', hint: 'A Monday summary of MRR, churn and new accounts.', on: signal(true) },
    { key: 'risk', label: 'At-risk alerts', hint: 'Notify me when an account’s health drops below 45.', on: signal(true) },
    { key: 'product', label: 'Product updates', hint: 'Occasional notes on new Meridian features.', on: signal(false) },
  ];

  protected readonly swatches: Swatch[] = [
    { name: 'Signal', token: '--accent' },
    { name: 'Positive', token: '--pos' },
    { name: 'Negative', token: '--neg' },
    { name: 'Warning', token: '--warn' },
    { name: 'Info', token: '--info' },
    { name: 'Ink', token: '--text' },
    { name: 'Surface', token: '--surface' },
    { name: 'Paper', token: '--bg' },
  ];

  protected readonly typeSamples = [
    { face: 'Fraunces', role: 'Display', css: 'var(--font-display)', sample: 'Revenue compounds' },
    { face: 'Hanken Grotesk', role: 'Interface', css: 'var(--font-ui)', sample: 'Clear, quiet, dense' },
    { face: 'JetBrains Mono', role: 'Data', css: 'var(--font-mono)', sample: '$411,100 · +6.3%' },
  ];
}
