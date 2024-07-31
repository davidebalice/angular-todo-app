import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatModule } from 'src/app/appModules/mat.module';

@Component({
  selector: 'app-demo-dialog',
  standalone: true,
  imports: [CommonModule, MatModule],
  template: `
    <h2 mat-dialog-title>Demo mode</h2>
    <mat-dialog-content class="message">
      Demo mode is active, crud operations (write, update, delete)
      <br />
      are not allowed.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="primary">Cancel</button>
    </mat-dialog-actions>
  `,
})
export class DemoDialogComponent {
  constructor() {}
}
