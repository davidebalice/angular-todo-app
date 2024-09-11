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
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { StatusService } from '../../services/status.service';
import { TagService } from '../../services/tag.service';
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
  tags$: Observable<any[]> | undefined;
  status$: Observable<any[]> | undefined;
  user$: Observable<any> | undefined;
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private statusService: StatusService,
    private router: Router,
    private formBuilder: FormBuilder,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTags();
    this.loadStatus();
    this.loadUser();

    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      tagId: [0, Validators.required],
      statusId: [0, Validators.required],
      categoryId: [0, Validators.required],
      date: [this.getTodayDate(), Validators.required],
      userId: [this.userId, Validators.required],
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

      formData.append('title', this.todoForm.get('title')?.value);
      formData.append('description', this.todoForm.get('description')?.value);
      formData.append('idCategory', this.todoForm.get('idCategory')?.value);

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

  loadUser(): void {
    this.authService.getLoggedUser().subscribe((user) => {
      this.userId = user?.id;
      if (this.todoForm) {
        this.todoForm.patchValue({ userId: this.userId });
      }
    });
  }
  
  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  loadTags(): void {
    this.tagService.fetchTags();
    this.tags$ = this.tagService.getTags();
  }

  loadStatus(): void {
    this.statusService.fetchStatus();
    this.status$ = this.statusService.getStatus();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
