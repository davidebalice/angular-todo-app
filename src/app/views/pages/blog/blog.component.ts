import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Data Get
import { BlogData } from './data';
import { BlogModel } from './model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  // Dark Color Data
  BlogData!: BlogModel[];

  constructor() {
    // Blog Data
    this.BlogData = BlogData;
  }

}
