import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
  imports: [CommonModule, NgModule],

})
export class CategoryEditComponent implements OnInit, OnDestroy {
  id: number = 0;
  categoryForm: FormGroup | undefined;
  category: Category | undefined;
  category$: Observable<Category> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.category$ = this.categoryService.getById(this.id);

        this.categoryService
          .getById(this.id)
          .pipe(
            map((category) => {
              this.category = category;
              this.initForm(this.category);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.categoryForm && this.categoryForm.valid && !this.submitting) {
      this.submitting = true;
      this.categoryService
        .updateCategory(this.id, this.categoryForm.value)
        .pipe(
          take(1),
          finalize(() => {
            this.submitting = false;
            this.onCancel();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Category updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating category', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['./todos/categories']);
  }

  private initForm(category: Category) {
    let categoryName = category.name;
    let categoryDescription = category.description;

    this.categoryForm = new FormGroup({
      name: new FormControl(categoryName, Validators.required),
      description: new FormControl(categoryDescription),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['./todos/categories']);
  }
}
