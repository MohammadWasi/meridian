import { IconName } from './icon';

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
  hint?: string;
}

export const NAV: readonly NavItem[] = [
  { label: 'Overview', path: '/overview', icon: 'overview', hint: 'Revenue, usage & health at a glance' },
  { label: 'Accounts', path: '/accounts', icon: 'accounts', hint: 'Every workspace, sortable & filterable' },
  { label: 'Settings', path: '/settings', icon: 'settings', hint: 'Appearance & console preferences' },
] as const;
