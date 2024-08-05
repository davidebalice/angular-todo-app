import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// Bootstrap
import { NgbNavModule,NgbDropdownModule,NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// Data Get
import { ImportantData,CompletedData } from './data';
import { ImportantModel } from './model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,NgbNavModule,NgbDropdownModule ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  private modalService = inject(NgbModal);
  closeResult = '';
  active = 1;
  // Important Data
  ImportantData!: ImportantModel[];
  // Complated Data
  CompletedData!: ImportantModel[];

  constructor() {
    // Important Data
    this.ImportantData = ImportantData;
    // Complated Data
    this.CompletedData = CompletedData;
  }

  // Open Modal
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {},
		);
	}

}
