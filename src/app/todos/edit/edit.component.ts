import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, catchError, finalize, map, take } from 'rxjs';
import { DemoDialogComponent } from 'src/app/components/demo-dialog/demo-dialog.component';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Product } from '../../model/todo.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/todo.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  id: number | undefined;
  productForm: FormGroup;
  product: Product;
  product$: Observable<Product> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]>;
  subcategories$: Observable<any[]>;

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
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.product$ = this.productService.getById(this.id);

        this.productService
          .getById(this.id)
          .pipe(
            map((product) => {
              this.product = product;
              this.initForm(this.product);
            })
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid && !this.submitting) {
      this.submitting = true;
      this.productService
        .updateProduct(this.id, this.productForm.value)
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
            this.onCancel();
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Product updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating product', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  private initForm(product: Product) {
    this.productForm = this.formBuilder.group({
      name: [product.name, Validators.required],
      idCategory: [product.idCategory, Validators.required],
      idSubcategory: [product.idSubcategory],
      description: [product.description, Validators.required],
      sku: [product.sku],
      price: [product.price],
    });

    this.productForm.get('idCategory')?.valueChanges.subscribe((categoryId) => {
      this.loadSubcategories(categoryId);
    });

    this.loadSubcategories(product.idCategory);
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

  onBack() {
    this.router.navigate(['./products']);
  }
}
