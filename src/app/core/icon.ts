import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'overview' | 'accounts' | 'settings' | 'search' | 'command' | 'sun' | 'moon'
  | 'chevron-down' | 'chevron-right' | 'arrow-up-right' | 'trending-up' | 'trending-down'
  | 'arrow-up' | 'arrow-down' | 'plus' | 'download' | 'bell' | 'calendar' | 'more'
  | 'check' | 'x' | 'activity' | 'zap' | 'globe' | 'server' | 'database' | 'card'
  | 'layers' | 'pin' | 'sparkles' | 'dot' | 'logout' | 'target' | 'panel' | 'filter' | 'menu';

/** Inline, currentColor-driven stroke icons. One <svg>, path chosen by name. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" [attr.stroke-width]="stroke()" stroke-linecap="round"
         stroke-linejoin="round" aria-hidden="true" focusable="false">
      @switch (name()) {
        @case ('overview') { <rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/> }
        @case ('accounts') { <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/> }
        @case ('settings') { <path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/> }
        @case ('search') { <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/> }
        @case ('command') { <path d="M15 6a3 3 0 1 1 3 3h-3zM9 6a3 3 0 1 0-3 3h3zM15 18a3 3 0 1 0 3-3h-3zM9 18a3 3 0 1 1-3-3h3z"/><rect x="9" y="9" width="6" height="6"/> }
        @case ('sun') { <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/> }
        @case ('moon') { <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/> }
        @case ('chevron-down') { <path d="m6 9 6 6 6-6"/> }
        @case ('chevron-right') { <path d="m9 18 6-6-6-6"/> }
        @case ('arrow-up-right') { <path d="M7 7h10v10"/><path d="M7 17 17 7"/> }
        @case ('trending-up') { <path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/> }
        @case ('trending-down') { <path d="M22 17 13.5 8.5 8.5 13.5 2 7"/><path d="M16 17h6v-6"/> }
        @case ('arrow-up') { <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/> }
        @case ('arrow-down') { <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/> }
        @case ('plus') { <path d="M5 12h14M12 5v14"/> }
        @case ('download') { <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/> }
        @case ('bell') { <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/> }
        @case ('calendar') { <rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/> }
        @case ('more') { <circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/><circle cx="5" cy="12" r="1.4"/> }
        @case ('check') { <path d="M20 6 9 17l-5-5"/> }
        @case ('x') { <path d="M18 6 6 18M6 6l12 12"/> }
        @case ('activity') { <path d="M22 12h-4l-3 9L9 3l-3 9H2"/> }
        @case ('zap') { <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/> }
        @case ('globe') { <circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20M2 12h20"/> }
        @case ('server') { <rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/> }
        @case ('database') { <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/> }
        @case ('card') { <rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/> }
        @case ('layers') { <path d="m12.8 2.2 8.1 4a1 1 0 0 1 0 1.8l-8.1 4a2 2 0 0 1-1.8 0L3 8a1 1 0 0 1 0-1.8l8-4a2 2 0 0 1 1.8 0Z"/><path d="m3 12 8.2 4.1a2 2 0 0 0 1.8 0L21 12"/><path d="m3 17 8.2 4.1a2 2 0 0 0 1.8 0L21 17"/> }
        @case ('pin') { <path d="M12 17v5"/><path d="M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.7l-1.8-.9A2 2 0 0 1 15 10.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/> }
        @case ('sparkles') { <path d="M12 3l1.6 4.9L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.1z"/><path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z"/> }
        @case ('dot') { <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/> }
        @case ('logout') { <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/> }
        @case ('target') { <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/> }
        @case ('panel') { <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/> }
        @case ('filter') { <path d="M3 4h18l-7 8v7l-4-2v-5z"/> }
        @case ('menu') { <path d="M3 6h18M3 12h18M3 18h18"/> }
      }
    </svg>
  `,
  styles: `:host { display: inline-flex; line-height: 0; }`,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(18);
  readonly stroke = input(1.6);
}
