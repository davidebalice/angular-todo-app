import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
} from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../model/subcategory.model';
import { Todo } from '../../model/todo.model';
import { SubcategoryService } from '../../services/subcategory.service';
@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  subcategories: Subcategory[] = [];
  selectedSubcategory: Subcategory = null;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  subscription: Subscription;
  isLoading = true;
  selectedIdCategory: number = null;
  showSelect: boolean = false;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]>;
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  loadDefaultCategory(): void {
    console.log(this.selectedIdCategory);
    if (!this.selectedIdCategory) {
      this.categories$.pipe(take(2)).subscribe((categories) => {
        if (categories.length > 0) {
          this.selectedIdCategory = categories[0].id;
          this.loadSubcategories(this.selectedIdCategory);
          this.categoryForm = new FormGroup({
            idCategory: new FormControl(this.selectedIdCategory),
          });
        }
      });
    } else {
      this.loadSubcategories(this.selectedIdCategory);
    }

    this.showSelect = false;
  }

  onCategoryChange(categoryId: number): void {
    this.selectedIdCategory = categoryId;
    this.loadSubcategories(categoryId);
  }

  loadSubcategories(categoryId: number): void {
    this.selectedIdCategory = categoryId;
    this.subcategoryService.fetchSubcategories(categoryId);
    this.subcategoryService
      .getSubcategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((subcategories) => {
        this.subcategories = subcategories;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const idCategory = params['idCategory'];
      console.log('idCategory');
      console.log(idCategory);
      if (idCategory) {
        this.selectedIdCategory = idCategory;
        this.loadCategories();
        this.loadSubcategories(idCategory);
      } else {
        if (this.selectedIdCategory) {
          this.loadSubcategories(this.selectedIdCategory);
          this.loadDefaultCategory();
        } else {
          this.loadCategories();
          this.loadDefaultCategory();
        }
      }
    });

    this.categoryForm = new FormGroup({
      idCategory: new FormControl(this.selectedIdCategory),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectSubcategory(subcategory: Subcategory): void {
    this.selectedSubcategory = subcategory;

    if (subcategory) {
      this.router.navigate([`/todos/idsubcat/${subcategory.id}`]);
    }
  }

  onNewSubcategory() {
    this.router.navigate(['/todos/subcategories/new']);
  }

  onEditSubcategory(subcategoryId: number) {
    this.router.navigate([`/todos/subcategories/${subcategoryId}/edit`]);
  }

  onDelete(categoryId: number, item: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this subcategory?',
        item: item,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.subcategoryService
          .deleteSubcategory(categoryId)
          .pipe(
            catchError((error) => {
              console.error('Error deleting todo', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.subcategoryService.fetchSubcategories(
                this.selectedIdCategory
              );
            },
          });
      }
    });
  }
}
