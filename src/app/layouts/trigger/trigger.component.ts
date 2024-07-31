import { Component, Input } from '@angular/core';
import { OffcanvasService } from '../rightsidebar/offcanvas.service';

@Component({
  selector: 'app-trigger',
  standalone: true,
  imports: [],
  templateUrl: './trigger.component.html',
  styleUrl: './trigger.component.scss'
})
export class TriggerComponent {
  @Input() id!: string;

  constructor(private offcanvasService: OffcanvasService) { }

  // Close Offcanvas
  closeOffcanvas() {
    this.offcanvasService.close(this.id);
  }

  // Toggle Offcanvas
  toggleOffcanvas() {    
    this.offcanvasService.toggle(this.id);
    document.querySelector(".dashboard")?.classList.add('overlay_active');
  }
}
