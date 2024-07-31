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
            label: 'Dashboard',
            des: 'Welcome to Dashboard',
          },
        },
      },
      {
        path: 'banking',
        loadComponent: () =>
          import('./banking/banking.component').then((m) => m.BankingComponent),
        data: {
          title: 'Banking',
          breadcrumb: {
            label: 'Banking',
            des: 'Welcome to Dashboard ',
          },
        },
      },
      {
        path: 'crypto',
        loadComponent: () =>
          import('./crypto/crypto.component').then((m) => m.CryptoComponent),
        data: {
          title: 'Crypto',
          breadcrumb: {
            label: 'Crypto',
            des: 'Welcome to  Modern Admin Dashboard ',
          },
        },
      },
      {
        path: 'invoicing',
        loadComponent: () =>
          import('./invoicing/invoicing.component').then(
            (m) => m.InvoicingComponent
          ),
        data: {
          title: 'Invoicing',
          breadcrumb: {
            label: 'Invoicing',
            des: 'Welcome to  Modern Admin Dashboard ',
          },
        },
      },
    ],
  },
];
