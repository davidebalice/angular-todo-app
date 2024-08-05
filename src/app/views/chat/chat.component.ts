import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Bootstrap
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// Data Get
import { userData } from './data';
import { UserModel } from './model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  // User Data
  userData!: UserModel[];
  isActive = false;

  constructor() {
    // User Data
    this.userData = userData;
  }

  // Send Invoice Hide/show set
  toggleClass() {
    this.isActive = !this.isActive;
  }

}
