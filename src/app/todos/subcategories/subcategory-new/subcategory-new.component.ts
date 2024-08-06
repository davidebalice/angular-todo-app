import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { TodosModule } from '../../todos.module';

@Component({
  selector: 'app-subcategory-new',
  templateUrl: './subcategory-new.component.html',
  styleUrl: './subcategory-new.component.scss',
  standalone: true,
  imports: [TodosModule],
})
export class SubcategoryNewComponent {
  subcategoryForm: FormGroup | undefined;
  submitting = false;
  imageFile: File | null = null;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]> | undefined;
  selectedIdCategory: number = 0;

  constructor(
    private route: ActivatedRoute,
    private subCategoryService: SubcategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadDefaultCategory();
    this.subcategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      category: this.formBuilder.group({
        id: new FormControl(this.selectedIdCategory, Validators.required),
      }),
    });
  }

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  loadDefaultCategory(): void {
    if (!this.selectedIdCategory && this.categories$) {
      this.categories$.subscribe((categories) => {
        if (categories.length > 0) {
          this.selectedIdCategory = categories[0].id;
          console.log(this.selectedIdCategory);
          this.loadSubcategories(this.selectedIdCategory);
        }
      });
    } else {
      this.loadSubcategories(this.selectedIdCategory);
    }
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = parseInt(selectElement.value, 10);
    if (!isNaN(categoryId)) {
      this.selectedIdCategory = categoryId;
      this.loadSubcategories(categoryId);
    } else {
      console.error('ID categoria non valido:', selectElement.value);
    }

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

  loadSubcategories(categoryId: number): void {
    this.selectedIdCategory = categoryId;
  }

  onSubmit() {
    if (
      this.subcategoryForm &&
      this.subcategoryForm.valid &&
      !this.submitting
    ) {
      this.submitting = true;

      this.subCategoryService
        .addSubcategory(this.subcategoryForm.value)
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
            console.log('Subcategory added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding todo', error);
          },
        });
    }
  }

  onCancel() {
    this.onBack();
  }

  onBack() {
    this.router.navigate(['./todos/subcategories/'], {
      queryParams: { idCategory: this.selectedIdCategory },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
