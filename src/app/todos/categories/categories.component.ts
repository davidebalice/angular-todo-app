import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { Category } from '../../model/category.model';
import { Todo } from '../../model/todo.model';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CommonModule, NgModule],
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
    private dialog: MatDialog
  ) {}

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

  onDelete(categoryId: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this category?`,
        item: title,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.categoryService
          .deleteCategory(categoryId)
          .pipe(
            catchError((error) => {
              console.error('Error deleting todo', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.categoryService.fetchCategories();
            },
          });
      }
    });
  }
}
