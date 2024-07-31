import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'error',
        title: 'Error',
        loadComponent: () => import('./error/error.component').then(m => m.ErrorComponent),
      },
      {
        path: 'coming-soon',
        title: 'Coming Soon',
        loadComponent: () => import('./coming-soon/coming-soon.component').then(m => m.ComingSoonComponent),
      },
      {
        path: 'maintenance',
        title: 'Maintenance',
        loadComponent: () => import('./maintenance/maintenance.component').then(m => m.MaintenanceComponent),
      },
      {
        path: 'blank',
        title: 'Blank',
        loadComponent: () => import('./blank/blank.component').then(m => m.BlankComponent),
      },
    ]
  },
];
