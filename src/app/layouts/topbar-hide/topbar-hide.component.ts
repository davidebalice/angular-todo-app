import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// Components
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-topbar-hide',
  standalone: true,
  imports: [RouterLink,RouterOutlet,SidebarComponent],
  templateUrl: './topbar-hide.component.html',
  styleUrl: './topbar-hide.component.scss'
})
export class TopbarHideComponent {

}
