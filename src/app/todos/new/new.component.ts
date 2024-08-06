import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  take,
  takeUntil,
} from 'rxjs';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { TodoService } from '../../services/todo.service';
import { TodosModule } from '../todos.module';

@Component({
  selector: 'app-new',
  standalone: true,
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  imports: [TodosModule],
})
export class NewComponent implements OnInit {
  todoForm: FormGroup | undefined;
  submitting = false;
  imageFile: File | null = null;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]> | undefined;
  subcategories$: Observable<any[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.todoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      sku: [''],
      price: [''],
      idCategory: 0,
      idSubcategory: 0,
    });

    this.todoForm.get('idCategory')?.valueChanges.subscribe((categoryId) => {
      this.loadSubcategories(categoryId);
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit() {
    if (this.todoForm && this.todoForm.valid && !this.submitting) {
      this.submitting = true;

      this.todoService
        .addTodo(this.todoForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            if (error.message.includes('Demo')) {
              this.openDemoDialog();
            }
            console.error('Error adding todo', error);
            throw error;
          }),
          finalize(() => {
            this.submitting = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Todo added successfully', response);
            this.onCancel();
          },
          error: (error) => {
            console.error('Error adding todo', error.error);
          },
        });
    }
  }

  onSubmitWithPhoto() {
    if (this.todoForm && this.todoForm.valid && !this.submitting) {
      const formData = new FormData();

      formData.append('name', this.todoForm.get('name')?.value);
      formData.append('description', this.todoForm.get('description')?.value);
      formData.append('idCategory', this.todoForm.get('idCategory')?.value);
      formData.append('sku', this.todoForm.get('sku')?.value);
      formData.append('price', this.todoForm.get('price')?.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.submitting = true;
      this.todoService
        .addTodoWithPhoto(formData)
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
            console.log('Todo added successfully', response);
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
    this.router.navigate(['./todos']);
  }

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  loadSubcategories(categoryId: number): void {
    this.subcategoryService.fetchSubcategories(categoryId);
    this.subcategories$ = this.subcategoryService.getSubcategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
