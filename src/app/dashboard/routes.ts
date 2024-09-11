import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard.component').then((m) => m.DashboardComponent),
        data: {
          title: 'Dashboard',
          breadcrumb: {
            label: 'Angular Todo App',
            des: 'Dashboard',
          },
        },
      },
    ],
  },
];
