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
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodosModule } from '../todos.module';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';

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
    public dialog: MatDialog,
    private datePipe: DatePipe,
    public todoDialog: MatDialog
  ) {}

  openTodoDialog(todo: Todo): void  {
    this.todoDialog.open(TodoDialogComponent, {
      width: '90%',
      maxWidth: '1000px',
      height: '90%',
      maxHeight: '650px',
      data:  todo ,
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
