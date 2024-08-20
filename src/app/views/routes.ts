import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'chat',
        loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent),
        data: {
          title: 'Chat',
          breadcrumb: { label: 'Chat', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'calendar',
        loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent),
        data: {
          title: 'Calendar',
          breadcrumb: { label: 'Calendar', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'file-manager',
        loadComponent: () => import('./file-manager/file-manager.component').then(m => m.FileManagerComponent),
        data: {
          title: 'File Manager',
          breadcrumb: { label: 'File Manager', des:'Welcome to Dashboard' }
        }
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
        data: {
          title: 'Contact',
          breadcrumb: { label: 'Contact', des:'Welcome to Dashboard' }
        }
      },
      {
        path: 'kanban',
        loadComponent: () => import('./kanban/kanban.component').then(m => m.KanbanComponent),
        data: {
          title: 'File Manager',
          breadcrumb: { label: 'Kanban', des:'Welcome to Dashboard' }
        }
      },
    ]
  },
];
