import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'overview', renderMode: RenderMode.Prerender },
  { path: 'accounts', renderMode: RenderMode.Prerender },
  { path: 'settings', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
