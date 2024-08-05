import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from '../interceptors/auth-interceptor';
import { RestApiUrlInterceptor } from '../interceptors/rest-api-url.interceptor';
import { DefaultImagePipe } from '../pipes/defaultImage.pipe';
import { ProtectedImagePipe } from '../pipes/protected-images.pipe';
import { CardComponent } from './card/card.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryNewComponent } from './categories/category-new/category-new.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ListCardComponent } from './list-card/list-card.component';
import { ListRowComponent } from './list-row/list-row.component';
import { NewComponent } from './new/new.component';
import { PhotoComponent } from './photo/photo.component';
import { RowComponent } from './row/row.component';
import { SearchComponent } from './search/search.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { SubcategoryEditComponent } from './subcategories/subcategory-edit/subcategory-edit.component';
import { SubcategoryNewComponent } from './subcategories/subcategory-new/subcategory-new.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent,
    SearchComponent,
    RowComponent,
    CardComponent,
    DetailComponent,
    EditComponent,
    ListRowComponent,
    ListCardComponent,
    NewComponent,
    PhotoComponent,
    GalleryComponent,
    CategoriesComponent,
    CategoryEditComponent,
    CategoryNewComponent,
    SubcategoriesComponent,
    SubcategoryEditComponent,
    SubcategoryNewComponent,
    ProtectedImagePipe,
    DefaultImagePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    TodosRoutingModule,
  ],
  exports: [ListCardComponent, ListRowComponent, EditComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestApiUrlInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
})
export class TodosModule {}
