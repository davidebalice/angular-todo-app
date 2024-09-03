import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, take, takeUntil } from 'rxjs';
import { StatusService } from '../../../services/status.service';
import { TodosModule } from '../../todos.module';
import { iconsData } from '../../../shared/iconsData';

@Component({
  selector: 'app-status-new',
  standalone: true,
  templateUrl: './status-new.component.html',
  styleUrl: './status-new.component.scss',
  imports: [TodosModule],
})
export class StatusNewComponent {
  statusForm: FormGroup | undefined;
  submitting = false;
  selectedColor: string = '#333333';
  private destroy$ = new Subject<void>();
  icons: string[] = iconsData;

  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.statusForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['#333333', Validators.required],
      icon: ['sell', Validators.required],
    });
  }

  onSubmit() {
    if (this.statusForm && this.statusForm.valid && !this.submitting) {
      this.submitting = true;

      this.statusService
        .addStatus(this.statusForm.value)
        .pipe(
          take(1),
          finalize(() => {
            this.submitting = false;
            this.onCancel();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Status added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding todo', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['./todos/status']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
