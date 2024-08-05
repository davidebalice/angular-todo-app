import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { MatModule } from '../appModules/mat.module';
import { AuthInterceptor } from '../interceptors/auth-interceptor';
import { RestApiUrlInterceptor } from '../interceptors/rest-api-url.interceptor';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { CardComponent } from './card/card.component';
import { RowComponent } from './row/row.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { AttributeEditComponent } from './attributes/attribute-edit/attribute-edit.component';
import { AttributeNewComponent } from './attributes/attribute-new/attribute-new.component';
import { AttributesSetComponent } from './attributes/attribute-set/attributes-set.component';
import { AttributesComponent } from './attributes/attributes.component';
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
import { SearchComponent } from './search/search.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { SubcategoryEditComponent } from './subcategories/subcategory-edit/subcategory-edit.component';
import { SubcategoryNewComponent } from './subcategories/subcategory-new/subcategory-new.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { ValueEditComponent } from './values/value-edit/value-edit.component';
import { ValueNewComponent } from './values/value-new/value-new.component';
import { ValuesComponent } from './values/values.component';

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
    AttributesComponent,
    AttributeEditComponent,
    AttributeNewComponent,
    AttributesSetComponent,
    ValuesComponent,
    ValueEditComponent,
    ValueNewComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
   // MatModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    SharedModule,
  ],
  exports: [SharedModule],
  providers: [
    AuthService,
    TodoService,
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
