import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, take, takeUntil } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { TodosModule } from '../../todos.module';
import { iconsData } from '../../../shared/iconsData';

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
    private formBuilder: FormBuilder
  ) {}

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
            //console.error('Error adding todo', error);
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
