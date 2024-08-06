import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppConfig } from '../../app-config';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodosModule } from '../todos.module';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  imports: [TodosModule],
})
export class DetailComponent implements OnInit {
  todo: Todo | undefined;
  todo$: Observable<Todo> | undefined;
  id: number = 0;

  private subscription: Subscription | undefined;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.id = data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.id) {
      this.todo$ = this.todoService.getById(this.id);
      this.subscription = this.todo$.subscribe((todo: Todo) => {
        this.todo = todo;
      });
    }
  }

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/todos/image/${imageUrl}`;
  }

  onEditTodo() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteTodo() {
    this.todoService.deleteTodo(this.id);
    this.router.navigate(['/todos']);
  }

  onBackTodos() {
    this.router.navigate(['/todos']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
