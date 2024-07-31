import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// Components
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';
import { TopbarHeaderComponent } from '../topbar-header/topbar-header.component';

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [RouterLink,RouterOutlet,SidebarComponent,TopbarComponent,RightsidebarComponent,TopbarHeaderComponent],
  templateUrl: './vertical.component.html',
  styleUrl: './vertical.component.scss'
})
export class VerticalComponent {

  constructor() {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-nav', 'side');
  }

}
