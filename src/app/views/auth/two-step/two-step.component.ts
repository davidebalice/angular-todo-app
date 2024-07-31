import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOtpInputModule } from  'ng-otp-input';

@Component({
  selector: 'app-two-step',
  standalone: true,
  imports: [RouterLink,NgOtpInputModule],
  templateUrl: './two-step.component.html',
  styleUrl: './two-step.component.scss'
})
export class TwoStepComponent {
  /**
   * Confirm Otp Verification
   */
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '68px',
      'height': '56px',
      'border-radius': '12px',
      'font-size': 'inherit',
    }
  };
}
