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
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodosModule } from '../todos.module';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [TodosModule],
})
export class CardComponent implements OnInit {
  @Input() todo!: Todo;
  fullStars: number = 0;
  halfStar: boolean = false;
  private subscription!: Subscription;
  constructor(
    private todoService: TodoService,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    public todoDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openTodoDialog(todo: Todo): void {
    this.todoDialog.open(TodoDialogComponent, {
      width: '90%',
      maxWidth: '1000px',
      height: '90%',
      maxHeight: '450px',
      data: todo,
    });
  }

  onSelected() {
    this.router.navigate(['/todos', this.todo.id]);
  }

  formatDate(date: Date | string): string | null {
    if (!date) return null;
    return this.datePipe.transform(date, 'dd/MM/yyyy');
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

  onDelete(todoId: number, item: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this todo?',
        item: item,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.todoService
          .deleteTodo(todoId)
          .pipe(
            catchError((error) => {
              if (error.error.message.includes('Demo')) {
                // this.listCardComponent.openDemoDialog();
              }
              console.error('Error deleting todo', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.fetchTodos();
            },
          });
      }
    });
  }

  onPhotoTodo(todoId: number) {
    console.log(todoId);
    this.router.navigate(['/todos/photo', todoId]);
  }

  onGalleryTodo(todoId: number) {
    console.log(todoId);
    this.router.navigate(['/todos/gallery', todoId]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditTodo(todoId: number) {
    this.router.navigate([`/todos/${todoId}/edit`]);
  }

  onAttributeTodo(todoId: number) {
    this.router.navigate(['/todos/set-attributes', todoId]);
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
}
