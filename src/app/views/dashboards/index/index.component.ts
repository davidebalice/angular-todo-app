import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListRowComponent } from '../../../todos/list-row/list-row.component';
import { Todo } from '../../../model/todo.model';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ListRowComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  pagination: boolean = false;
  selectedTodo!: Todo;
  selectedCategory!: number;
  selectedTag!: number;
  selectedStatus!: number;
  @Input() visualization!: string;

  constructor() {}
}
