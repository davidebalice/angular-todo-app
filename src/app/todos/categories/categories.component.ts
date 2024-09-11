import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { Category } from '../../model/category.model';
import { Todo } from '../../model/todo.model';
import { CategoryService } from '../../services/category.service';
import { TodosModule } from '../todos.module';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [TodosModule],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  selectedCategory: Category | undefined;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  subscription: Subscription | undefined;
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.categoryService.fetchCategories();
    this.subscription = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;

    if (category) {
      this.router.navigate([`/todos/idcat/${category.id}`]);
    }
  }

  onNewCategory() {
    this.router.navigate(['/todos/categories/new']);
  }

  onEditCategory(categoryId: number) {
    this.router.navigate([`/todos/categories/${categoryId}/edit`]);
  }

  onBack() {
    this.router.navigate([`/todos/`]);
  }
  
  onDelete(categoryId: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this category?`,
        item: title,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.categoryService.deleteCategory(categoryId).subscribe({
            next: () => {
              this.categoryService.fetchCategories();
            },
            error: (error) => {
              this.categoryService.fetchCategories();
              console.error('Error handling deletion response', error);
            },
          });
        }
      },
      error: (err) => {
        console.error('Error closing dialog', err);
      },
    });
  }
}
