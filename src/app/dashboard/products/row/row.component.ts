import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, take } from 'rxjs';
import { AppConfig } from '../../../app-config';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { ListDashboardComponent } from '../list/list.component';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrl: './row.component.css',
})
export class RowComponent implements OnInit {
  @Input() product: Product;
  fullStars: number = 0;
  halfStar: boolean = false;
  private subscription: Subscription;
  constructor(
    private productService: ProductService,
    private router: Router,
    private listComponent: ListDashboardComponent,
  ) {}



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
}
