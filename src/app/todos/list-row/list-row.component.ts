import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { RowComponent } from '../row/row.component';
import { TodosModule } from '../todos.module';
import { SimpleChanges, OnChanges } from '@angular/core';
@Component({
  selector: 'app-list-row',
  standalone: true,
  templateUrl: './list-row.component.html',
  styleUrl: './list-row.component.scss',
  imports: [TodosModule, RowComponent, MatPaginator],
})
export class ListRowComponent {
  @Input() selectedCategory!: number;
  @Input() selectedTag!: number;
  @Input() selectedStatus!: number;

  subscription: Subscription | undefined;
  loadedTodos: Todo[] = [];
  paginatedTodos: Todo[] = [];
  isLoading = true;
  error = '';
  totalItems: number = 0;
  currentPage: number = 1;
  private errorSub: Subscription | undefined;
  private queryParamSub: Subscription | undefined;
  private routeParamsSub: Subscription | undefined;
  @Input() limit: number = 1;
  @Input() pagination: boolean = true;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit() {
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
    if (this.queryParamSub) {
      this.queryParamSub.unsubscribe();
    }
    if (this.routeParamsSub) {
      this.routeParamsSub.unsubscribe();
    }
  }

  onUpdateTodos() {
    this.fetchTodos(
      '',
      this.selectedCategory,
      this.selectedStatus,
      this.selectedTag
    );
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
          this.paginateTodos();
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
          console.log(error);
        },
      });
  }

  onPageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.fetchTodos(
      '',
      this.selectedCategory,
      this.selectedStatus,
      this.selectedTag
    );
  }

  paginateTodos() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedTodos = this.loadedTodos.slice(startIndex, endIndex);
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory'] || changes['selectedTag'] || changes['selectedStatus']) {
      this.onUpdateTodos();
    }
  }

}
