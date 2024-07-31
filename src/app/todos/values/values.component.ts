import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { AttributeService } from 'src/app/services/attribute.service';
import { Product } from '../../model/product.model';
import { Value } from '../../model/value.model';
import { ValueService } from '../../services/value.service';
@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css'],
})
export class ValuesComponent implements OnInit, OnDestroy {
  values: Value[] = [];
  selectedValue: Value = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  isLoading = true;
  selectedIdAttribute: number = null;
  showSelect: boolean = false;
  private destroy$ = new Subject<void>();
  attributes$: Observable<any[]>;
  attributeForm: FormGroup;

  constructor(
    private attributeService: AttributeService,
    private valueService: ValueService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  loadAttributes(): void {
    this.attributeService.fetchAttributes();
    this.attributes$ = this.attributeService.getAttributes();
  }

  onAttributeChange(attributeId: number): void {
    this.isLoading = true;
    this.selectedIdAttribute = attributeId;
    this.loadValues(attributeId);
  }

  loadValues(attributeId: number): void {
    this.isLoading = true;
    this.selectedIdAttribute = attributeId;
    this.valueService.fetchValues(attributeId);
    this.valueService
      .getValues()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.values = values;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const idAttribute = +params['idAttribute'];
      if (idAttribute) {
        this.selectedIdAttribute = idAttribute;
        this.loadAttributes();
        this.loadValues(idAttribute);
      } else {
        if (!this.selectedIdAttribute) {
          this.loadAttributes();
          this.loadDefaultValues();
        } else {
          this.loadValues(this.selectedIdAttribute);
        }
      }
    });

    this.attributeForm = new FormGroup({
      idAttribute: new FormControl(this.selectedIdAttribute),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDefaultValues(): void {
    if (!this.selectedIdAttribute) {
      this.attributes$.pipe(take(2)).subscribe((attributes) => {
        if (attributes.length > 0) {
          this.selectedIdAttribute = attributes[0].id;
          this.loadValues(this.selectedIdAttribute);
          this.attributeForm = new FormGroup({
            idAttribute: new FormControl(this.selectedIdAttribute),
          });
        }
      });
    } else {
      this.loadValues(this.selectedIdAttribute);
    }

    this.showSelect = false;
  }

  onSelectValue(value: Value): void {
    this.selectedValue = value;

    if (value) {
      this.router.navigate([`/products/idattr/${value.id}`]);
    }
  }

  onNewValue() {
    this.router.navigate(['/products/values/new']);
  }

  onEditValue(valueId: number) {
    this.router.navigate([`/products/values/${valueId}/edit`]);
  }

  onDelete(attributeId: number, item: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this value?',
        item: item,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.valueService
          .deleteValue(attributeId)
          .pipe(
            catchError((error) => {
              console.error('Error deleting product', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.valueService.fetchValues(this.selectedIdAttribute);
            },
          });
      }
    });
  }
}
