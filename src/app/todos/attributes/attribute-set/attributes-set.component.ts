import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, map, Subscription, throwError } from 'rxjs';
import { ProductAttributeResponse } from 'src/app/model/attribute.model';
import { AttributeAndValues } from 'src/app/model/attributeAndValues.model';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../model/product.model';
import { AttributeService } from '../../../services/attribute.service';
@Component({
  selector: 'app-attributes-set',
  templateUrl: './attributes-set.component.html',
  styleUrls: ['./attributes-set.component.css'],
})
export class AttributesSetComponent implements OnInit, OnDestroy {
  attributes: AttributeAndValues[] = [];
  settedAttributes: ProductAttributeResponse[] = [];
  selectedAttribute: AttributeAndValues = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  isLoading = true;
  idProduct: number;
  product: Product;

  constructor(
    private attributeService: AttributeService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idProduct = +params['id'];

      this.attributeService.fetchSettedAttributesAndValues(this.idProduct);
      this.subscription = this.attributeService
        .getSettedAttributesAndValues()
        .subscribe((attributes) => {
          this.settedAttributes = attributes;
        });

      if (this.idProduct !== undefined) {
        this.productService
          .getById(this.idProduct)
          .pipe(
            map((product) => {
              this.product = product;
            })
          )
          .subscribe();
      }
    });

    this.attributeService.fetchAttributesAndValues();
    this.subscription = this.attributeService
      .getAttributesAndValues()
      .subscribe((attributes) => {
        this.attributes = attributes;
        this.isLoading = false;
      });
  }

  handleCheckboxChange(
    idAttribute: number,
    idValue: number,
    isChecked: boolean
  ) {
    if (isChecked) {
      this.attributeService
        .addProductValue(idAttribute, idValue, this.idProduct, 'add')
        .pipe(
          catchError((error) => {
            console.error('Error adding value to product:', error);
            return throwError(error);
          })
        )
        .subscribe((response) => {
          console.log('Value added to product:', response);
        });
    } else {
      this.attributeService
        .addProductValue(idAttribute, idValue, this.idProduct, 'remove')
        .pipe(
          catchError((error) => {
            console.error('Error adding value to product:', error);
            return throwError(error);
          })
        )
        .subscribe((response) => {
          console.log('Value added to product:', response);
        });
    }
  }

  isAttributeValueSelected(attributeId: number, valueId: number): boolean {
    console.log(attributeId + ' ' + valueId);

    console.log(this.settedAttributes);

    return this.settedAttributes.some(
      (attr) =>
        attr.attribute.id === attributeId && attr.attributeValue.id === valueId
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBack() {
    this.router.navigate(['./products']);
  }
}
