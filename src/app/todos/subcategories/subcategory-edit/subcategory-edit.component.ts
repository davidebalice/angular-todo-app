import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { Subcategory } from '../../../model/subcategory.model';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { TodosModule } from '../../todos.module';

@Component({
  selector: 'app-subcategory-edit',
  standalone: true,
  templateUrl: './subcategory-edit.component.html',
  styleUrl: './subcategory-edit.component.scss',
  imports: [TodosModule],
})
export class SubcategoryEditComponent implements OnInit, OnDestroy {
  id: number = 0;
  categories$: Observable<any[]> | undefined;
  subcategoryForm: FormGroup | undefined;
  subcategory: Subcategory | undefined;
  subcategory$: Observable<Subcategory> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  subcategories$: Observable<any[]> | undefined;
  selectedIdCategory: number = 0;

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

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = parseInt(selectElement.value, 10);
    this.selectedIdCategory = categoryId;
    if (this.subcategoryForm) {
      const categoryControl = this.subcategoryForm.get('category.id');

      if (categoryControl) {
        categoryControl.setValue(categoryId);
      } else {
        console.error('Control "category.id" not found in the form');
      }
    } else {
      console.error('Form "subcategoryForm" is undefined');
    }
  }

  onSubmit() {
    if (
      this.subcategoryForm &&
      this.subcategoryForm.valid &&
      !this.submitting
    ) {
      this.submitting = true;

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
    this.router.navigate(['./todos/subcategories']);
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
    this.router.navigate(['./todos/subcategories']);
  }
}
