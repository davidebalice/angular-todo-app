import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
// components
import { HorizontalComponent } from '../horizontal/horizontal.component';
import { VerticalComponent } from '../vertical/vertical.component';
// services
import { EventService } from './event.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    VerticalComponent,
    HorizontalComponent,
    HttpClientModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  layoutType!: string;
  nav: string | null | undefined;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.nav = localStorage.getItem('navbar') ?? 'side';
    this.layoutType = this.nav;
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === 'side';
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === 'top';
  }
}
