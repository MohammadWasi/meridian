import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar';
import { Topbar } from './layout/topbar';
import { Footer } from './layout/footer';
import { CommandPalette } from './shared/command-palette';
import { LayoutService } from './layout/layout.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Sidebar, Topbar, Footer, CommandPalette],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '[class.rail-collapsed]': 'layout.collapsed()',
    '[class.mobile-open]': 'layout.mobileOpen()',
  },
})
export class App {
  protected readonly layout = inject(LayoutService);
}
