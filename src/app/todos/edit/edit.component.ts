import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, catchError, finalize, map, take } from 'rxjs';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';
import { Todo } from '../../model/todo.model';
import { CategoryService } from '../../services/category.service';
import { StatusService } from '../../services/status.service';
import { TagService } from '../../services/tag.service';
import { TodoService } from '../../services/todo.service';
import { TodosModule } from '../todos.module';
@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  imports: [TodosModule],
})
export class EditComponent implements OnInit {
  id: number = 0;
  todoForm: FormGroup | undefined;
  todo: Todo | undefined;
  todo$: Observable<Todo> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]> | undefined;
  tags$: Observable<any[]> | undefined;
  status$: Observable<any[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
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
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.todo$ = this.todoService.getById(this.id);

        this.todoService
          .getById(this.id)
          .pipe(
            map((todo) => {
              this.todo = todo;
              this.initForm(this.todo);
            })
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.todoForm && this.todoForm.valid && !this.submitting) {
      this.submitting = true;
      this.todoService
        .updateTodo(this.id, this.todoForm.value)
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
            this.onCancel();
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Todo updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating todo', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['/todos']);
  }

  private initForm(todo: Todo) {
    this.todoForm = this.formBuilder.group({
      title: [todo.title, Validators.required],
      categoryId: [todo.categoryId, Validators.required],
      tagId: [todo.tagId, Validators.required],
      statusId: [todo.statusId, Validators.required],
      description: [todo.description, Validators.required],
    });

    /*
    this.todoForm.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      this.loadSubcategories(categoryId);
    });
    this.loadSubcategories(todo.categoryId);
    */
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

  onBack() {
    this.router.navigate(['./todos']);
  }
}
