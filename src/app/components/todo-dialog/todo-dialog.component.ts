import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../model/todo.model';
import { TodosModule } from '../../todos/todos.module';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  styleUrl: 'todo-dialog.component.scss',
  imports: [TodosModule],
  template: `
    <div class="dialog-header">
      <div class="container-todo-tag">
        <div
          class="container-todo-tag-item"
          [ngStyle]="{
              'background-color': data.tag?.color,
            }"
          *ngIf="data.tag?.name"
        >
          <mat-icon *ngIf="data.tag?.icon" class="container-todo-tag-icon">
            {{ data.tag?.icon }}
          </mat-icon>
          <span>{{ data.tag?.name }}</span>
        </div>

        <div
          href="javascript:void(0);"
          class="container-todo-tag-item"
          [ngStyle]="{
            'background-color': data.status?.color,
          }"
          *ngIf="data.status?.name"
        >
          <mat-icon *ngIf="data.status?.icon" class="container-todo-tag-icon">
            {{ data.status?.icon }}
          </mat-icon>
          <span>{{ data.status?.name }}</span>
        </div>
      </div>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close color="primary">Close</button>
      </mat-dialog-actions>
    </div>

    <div style="padding-left:24px;padding-top:20px">
      {{ formatDate(data.date) }}
    </div>
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content class="message">
      {{ data.description }}
    </mat-dialog-content>
  `,
})
export class TodoDialogComponent {
  formatDate(date: Date | string): string | null {
    if (!date) return null;
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}
}
