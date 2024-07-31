import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'grid_view',
    link: '/',
  },
  {
    id: 13,
    label: 'Todo',
    icon: 'home',
    link: '/app/todo',
  },

  {
    id: 14,
    label: 'Calendar',
    icon: 'home',
    link: '/app/calendar',
  },

  {
    id: 15,
    label: 'Kenban',
    icon: 'home',
    link: '/app/kanban',
  },

  {
    id: 20,
    label: 'Features',
    icon: 'home',
    link: 'features/chart',
    subItems: [
      {
        id: 21,
        label: 'Chart',
        link: 'features/chart',
        parentId: 21,
      },
      {
        id: 22,
        label: 'Badge',
        link: '/features/badge',
        parentId: 21,
      },
      {
        id: 23,
        label: 'Button',
        link: '/features/button',
        parentId: 21,
      },
      {
        id: 24,
        label: 'Color',
        link: '/features/color',
        parentId: 21,
      },
      {
        id: 25,
        label: 'Table',
        link: '/features/table',
        parentId: 21,
      },
      {
        id: 26,
        label: 'Form',
        link: '/features/form',
        parentId: 21,
      },
      {
        id: 27,
        label: 'Icon',
        link: '/features/icons',
        parentId: 21,
      },
      {
        id: 28,
        label: 'Navigation',
        link: '/features/navigation',
        parentId: 21,
      },
      {
        id: 29,
        label: 'Typography',
        link: '/features/typography',
        parentId: 21,
      },
    ],
  },
  {
    id: 30,
    label: 'Pages',
    icon: 'assets/img/sidebar/pages.svg',
    link: '/pages/blog',
    subItems: [
      {
        id: 31,
        label: 'Blog',
        link: '/pages/blog',
        parentId: 30,
      },
      {
        id: 32,
        label: 'Faq',
        link: '/pages/faq',
        parentId: 30,
      },
      {
        id: 33,
        label: 'Pricing',
        link: '/pages/pricing',
        parentId: 30,
      },
      {
        id: 34,
        label: 'Testimonial',
        link: '/pages/testimonial',
        parentId: 30,
      },
      {
        id: 35,
        label: 'Terms & Conditions',
        link: '/pages/terms',
        parentId: 30,
      },
      {
        id: 36,
        label: 'Sign In',
        link: '/signin',
        parentId: 30,
      },
      {
        id: 37,
        label: 'Sign Up',
        link: '/signup',
        parentId: 30,
      },
      {
        id: 38,
        label: 'Forget Password',
        link: '/forget-password',
        parentId: 30,
      },
      {
        id: 39,
        label: 'Two Step Verification',
        link: '/verification',
        parentId: 30,
      },
      {
        id: 40,
        label: 'Error',
        link: '/error',
        parentId: 30,
      },
      {
        id: 41,
        label: 'Coming Soon',
        link: '/coming-soon',
        parentId: 30,
      },
      {
        id: 42,
        label: 'Maintenance',
        link: '/maintenance',
        parentId: 30,
      },
      {
        id: 43,
        label: 'Blank Page',
        link: '/blank',
        parentId: 30,
      },
    ],
  },
];
