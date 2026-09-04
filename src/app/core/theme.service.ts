import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
const KEY = 'meridian-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Current theme. Initialised from the attribute the pre-paint script set. */
  readonly theme = signal<Theme>(this.read());

  constructor() {
    // Reflect changes to the <html> attribute + storage. Runs browser-side only.
    effect(() => {
      const t = this.theme();
      if (!this.isBrowser) return;
      this.doc.documentElement.setAttribute('data-theme', t);
      try {
        localStorage.setItem(KEY, t);
      } catch {
        /* storage may be unavailable (private mode) — non-fatal */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  set(t: Theme): void {
    this.theme.set(t);
  }

  private read(): Theme {
    if (!this.isBrowser) return 'dark';
    const attr = this.doc.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
