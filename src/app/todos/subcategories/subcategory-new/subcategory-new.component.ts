import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';

@Component({
  selector: 'app-subcategory-new',
  templateUrl: './subcategory-new.component.html',
  styleUrl: './subcategory-new.component.scss',
})
export class SubcategoryNewComponent {
  subcategoryForm: FormGroup;
  submitting = false;
  imageFile: File | null = null;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]>;
  selectedIdCategory: number = null;

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
    if (!this.selectedIdCategory) {
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

  onCategoryChange(categoryId: number): void {
    this.selectedIdCategory = categoryId;
    this.loadSubcategories(categoryId);
    this.subcategoryForm.get('category.id').setValue(categoryId);
  }

  loadSubcategories(categoryId: number): void {
    this.selectedIdCategory = categoryId;
  }

  onSubmit() {
    if (this.subcategoryForm.valid && !this.submitting) {
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
            //console.error('Error adding product', error);
          },
        });
    }
  }

  onCancel() {
    this.onBack();
  }

  onBack() {
    this.router.navigate(['./products/subcategories/'], {
      queryParams: { idCategory: this.selectedIdCategory },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
