import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, finalize, take, takeUntil } from 'rxjs';
import { DemoDialogComponent } from '../../../components/demo-dialog/demo-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { iconsData } from '../../../shared/iconsData';
import { TodosModule } from '../../todos.module';

@Component({
  selector: 'app-category-new',
  standalone: true,
  templateUrl: './category-new.component.html',
  styleUrl: './category-new.component.scss',
  imports: [TodosModule],
})
export class CategoryNewComponent {
  categoryForm: FormGroup | undefined;
  submitting = false;
  selectedColor: string = '#333333';
  private destroy$ = new Subject<void>();
  icons: string[] = iconsData;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['#333333', Validators.required],
      icon: ['sell', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm && this.categoryForm.valid && !this.submitting) {
      this.submitting = true;

      this.categoryService
        .addCategory(this.categoryForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            if (error.message.includes('Demo')) {
              this.openDemoDialog();
            }
            console.error('Error adding category', error);
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
            console.log('Category added successfully', response);
          },
          error: (error) => {
            if (error.message.includes('Demo')) {
              this.openDemoDialog();
            }
            console.error('Error adding category', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['./todos/categories']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
