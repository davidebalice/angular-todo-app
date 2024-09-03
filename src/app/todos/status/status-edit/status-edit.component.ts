import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { Status } from '../../../model/status.model';
import { StatusService } from '../../../services/status.service';
import { iconsData } from '../../../shared/iconsData';
import { TodosModule } from '../../todos.module';

@Component({
  selector: 'app-status-edit',
  standalone: true,
  templateUrl: './status-edit.component.html',
  styleUrl: './status-edit.component.scss',
  imports: [TodosModule],
})
export class StatusEditComponent implements OnInit, OnDestroy {
  id: number = 0;
  statusForm: FormGroup | undefined;
  status: Status | undefined;
  statusOne$: Observable<Status> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  status$: Observable<any[]> | undefined;
  icons: string[] = iconsData;


  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.statusOne$ = this.statusService.getById(this.id);

        this.statusService
          .getById(this.id)
          .pipe(
            map((status) => {
              this.status = status;
              this.initForm(this.status);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.statusForm && this.statusForm.valid && !this.submitting) {
      this.submitting = true;
      this.statusService
        .updateStatus(this.id, this.statusForm.value)
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
            console.log('Status updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating status', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['./todos/status']);
  }

  private initForm(status: Status) {
    this.statusForm = new FormGroup({
      name: new FormControl(status.name, Validators.required),
      color: new FormControl(status.color, Validators.required),
      icon: new FormControl(status.icon, Validators.required),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['./todos/status']);
  }
}
