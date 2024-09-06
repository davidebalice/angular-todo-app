import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from '../interceptors/auth-interceptor';
import { RestApiUrlInterceptor } from '../interceptors/rest-api-url.interceptor';
import { TodoService } from '../services/todo.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TodoService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestApiUrlInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
})
export class CalendarModule {}
