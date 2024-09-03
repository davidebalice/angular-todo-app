import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./index/index.component').then((m) => m.IndexComponent),
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
