import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// Bootstrap
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
// services
import { EventService } from '../layout/event.service';
// Data
import { MatIconModule } from '@angular/material/icon';
import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgbCollapseModule,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menu: any;
  menuItems: MenuItem[] = [];
  isCollapsed = false;

  constructor(private router: Router, public eventService: EventService) {
    this.menuItems = MENU;
  }

  ngAfterViewInit() {
    const currentUrl = this.router.url;
    const ul = document.querySelector('.sidebar__menu') as HTMLUListElement;
    const items = Array.from(ul.querySelectorAll('a.sidebar__menu__link'));
    let matchingMenuItem = items.find((x: any) => {
      return x.pathname === currentUrl;
    });
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  // Activate Parent dropdown
  updateActive(event: any) {
    this.activateParentDropdown(event.target);
  }

  // Remove Active Class
  removeActivation(items: any) {
    items.forEach((item: any) => {
      item.classList.remove('active');
    });
  }

  // Activate Parent Class
  activateParentDropdown(item: any) {
    item.classList.add('active');
    let parentCollapseDiv1 = item.closest('.sidebar__menu__item.has-children');
    parentCollapseDiv1.querySelector('a')?.classList.add('active');
    parentCollapseDiv1.querySelector('.collapse')?.classList.add('d-block');
  }

  // Toggle Menu
  toggleItem(el: any) {
    let isCurrentMenuId = el.target.closest('a.sidebar__menu__link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains('d-block')) {
      isMenu.classList.remove('d-block');
    } else {
      let dropDowns = Array.from(
        document.querySelectorAll('.sidebar__menu .d-block')
      );
      dropDowns.forEach((node: any) => {
        node.classList.remove('d-block');
      });

      const ul = document.querySelector('.sidebar__menu') as HTMLUListElement;
      if (ul) {
        const iconItems = Array.from(ul.getElementsByTagName('a'));
        let activeIconItems = iconItems.filter((x: any) =>
          x.classList.contains('active')
        );
        activeIconItems.forEach((item: any) => {
          item.classList.remove('active');
        });
      }
      this.activateParentDropdown(isCurrentMenuId);
    }
  }

  // Close Model
  closeModel(element: any) {
    document.querySelector('.sidebar')?.classList.remove('d-block');
    document.querySelector('.dashboard')?.classList.remove('overlay_active');
  }
}
