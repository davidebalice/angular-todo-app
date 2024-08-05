import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Attribute } from '../../model/attribute.model';
import { Product } from '../../model/todo.model';
import { AttributeService } from '../../services/attribute.service';
@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css'],
})
export class AttributesComponent implements OnInit, OnDestroy {
  attributes: Attribute[] = [];
  selectedAttribute: Attribute = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  isLoading = true;

  constructor(
    private attributeService: AttributeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.attributeService.fetchAttributes();
    this.subscription = this.attributeService
      .getAttributes()
      .subscribe((attributes) => {
        this.attributes = attributes;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectAttribute(attribute: Attribute): void {
    this.selectedAttribute = attribute;

    if (attribute) {
      this.router.navigate([`/products/idattr/${attribute.id}`]);
    }
  }

  onNewAttribute() {
    this.router.navigate(['/products/attributes/new']);
  }

  onEditAttribute(attributeId: number) {
    this.router.navigate([`/products/attributes/${attributeId}/edit`]);
  }

  onDelete(attributeId: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this attribute?`,
        item: title,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.attributeService
          .deleteAttribute(attributeId)
          .pipe(
            catchError((error) => {
              console.error('Error deleting product', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.attributeService.fetchAttributes();
            },
          });
      }
    });
  }
}
