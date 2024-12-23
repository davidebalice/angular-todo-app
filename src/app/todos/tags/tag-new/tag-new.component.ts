import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, finalize, take, takeUntil } from 'rxjs';
import { TagService } from '../../../services/tag.service';
import { TodosModule } from '../../todos.module';
import { iconsData } from '../../../shared/iconsData';
import { DemoDialogComponent } from '../../../components/demo-dialog/demo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-new',
  standalone: true,
  templateUrl: './tag-new.component.html',
  styleUrl: './tag-new.component.scss',
  imports: [TodosModule],
})
export class TagNewComponent {
  tagForm: FormGroup | undefined;
  submitting = false;
  selectedColor: string = '#333333';
  private destroy$ = new Subject<void>();
  icons: string[] = iconsData;

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router,
    private formBuilder: FormBuilder,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['#333333', Validators.required],
      icon: ['sell', Validators.required],
    });
  }

  onSubmit() {
    if (this.tagForm && this.tagForm.valid && !this.submitting) {
      this.submitting = true;

      this.tagService
        .addTag(this.tagForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            if (error.message.includes('Demo')) {
              this.openDemoDialog();
            }
            console.error('Error adding tag', error);
            throw error;
          }),
          finalize(() => {
            this.submitting = false;
            this.onCancel();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Tag added successfully', response);
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
    this.router.navigate(['./todos/tags']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
