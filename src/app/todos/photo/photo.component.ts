import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, catchError, finalize, map, take } from 'rxjs';
import { DemoDialogComponent } from 'src/app/components/demo-dialog/demo-dialog.component';
import { AppConfig } from '../../app-config';
import { Product } from '../../model/todo.model';
import { ProductService } from '../../services/todo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
})
export class PhotoComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  productForm: FormGroup;
  product: Product;
  product$: Observable<Product> | undefined;
  submitting = false;
  file: any;
  imageUrl: string;

  get productControls() {
    return (this.productForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = +params['id'];

      if (this.editMode) {
        if (this.id !== undefined) {
          this.product$ = this.productService.getById(this.id);

          this.productService
            .getById(this.id)
            .pipe(
              map((product) => {
                this.product = product;
                this.initForm(this.product);
                this.imageUrl = product.imageUrl;
              })
            )
            .subscribe();
        }
      }
    });
  }

  uploadImage(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (!this.submitting) {
      this.submitting = true;
      this.productService
        .uploadProduct(this.id, this.file)
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
            this.imageUrl = this.id + '_' + this.file.name;
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

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/products/image/${imageUrl}`;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(product: Product) {
    let productImageUrl = '';

    if (this.editMode && product) {
      productImageUrl = product.imageUrl;
    }

    this.productForm = new FormGroup({
      image: new FormControl(productImageUrl, Validators.required),
    });
  }

  onBack() {
    this.router.navigate(['./products']);
  }
}
