import { Component, Input, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.scss',
  imports: [CommonModule, NgModule],

})
export class ListCardComponent {
  @Input() limit: number = 1;
  @Input() pagination: boolean = true;
  subscription!: Subscription;
  loadedTodos: Todo[] = [];
  paginatedTodos: Todo[] = [];
  isLoading = true;
  error = '';
  totalItems: number | undefined;
  currentPage: number = 1;
  private errorSub: Subscription | undefined;
  private queryParamSub: Subscription | undefined;
  private routeParamsSub: Subscription | undefined;

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
      const categoryId = params['category'] || '';
      if (categoryId) {
        this.fetchTodos(searchKey, categoryId);
      } else {
        this.fetchTodos(searchKey);
      }
    });

    this.routeParamsSub = this.route.params.subscribe((params) => {
      const categoryId = params['category'] || 0;
      const searchKey = this.route.snapshot.queryParams['key'] || '';
      if (categoryId) {
        this.fetchTodos(searchKey, categoryId);
      } else {
        this.fetchTodos(searchKey);
      }
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
    this.fetchTodos();
  }

  fetchTodos(searchKey?: string, categoryId?: number) {
    this.isLoading = true;
    this.subscription = this.todoService
      .fetchTodos(searchKey, categoryId, this.limit, this.currentPage)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.loadedTodos = response.todos.map((todo) => ({
            ...todo,
            categoryName: todo.categoryDto?.name || 'Unknown Category',
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
    this.fetchTodos();
  }

  paginateTodos() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedTodos = this.loadedTodos.slice(startIndex, endIndex);
  }
}
