import { Component,inject,TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// Bootstrap
import { NgbNavModule,NgbDropdownModule,NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// Data Get
import { ContactData } from './data';
import { ContactModel } from './model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,NgbNavModule,NgbDropdownModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  active = 2;
  closeResult = '';
  // Contact Data
  ContactData!: ContactModel[];
  private modalService = inject(NgbModal);

 constructor() {
   // Contact Data
   this.ContactData = ContactData;
 }

  //  Open Modal
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        
      },
    );
  }

}
