import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasService } from './offcanvas.service';
import { EventService } from '../layout/event.service';

@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightsidebar.component.html',
  styleUrl: './rightsidebar.component.scss'
})
export class RightsidebarComponent {
  @Input() id!: string;
  isOpen = false;
  layout: string | undefined;
  mode: string | undefined;
  navbar: string | undefined;
  theme: string | null | undefined;
  dir: string | null | undefined;
  nav: string | null | undefined;

  constructor(private offcanvasService: OffcanvasService,private eventService: EventService) { }

  ngOnInit(): void {
    this.offcanvasService.getOffcanvasState$(this.id).subscribe(state => {
      this.isOpen = state;
    });

    // Local Storage Theme Data
    this.theme = localStorage.getItem('theme') ?? 'light';
    document.documentElement.setAttribute('data-theme', this.theme);

    // Local Storage Layout Data
    this.dir = localStorage.getItem('layout') ?? 'ltr';
    document.documentElement.setAttribute('dir', this.dir);

    // Local Storage Navbar Data
    this.nav = localStorage.getItem('navbar') ?? 'side';
    document.documentElement.setAttribute('data-nav', this.nav);    
    
    // Initial Data
    this.layout = this.dir;
    this.mode = this.theme;
    this.navbar = this.nav;
  }

  // Close Offcanvas
  close() {
    this.offcanvasService.close(this.id);
    document.querySelector(".dashboard")?.classList.remove('overlay_active');
  }

  // Change Mode
  changeLayout(layout: string) {
    this.layout = layout;
    document.documentElement.setAttribute('dir', layout);
    localStorage.setItem('layout', layout);
  }

  // Mode Type
  changeMode(mode: string) {
    this.mode = mode;
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }

  // Navbar Type
  changeNavbar(navbar: string) {
    this.navbar = navbar;
    document.documentElement.setAttribute('data-nav', navbar);
    localStorage.setItem('navbar', navbar);
    this.eventService.broadcast('changeLayout', navbar);
  }

}
