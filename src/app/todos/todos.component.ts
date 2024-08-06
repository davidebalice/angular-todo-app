import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from '../model/tag.model';
import { Todo } from '../model/todo.model';
import { StatusService } from '../services/status.service';
import { TagService } from '../services/tag.service';
import { ListCardComponent } from './list-card/list-card.component';
import { ListRowComponent } from './list-row/list-row.component';
import { SearchComponent } from './search/search.component';
import { TodosModule } from './todos.module';
import { Status } from '../model/status.model';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  imports: [TodosModule, SearchComponent, ListCardComponent, ListRowComponent],
})
export class TodosComponent {
  selectedTodo!: Todo;
  pagination: boolean = true;
  visualization: string = 'row';
  tags: Tag[] = [];
  status: Status[] = [];

  constructor(
    private router: Router,
    private tagService: TagService,
    private statusService: StatusService
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
  }

  onChangeView(type: string) {
    this.visualization = type;
  }
}
