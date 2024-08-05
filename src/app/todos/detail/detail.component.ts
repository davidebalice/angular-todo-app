import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppConfig } from '../../app-config';
import { Product } from '../../model/todo.model';
import { ProductService } from '../../services/todo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  product: Product;
  product$: Observable<Product> | undefined;
  id: number | undefined;

  private subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.id = data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.id) {
      this.product$ = this.productService.getById(this.id);
      this.subscription = this.product$.subscribe((product: Product) => {
        this.product = product;
      });
    }
  }

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/products/image/${imageUrl}`;
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }

  onBackProducts() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
