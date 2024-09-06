import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../../model/todo.model';
import { TodosModule } from '../../todos/todos.module';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [TodosModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content class="message">
      {{ data.description }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="primary">Close</button>
    </mat-dialog-actions>
  `,
})
export class TodoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}
}