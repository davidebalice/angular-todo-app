import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chart',
        loadComponent: () => import('./chart/chart.component').then(m => m.ChartComponent),
        data: {
          title: 'Chart',
          breadcrumb: { label: 'Chart', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'badge',
        loadComponent: () => import('./badge/badge.component').then(m => m.BadgeComponent),
        data: {
          title: 'Badge',
          breadcrumb: { label: 'Badge/Label', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'button',
        loadComponent: () => import('./button/button.component').then(m => m.ButtonComponent),
        data: {
          title: 'Button',
          breadcrumb: { label: 'Button', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'color',
        loadComponent: () => import('./color/color.component').then(m => m.ColorComponent),
        data: {
          title: 'Color',
          breadcrumb: { label: 'Color', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'table',
        loadComponent: () => import('./table/table.component').then(m => m.TableComponent),
        data: {
          title: 'Table',
          breadcrumb: { label: 'Table', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'form',
        loadComponent: () => import('./form/form.component').then(m => m.FormComponent),
        data: {
          title: 'Form',
          breadcrumb: { label: 'Form', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'icons',
        loadComponent: () => import('./icons/icons.component').then(m => m.IconsComponent),
        data: {
          title: 'Icons',
          breadcrumb: { label: 'Form', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'navigation',
        loadComponent: () => import('./navigation/navigation.component').then(m => m.NavigationComponent),
        data: {
          title: 'Navigation',
          breadcrumb: { label: 'Navigation', des:'Form Elements is used to style and format the input field' }
        }
      },
      {
        path: 'typography',
        loadComponent: () => import('./typography/typography.component').then(m => m.TypographyComponent),
        data: {
          title: 'Typography',
          breadcrumb: { label: 'Typography', des:'Form Elements is used to style and format the input field' }
        }
      }
    ]
  }
];
