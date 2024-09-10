import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Subscription } from 'rxjs';
import { Category } from '../model/category.model';
import { Status } from '../model/status.model';
import { Tag } from '../model/tag.model';
import { Todo } from '../model/todo.model';
import { CategoryService } from '../services/category.service';
import { StatusService } from '../services/status.service';
import { TagService } from '../services/tag.service';
import { TodoService } from '../services/todo.service';
import { CalendarModule } from './calendar.module';
import { TodoDialogComponent } from '../components/todo-dialog/todo-dialog.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class Calendar {
  events: EventInput[] = [];
  subscription: Subscription | undefined;
  loadedTodos: Todo[] = [];
  paginatedTodos: Todo[] = [];
  selectedTodo!: Todo;
  selectedCategory!: number;
  selectedTag!: number;
  selectedStatus!: number;
  tags: Tag[] = [];
  status: Status[] = [];
  categories: Category[] = [];
  isLoading = true;
  totalItems: number = 0;
  currentPage: number = 1;
  private errorSub: Subscription | undefined;
  private queryParamSub: Subscription | undefined;
  private routeParamsSub: Subscription | undefined;
  @Input() limit: number = 100;
  @Input() pagination: boolean = true;
  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private tagService: TagService,
    private statusService: StatusService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public todoDialog: MatDialog
  ) {}

  openTodoDialog(todo: Todo): void {
    this.todoDialog.open(TodoDialogComponent, {
      width: '90%',
      maxWidth: '1000px',
      height: '90%',
      maxHeight: '450px',
      data: todo,
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    buttonText: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    eventClick: this.handleEventClick.bind(this),
    initialEvents: this.events,
  };

  handleEventClick(info: any) {
    info.jsEvent.preventDefault();
    const todoId = info.event.id;
    const todo = this.loadedTodos.find((t) => t.id === parseInt(todoId));

    if (todo) {
      this.openTodoDialog(todo);
    }
  }

  convertTodosToEvents() {
    this.events = this.loadedTodos.map((todo) => ({
      id: String(todo.id),
      title: todo.title,
      date: todo.date,
      className: 'primary-bg text-white p-2 border-0 rounded-4 px-2 pointer',
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events,
    };
  }

  fetchTodos(
    searchKey?: string,
    categoryId?: number,
    statusId?: number,
    tagId?: number
  ) {
    this.isLoading = true;
    this.subscription = this.todoService
      .fetchTodos(
        searchKey,
        categoryId,
        statusId,
        tagId,
        this.limit,
        this.currentPage
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.loadedTodos = response.todos.map((todo) => ({
            ...todo,
            categoryName: todo.category?.name || 'Unknown Category',
          }));
          this.totalItems = response.totalItems;
          this.convertTodosToEvents();
          this.paginateTodos();
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.loadTags();
    this.errorSub = this.todoService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.queryParamSub = this.route.queryParams.subscribe((params) => {
      const searchKey = params['key'] || '';

      this.fetchTodos(
        searchKey,
        this.selectedCategory,
        this.selectedStatus,
        this.selectedTag
      );
    });

    this.routeParamsSub = this.route.params.subscribe((params) => {
      const searchKey = this.route.snapshot.queryParams['key'] || '';
      this.fetchTodos(
        searchKey,
        this.selectedCategory,
        this.selectedStatus,
        this.selectedTag
      );
    });
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

  onBackTodos() {}

  onNewTodo() {
    this.router.navigate(['/todos/new']);
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

  onReset() {
    this.selectedCategory = 0;
    this.selectedStatus = 0;
    this.selectedTag = 0;
  }

  paginateTodos() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedTodos = this.loadedTodos.slice(startIndex, endIndex);
  }
}
