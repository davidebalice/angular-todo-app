import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'grid_view',
    link: '/',
  },
  {
    id: 2,
    label: 'Todo',
    icon: 'text_snippet',
    link: '/todos',
  },
  {
    id: 3,
    label: 'Calendar',
    icon: 'calendar_month',
    link: '/calendar',
  },
  {
    id: 4,
    label: 'Info',
    icon: 'info',
    link: '/info',
  },
];
