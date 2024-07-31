import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  take,
  takeUntil,
  throwError,
} from 'rxjs';
import { DemoDialogComponent } from 'src/app/components/demo-dialog/demo-dialog.component';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent implements OnInit {
  productForm: FormGroup;
  submitting = false;
  imageFile: File | null = null;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]>;
  subcategories$: Observable<any[]>;

  get productControls() {
    return (this.productForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      sku: [''],
      price: [''],
      idCategory: 0,
      idSubcategory: 0,
    });

    this.productForm.get('idCategory')?.valueChanges.subscribe(categoryId => {
      this.loadSubcategories(categoryId);
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.valid && !this.submitting) {
      this.submitting = true;

      this.productService
        .addProduct(this.productForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            if (error.message.includes('Demo')) {
              this.openDemoDialog();
            }
            console.error('Error adding product', error);
            throw error;
          }),
          finalize(() => {
            this.submitting = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Product added successfully', response);
            this.onCancel();
          },
          error: (error) => {
            console.error('Error adding product', error.error);
          },
        });
    }
  }

  onSubmitWithPhoto() {
    if (this.productForm.valid && !this.submitting) {
      const formData = new FormData();

      formData.append('name', this.productForm.get('name')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('idCategory', this.productForm.get('idCategory')?.value);
      formData.append('sku', this.productForm.get('sku')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.submitting = true;
      this.productService
        .addProductWithPhoto(formData)
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
            console.log('Product added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding product', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['./products']);
  }

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  loadSubcategories(categoryId: number): void {
    this.subcategoryService.fetchSubcategories(categoryId);
    this.subcategories$ = this.subcategoryService.getSubcategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
