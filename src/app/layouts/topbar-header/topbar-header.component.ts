import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
// Services
import { EventService } from '../layout/event.service';
import { TriggerComponent } from '../trigger/trigger.component';
// Data Get
import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-topbar-header',
  standalone: true,
  imports: [CommonModule,RouterLink,TriggerComponent],
  templateUrl: './topbar-header.component.html',
  styleUrl: './topbar-header.component.scss'
})
export class TopbarHeaderComponent {
  menu: any;
  menuItems: MenuItem[] = [];

  constructor(private router: Router,public eventService: EventService) {
    // Menu Items
    this.menuItems = MENU;
  }

  ngAfterViewInit() {
    const currentUrl = this.router.url;    
    const ul = document.querySelector(".header__menu") as HTMLUListElement ;
    const items = Array.from(ul.querySelectorAll("a.header__menu__link"));
    let matchingMenuItem = items.find((x: any) => {
      return x.pathname === currentUrl;
    });
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }   
  }

  // Toggle Menu
  toggleItem(el: any) {
    let isCurrentMenuId = el.target.closest('a.header__menu__link');
    const ul = document.querySelector(".header__menu") as HTMLUListElement ;
    if(ul){
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));      
      activeIconItems.forEach((item: any) => {
        item.classList.remove("active");
      });    
    }
    this.activateParentDropdown(isCurrentMenuId);
  }

  // Activate Parent dropdown
  activateParentDropdown(item:any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".header__menu__item.has-children");
    parentCollapseDiv.querySelector('a')?.classList.add("active");
  }

}
