import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryNewComponent } from './categories/category-new/category-new.component';
import { EditComponent } from './edit/edit.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NewComponent } from './new/new.component';
import { PhotoComponent } from './photo/photo.component';

export const routes: Routes = [
  {
    path: '',
    //component: TodosComponent,
    loadComponent: () =>
      import('./todos.component').then((m) => m.TodosComponent),
    canActivate: [AuthGuard],
    
    data: {
      title: 'Todo',
      breadcrumb: {
        label: 'Todo',
        des: 'Form Elements is used to style and format the input field',
      },
    },
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/edit',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'photo/:id',
    component: PhotoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gallery/:id',
    component: GalleryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/new',
    component: CategoryNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/:id/edit',
    component: CategoryEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}













/**
 * 
 * 
 * 
export const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'todo',
        loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent),
        data: {
          title: 'Todo',
          breadcrumb: { label: 'Todo', des:'Form Elements is used to style and format the input field' }
        }
      },
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

 * 
 * 
 */