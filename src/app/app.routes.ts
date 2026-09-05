import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: 'overview',
    title: 'Overview · Meridian',
    loadComponent: () => import('./features/overview/overview').then((m) => m.Overview),
  },
  {
    path: 'accounts',
    title: 'Accounts · Meridian',
    loadComponent: () => import('./features/accounts/accounts').then((m) => m.Accounts),
  },
  {
    path: 'accounts/:id',
    title: 'Account · Meridian',
    loadComponent: () => import('./features/account-detail/account-detail').then((m) => m.AccountDetail),
  },
  {
    path: 'settings',
    title: 'Settings · Meridian',
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
  },
  { path: '**', redirectTo: 'overview' },
];
