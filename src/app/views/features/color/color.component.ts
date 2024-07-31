import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Data Get
import { DarkData,LightData } from './data';
import { DarkColorModel,LightColorModel } from './model';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
   // Dark Color Data
   DarkData!: DarkColorModel[];
   LightData!: LightColorModel[];

  constructor() {
    // Dark Color Data
    this.DarkData = DarkData;

    // Light Color Data
    this.LightData = LightData;
  }

}
