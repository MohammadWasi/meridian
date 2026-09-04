import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  /** Rail collapsed to icons (desktop). */
  readonly collapsed = signal(false);
  /** Drawer open (mobile). */
  readonly mobileOpen = signal(false);

  toggleCollapsed(): void {
    this.collapsed.update((v) => !v);
  }
  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }
  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
