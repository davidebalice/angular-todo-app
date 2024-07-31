import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Data Get
import { PriceData } from './data';
import { PricingModel } from './model';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

  // Pricing Data
  PriceData!: PricingModel[];

  constructor() {
    // Pricing Data
    this.PriceData = PriceData;
  }

}
