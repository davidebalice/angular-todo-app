import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, catchError, take } from 'rxjs';
import { AppConfig } from '../../app-config';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { DetailComponent } from '../detail/detail.component';
import { ListRowComponent } from '../list-row/list-row.component';
import { TodosModule } from '../todos.module';
@Component({
  selector: 'app-row',
  standalone: true,
  templateUrl: './row.component.html',
  styleUrl: './row.component.css',
  imports: [TodosModule],
})
export class RowComponent implements OnInit {
  @Input() todo: Todo | undefined;
  fullStars: number = 0;
  halfStar: boolean = false;
  private subscription: Subscription | undefined;
  constructor(
    private todoService: TodoService,
    private router: Router,
    private listRowComponent: ListRowComponent,
    public dialog: MatDialog,
    private imageDialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  openDialog(id: number): void {
    this.dialog.open(DetailComponent, {
      width: '90%',
      maxWidth: '1000px',
      height: '90%',
      maxHeight: '750px',
      data: { id: id },
    });
  }

  formatDate(date: Date | string): string | null {
    if (!date) return null;
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  ngOnInit(): void {}

  navigateToTodo(): void {
    if (this.todo) {
      this.router.navigate(['/todos', this.todo.id]);
    } else {
      console.error('Todo is undefined');
    }
  }

  private fetchTodos() {
    this.subscription = this.todoService
      .fetchTodos()
      .pipe(
        take(1),
        catchError((error) => {
          console.error('Error fetching todos', error);
          throw error;
        })
      )
      .subscribe((todos) => {
        this.router.navigate(['/reload']).then(() => {
          this.router.navigate(['/todos']);
        });
        console.log('Updated todos after deletion', todos);
      });
  }

  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return '../../../assets/images/nophoto.jpg';
    }
    return `${AppConfig.apiUrl}/todos/image/${imageUrl}`;
  }

  onEdit(todoId: number) {
    this.router.navigate([`/todos/${todoId}/edit`]);
  }

  onDelete(todoId: number, item: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this todo?',
        item: item,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.todoService.deleteTodo(todoId).subscribe({
            next: () => {
              this.fetchTodos();
            },
            error: (error) => {
              this.fetchTodos();
              console.error('Error handling deletion response', error);
            },
          });
        }
      },
      error: (err) => {
        console.error('Error closing dialog', err);
      },
    });
  }

  onPhotoTodo(todoId: number) {
    console.log(todoId);
    this.router.navigate(['/todos/photo', todoId]);
  }

  onGalleryTodo(todoId: number) {
    this.router.navigate(['/todos/gallery', todoId]);
  }

  onAttributeTodo(todoId: number) {
    this.router.navigate(['/todos/set-attributes', todoId]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generateStarsArray(difficulty: number): string[] {
    const maxStars = 5;
    let starsArray: string[] = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= difficulty) {
        starsArray.push('star');
      } else if (i - 0.5 <= difficulty) {
        starsArray.push('star_half');
      } else {
        starsArray.push('star_border');
      }
    }

    return starsArray;
  }

  openImageDialog(imageUrl: string, directory: string): void {
    this.imageDialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl, directory: directory },
    });
  }
}
