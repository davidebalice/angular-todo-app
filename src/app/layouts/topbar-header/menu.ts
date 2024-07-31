import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Demo',
    icon: 'assets/img/sidebar/home.svg',
    subItems: [
      {
        id: 2,
        label: 'Server Management',
        link: '/',
        parentId: 1
      },
      {
        id: 3,
        label: 'Banking',
        link: '/banking',
        parentId: 1
      },
      {
        id: 4,
        label: 'Crypto',
        link: '/crypto',
        parentId: 1
      },
      {
        id: 5,
        label: 'Invoicing',
        link: '/invoicing',
        parentId: 1
      }
    ]
  },
  {
    id: 6,
    label: 'Layout',
    icon: 'assets/img/sidebar/layout.svg',
    subItems: [
      {
        id: 7,
        label: 'Top Menu',
        onclick: (eventService: any)=>{          
          document.documentElement.setAttribute('data-nav', 'top');
          localStorage.setItem('navbar', 'top');
          eventService.broadcast('changeLayout', 'top');
        },
        parentId: 6
      },
      {
        id: 8,
        label: 'Side Menu',
        onclick: (eventService: any)=>{          
          document.documentElement.setAttribute('data-nav', 'side')
          localStorage.setItem('navbar', 'side');
          eventService.broadcast('changeLayout', 'side');
        },
        parentId: 6
      },
      {
        id: 9,
        label: 'Light Demo',
        onclick: ()=>{          
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        },
        parentId: 6
      },
      {
        id: 10,
        label: 'Dark Demo',
        onclick: ()=>{          
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        },
        parentId: 6
      },
      {
        id: 11,
        label: 'LTR Demo',
        onclick: ()=>{          
          document.documentElement.setAttribute('dir', 'ltr');
          localStorage.setItem('layout', 'ltr');
        },
        parentId: 6
      },
      {
        id: 12,
        label: 'RTL Demo',
        onclick: ()=>{          
          document.documentElement.setAttribute('dir', 'rtl');
          localStorage.setItem('layout', 'rtl');
        },
        parentId: 6
      }
    ]
  },
  {
    id: 13,
    label: 'App',
    icon: 'assets/img/sidebar/app.svg',
    subItems: [
      {
        id: 14,
        label: 'Todo',
        link: '/app/todo',
        parentId: 13
      },
      {
        id: 15,
        label: 'Chat',
        link: '/app/chat',
        parentId: 13
      },
      {
        id: 16,
        label: 'Calendar',
        link: '/app/calendar',
        parentId: 13
      },
      {
        id: 17,
        label: 'File Manager',
        link: '/app/file-manager',
        parentId: 13
      },
      {
        id: 18,
        label: 'Contact',
        link: '/app/contact',
        parentId: 13
      },
      {
        id: 19,
        label: 'Kanban',
        link: '/app/kanban',
        parentId: 13
      },
    ]
  },
  {
    id: 20,
    label: 'Features',
    icon: 'assets/img/sidebar/features.svg',
    subItems: [
      {
        id: 21,
        label: 'Chart',
        link: 'features/chart',
        parentId: 21
      },
      {
        id: 22,
        label: 'Badge',
        link: '/features/badge',
        parentId: 21
      },
      {
        id: 23,
        label: 'Button',
        link: '/features/button',
        parentId: 21
      },
      {
        id: 24,
        label: 'Color',
        link: '/features/color',
        parentId: 21
      },
      {
        id: 25,
        label: 'Table',
        link: '/features/table',
        parentId: 21
      },
      {
        id: 26,
        label: 'Form',
        link: '/features/form',
        parentId: 21
      },
      {
        id: 27,
        label: 'Icon',
        link: '/features/icons',
        parentId: 21
      },
      {
        id: 28,
        label: 'Navigation',
        link: '/features/navigation',
        parentId: 21
      },
      {
        id: 29,
        label: 'Typography',
        link: '/features/typography',
        parentId: 21
      },
    ]
  },
  {
    id: 30,
    label: 'Pages',
    icon: 'assets/img/sidebar/pages.svg',
    subItems: [
      {
        id: 31,
        label: 'Blog',
        link: '/pages/blog',
        parentId: 30
      },
      {
        id: 32,
        label: 'Faq',
        link: '/pages/faq',
        parentId: 30
      },
      {
        id: 33,
        label: 'Pricing',
        link: '/pages/pricing',
        parentId: 30
      },
      {
        id: 34,
        label: 'Testimonial',
        link: '/pages/testimonial',
        parentId: 30
      },
      {
        id: 35,
        label: 'Terms & Conditions',
        link: '/pages/terms',
        parentId: 30
      },
      {
        id: 36,
        label: 'Sign In',
        link: '/signin',
        parentId: 30
      },
      {
        id: 37,
        label: 'Sign Up',
        link: '/signup',
        parentId: 30
      },
      {
        id: 38,
        label: 'Forget Password',
        link: '/forget-password',
        parentId: 30
      },
      {
        id: 39,
        label: 'Two Step Verification',
        link: '/verification',
        parentId: 30
      },
      {
        id: 40,
        label: 'Error',
        link: '/error',
        parentId: 30
      },
      {
        id: 41,
        label: 'Coming Soon',
        link: '/coming-soon',
        parentId: 30
      },
      {
        id: 42,
        label: 'Maintenance',
        link: '/maintenance',
        parentId: 30
      },
      {
        id: 43,
        label: 'Blank Page',
        link: '/blank',
        parentId: 30
      },
    ]
  }

];
