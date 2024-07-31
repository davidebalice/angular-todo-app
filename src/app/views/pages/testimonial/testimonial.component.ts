import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Data Get
import { TestimonialData } from './data';
import { TestimonialModel } from './model';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {
  // Testimonial Data
  TestimonialData!: TestimonialModel[];

  constructor() {
    // Testimonial Data
    this.TestimonialData = TestimonialData;
  }

}
