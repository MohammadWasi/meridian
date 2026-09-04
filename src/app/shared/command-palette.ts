import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Icon, IconName } from '../core/icon';
import { NAV } from '../core/nav';
import { CommandService } from './command.service';
import { ThemeService } from '../core/theme.service';

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: IconName;
  group: string;
  run: () => void;
}

@Component({
  selector: 'app-command-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { '(document:keydown)': 'onKey($event)' },
  template: `
    @if (svc.open()) {
      <div class="scrim" (click)="svc.close()"></div>
      <div class="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="search">
          <app-icon name="search" [size]="18" />
          <input #box type="text" placeholder="Search pages & actions…" autocomplete="off"
                 spellcheck="false" [value]="query()" (input)="onInput($event)" />
          <kbd>esc</kbd>
        </div>
        <ul class="list">
          @for (c of filtered(); track c.id; let i = $index) {
            @if (i === 0 || filtered()[i - 1].group !== c.group) {
              <li class="group">{{ c.group }}</li>
            }
            <li class="cmd" [class.active]="i === active()"
                (mouseenter)="active.set(i)" (click)="exec(c)">
              <app-icon [name]="c.icon" [size]="17" />
              <span class="lbl">{{ c.label }}</span>
              <span class="hint">{{ c.hint }}</span>
            </li>
          }
          @if (filtered().length === 0) {
            <li class="empty">No matches for “{{ query() }}”</li>
          }
        </ul>
        <div class="foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span class="brand">Meridian</span>
        </div>
      </div>
    }
  `,
  styleUrl: './command-palette.css',
})
export class CommandPalette {
  protected readonly svc = inject(CommandService);
  private readonly router = inject(Router);
  private readonly theme = inject(ThemeService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly box = viewChild<ElementRef<HTMLInputElement>>('box');

  protected readonly query = signal('');
  protected readonly active = signal(0);

  private readonly commands = computed<Command[]>(() => [
    ...NAV.map((n) => ({
      id: 'nav:' + n.path,
      label: n.label,
      hint: n.hint ?? '',
      icon: n.icon,
      group: 'Navigate',
      run: () => this.router.navigateByUrl(n.path),
    })),
    {
      id: 'theme:toggle',
      label: this.theme.theme() === 'dark' ? 'Switch to light' : 'Switch to dark',
      hint: 'Appearance',
      icon: this.theme.theme() === 'dark' ? 'sun' : 'moon',
      group: 'Appearance',
      run: () => this.theme.toggle(),
    },
  ]);

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const all = this.commands();
    if (!q) return all;
    return all.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(q));
  });

  constructor() {
    // Focus the box and reset when the palette opens.
    effect(() => {
      if (this.svc.open() && this.isBrowser) {
        this.query.set('');
        this.active.set(0);
        queueMicrotask(() => this.box()?.nativeElement.focus());
      }
    });
  }

  protected onInput(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
    this.active.set(0);
  }

  protected exec(c: Command): void {
    c.run();
    this.svc.close();
  }

  protected onKey(e: KeyboardEvent): void {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.svc.toggle();
      return;
    }
    if (!this.svc.open()) return;
    const list = this.filtered();
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.svc.close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.active.update((i) => (list.length ? (i + 1) % list.length : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.active.update((i) => (list.length ? (i - 1 + list.length) % list.length : 0));
        break;
      case 'Enter': {
        e.preventDefault();
        const c = list[this.active()];
        if (c) this.exec(c);
        break;
      }
    }
  }
}
