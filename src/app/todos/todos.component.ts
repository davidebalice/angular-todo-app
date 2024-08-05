import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  imports: [CommonModule, NgModule],
})
export class TodosComponent {
  selectedTodo!: Todo;
  pagination: boolean = true;
  visualization: string = 'row';

  constructor(private router: Router) {}

  ngOnInit() {}

  onBackTodos() {}

  onNewTodo() {
    this.router.navigate(['/todos/new']);
  }

  onChangeView(type: string) {
    this.visualization = type;
  }
}
