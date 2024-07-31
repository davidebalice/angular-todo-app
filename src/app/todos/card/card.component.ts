import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, catchError, take } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { AppConfig } from '../../app-config';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { DetailComponent } from '../detail/detail.component';
import { ListCardComponent } from '../list-card/list-card.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() product: Product;
  fullStars: number = 0;
  halfStar: boolean = false;
  private subscription: Subscription;
  constructor(
    private productService: ProductService,
    private router: Router,
    private listCardComponent: ListCardComponent,
    public dialog: MatDialog,
    private imageDialog: MatDialog
  ) {}

  openDialog(id: number): void {
    this.dialog.open(DetailComponent, {
      width: '90%',
      maxWidth: '1200px',
      height: '90%',
      maxHeight: '1200px',
      data: { id: id },
    });
  }

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['/products', this.product.id]);
  }

  private fetchProducts() {
    this.subscription = this.productService
      .fetchProducts()
      .pipe(
        take(1),
        catchError((error) => {
          console.error('Error fetching products', error);
          throw error;
        })
      )
      .subscribe((products) => {
        this.router.navigate(['/reload']).then(() => {
          this.router.navigate(['/products']);
        });
        console.log('Updated products after deletion', products);
      });
  }

  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return '../../../assets/images/nophoto.jpg';
    }
    return `${AppConfig.apiUrl}/products/image/${imageUrl}`;
  }

  onDelete(productId: number, item: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?',
        item: item,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.productService
          .deleteProduct(productId)
          .pipe(
            catchError((error) => {
              if (error.error.message.includes('Demo')) {
                this.listCardComponent.openDemoDialog();
              }
              console.error('Error deleting product', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.fetchProducts();
            },
          });
      }
    });
  }

  onPhotoProduct(productId: number) {
    console.log(productId);
    this.router.navigate(['/products/photo', productId]);
  }

  onGalleryProduct(productId: number) {
    console.log(productId);
    this.router.navigate(['/products/gallery', productId]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditProduct(productId: number) {
    this.router.navigate([`/products/${productId}/edit`]);
  }

  onAttributeProduct(productId: number) {
    this.router.navigate(['/products/set-attributes', productId]);
  }

  generateStarsArray(difficulty: number): string[] {
    const maxStars = 5;
    let starsArray: string[] = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= difficulty) {
        starsArray.push('star');
      } else if (i - 0.5 <= difficulty) {
        starsArray.push('star_half');
      } else {
        starsArray.push('star_border');
      }
    }

    return starsArray;
  }

  openImageDialog(imageUrl: string, directory: string): void {
    this.imageDialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl, directory: directory },
    });
  }
}
