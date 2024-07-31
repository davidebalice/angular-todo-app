import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Data Get
import { TableData } from './data';
import { TableModel } from './model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  // Dark Color Data
  TableData!: TableModel[];

  constructor() {
    // Table Data
    this.TableData = TableData;
  }

}
