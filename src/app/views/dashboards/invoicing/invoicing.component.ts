import { Component,Renderer2  } from '@angular/core';
import { CommonModule } from '@angular/common';
// Bootstrap
import { NgbDropdownModule,NgbNavModule,NgbCollapseModule  } from '@ng-bootstrap/ng-bootstrap';
// Data Get
import { InvoiceWidgetData,InvoiceListData } from './data';
import { InvoiceWidgetModel,InvoiceListModel } from './model';

@Component({
  selector: 'app-invoicing',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule,NgbNavModule,NgbCollapseModule ],
  templateUrl: './invoicing.component.html',
  styleUrl: './invoicing.component.scss'
})
export class InvoicingComponent {

  active = 1;
  isCollapsed = false;
  // Invoice Widget
  InvoiceWidgetData!: InvoiceWidgetModel[];
  // Invoice List
  InvoiceListData!: InvoiceListModel[];

  constructor(private renderer: Renderer2) {
    /**
    * Fetches the data
    */
    this.fetchData();
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    // Invoice Widget
    this.InvoiceWidgetData = InvoiceWidgetData;
    // Invoice List
    this.InvoiceListData = InvoiceListData;
  }

}
