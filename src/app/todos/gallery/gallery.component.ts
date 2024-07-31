import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppConfig } from 'src/app/app-config';
import { DemoDialogComponent } from 'src/app/components/demo-dialog/demo-dialog.component';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  productForm: FormGroup;
  product: Product;
  product$: Observable<Product> | undefined;
  submitting = false;
  file: any;
  imageUrl: string;
  selectedFiles: File[] = [];
  uploadedImages: string[] = [];

  get productControls() {
    return (this.productForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public demoDialog: MatDialog,
    private imageDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  openImageDialog(imageUrl: string, directory: string): void {
    this.imageDialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl, directory: directory },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (this.id !== undefined) {
        this.product$ = this.productService.getById(this.id);

        this.productService
          .getById(this.id)
          .pipe(
            map((product) => {
              this.product = product;
              //this.initForm(this.product);
            })
          )
          .subscribe();
      }
      this.loadImages();
      this.productForm = this.fb.group({
        images: [null],
      });
    });
  }

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    const id = this.id;
    this.productService.uploadGallery(id, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Images uploaded successfully:', response);
      },
      error: (error) => {
        console.error('Error uploading images:', error);
      },
      complete: () => {
        console.log('Upload process completed.');
        this.loadImages();
      },
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/products/gallery/${imageUrl}`;
  }

  loadImages() {
    this.productService.getImages(this.id).subscribe({
      next: (response) => {
        this.uploadedImages = response['gallery'];
      },
      error: (error) => {
        console.error('Error loading existing images:', error);
      },
    });
  }

  onBack() {
    this.router.navigate(['./products']);
  }
}
