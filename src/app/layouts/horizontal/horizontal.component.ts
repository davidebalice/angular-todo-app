import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// Components
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';
import { TopbarHeaderComponent } from '../topbar-header/topbar-header.component';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [RouterLink,RouterOutlet,SidebarComponent,TopbarComponent,RightsidebarComponent,TopbarHeaderComponent],
  templateUrl: './horizontal.component.html',
  styleUrl: './horizontal.component.scss'
})
export class HorizontalComponent {

}
