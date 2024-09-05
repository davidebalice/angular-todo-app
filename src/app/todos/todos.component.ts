import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../model/category.model';
import { Status } from '../model/status.model';
import { Tag } from '../model/tag.model';
import { Todo } from '../model/todo.model';
import { CategoryService } from '../services/category.service';
import { StatusService } from '../services/status.service';
import { TagService } from '../services/tag.service';
import { ListCardComponent } from './list-card/list-card.component';
import { ListRowComponent } from './list-row/list-row.component';
import { SearchComponent } from './search/search.component';
import { TodosModule } from './todos.module';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  imports: [TodosModule, SearchComponent, ListCardComponent, ListRowComponent],
})
export class TodosComponent {
  selectedTodo!: Todo;
  selectedCategory!: number;
  selectedTag!: number;
  selectedStatus!: number;
  pagination: boolean = true;
  visualization: string = 'row';
  tags: Tag[] = [];
  status: Status[] = [];
  categories: Category[] = [];

  constructor(
    private router: Router,
    private tagService: TagService,
    private statusService: StatusService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadTags();
  }

  onBackTodos() {}

  onNewTodo() {
    this.router.navigate(['/todos/new']);
  }

  loadTags() {
    this.tagService.fetchTags();
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        console.error('Error fetching tags', error);
      },
      complete: () => {
        console.log('Tags fetched successfully');
      },
    });

    this.statusService.fetchStatus();
    this.statusService.getStatus().subscribe({
      next: (status) => {
        this.status = status;
      },
      error: (error) => {
        console.error('Error fetching status', error);
      },
      complete: () => {
        console.log('Status fetched successfully');
      },
    });

    this.categoryService.fetchCategories();
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
      complete: () => {
        console.log('Categories fetched successfully');
      },
    });
  }

  onChangeView(type: string) {
    this.visualization = type;
  }

  navigateToCategories() {
    this.router.navigate(['/todos/categories']);
  }

  navigateToStatus() {
    this.router.navigate(['/todos/status']);
  }

  navigateToTags() {
    this.router.navigate(['/todos/tags']);
  }

  selectCategory(category: number) {
    this.selectedCategory = category;
  }
  
  selectTag(tag: number) {
    this.selectedTag = tag;
  }
  
  selectStatus(status: number) {
    this.selectedStatus = status;
  }

  onReset(){
    this.selectedCategory = 0;
    this.selectedStatus = 0;
    this.selectedTag = 0;
  }
}
