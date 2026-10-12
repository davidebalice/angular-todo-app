import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [],
  templateUrl: './blank.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
