import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class ProductsComponent {
  selectedProduct: Product;
  pagination: boolean = true;
  visualization: string = 'row';

  constructor(private router: Router) {}

  ngOnInit() {}

  onBackProducts() {}

  onNewProduct() {
    this.router.navigate(['/todos/new']);
  }

  onChangeView(type: string) {
    this.visualization = type;
  }
}
