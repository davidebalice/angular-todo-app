import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Subcategory } from '../../../model/subcategory.model';
import { SubcategoryService } from '../../../services/subcategory.service';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrl: './subcategory-edit.component.scss',
})
export class SubcategoryEditComponent implements OnInit, OnDestroy {
  id: number | undefined;
  categories$: Observable<any[]>;
  subcategoryForm: FormGroup;
  subcategory: Subcategory;
  subcategory$: Observable<Subcategory> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  subcategories$: Observable<any[]>;
  selectedIdCategory: number = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.subcategory$ = this.subcategoryService.getById(this.id);

        this.subcategoryService
          .getById(this.id)
          .pipe(
            map((subcategory) => {
              this.subcategory = subcategory;
              this.selectedIdCategory = this.subcategory.idCategory;
              this.initForm(this.subcategory);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    });
  }

  onCategoryChange(categoryId: number): void {
    this.selectedIdCategory = categoryId;
    this.subcategoryForm.get('category.id').setValue(categoryId);
  }

  onSubmit() {
    if (this.subcategoryForm.valid && !this.submitting) {
      this.submitting = true;
      console.log(this.subcategoryForm.value);
      console.log(this.subcategoryForm.value);
      console.log(this.subcategoryForm.value);
      console.log(this.subcategoryForm.value);
      this.subcategoryService
        .updateSubcategory(this.id, this.subcategoryForm.value)
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
            console.log('Subcategory updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating category', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['./products/subcategories']);
  }

  private initForm(subcategory: Subcategory) {
    this.selectedIdCategory = subcategory.idCategory;

    this.subcategoryForm = this.formBuilder.group({
      name: [subcategory.name, Validators.required],
      description: [subcategory.description],
      idCategory: [subcategory.idCategory, Validators.required],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['./products/subcategories']);
  }
}
