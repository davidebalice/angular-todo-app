import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryNewComponent } from './categories/category-new/category-new.component';

import { TagsComponent } from './tags/tags.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { TagNewComponent } from './tags/tag-new/tag-new.component';

import { StatusComponent } from './status/status.component';
import { StatusEditComponent } from './status/status-edit/status-edit.component';
import { StatusNewComponent } from './status/status-new/status-new.component';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./todos.component').then((m) => m.TodosComponent),
    canActivate: [AuthGuard],
    data: {
      title: 'Todo',
      breadcrumb: {
        label: 'Todo managements',
        des: '',
      },
    },
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'New todo',
      breadcrumb: {
        label: 'Todo > New todo',
        des: '',
      },
    },
  },
  {
    path: ':id/edit',
    component: EditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit todo',
      breadcrumb: {
        label: 'Todo > Edit todo',
        des: '',
      },
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Categories',
      breadcrumb: {
        label: 'Todo > Categories',
        des: '',
      },
    },
  },
  {
    path: 'categories/new',
    component: CategoryNewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'New category',
      breadcrumb: {
        label: 'Todo > Categories > New category',
        des: '',
      },
    },
  },
  {
    path: 'categories/:id/edit',
    component: CategoryEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit category',
      breadcrumb: {
        label: 'Todo > Categories > Edit category',
        des: '',
      },
    },
  },

  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tags',
      breadcrumb: {
        label: 'Todo > Tags',
        des: '',
      },
    },
  },
  {
    path: 'tags/new',
    component: TagNewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'New tag',
      breadcrumb: {
        label: 'Todo > Tags > New tag',
        des: '',
      },
    },
  },
  {
    path: 'tags/:id/edit',
    component: TagEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit tag',
      breadcrumb: {
        label: 'Todo > Tags > Edit tag',
        des: '',
      },
    },
  },

  {
    path: 'status',
    component: StatusComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Status',
      breadcrumb: {
        label: 'Todo > Status',
        des: '',
      },
    },
  },
  {
    path: 'status/new',
    component: StatusNewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'New status',
      breadcrumb: {
        label: 'Todo > Status > New status',
        des: '',
      },
    },
  },
  {
    path: 'status/:id/edit',
    component: StatusEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit status',
      breadcrumb: {
        label: 'Todo > Status > Edit status',
        des: '',
      },
    },
  },


  /*
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent),
    data: {
      title: 'Calendar',
      breadcrumb: { label: 'Calendar', des:'Form Elements is used to style and format the input field' }
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

*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
