import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, catchError, finalize, map, take } from 'rxjs';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';
import { SubcategoryService } from '../../services/subcategory.service';
import { Todo } from '../../model/todo.model';
import { CategoryService } from '../../services/category.service';
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
      name: [todo.name, Validators.required],
      idCategory: [todo.idCategory, Validators.required],
      idSubcategory: [todo.idSubcategory],
      description: [todo.description, Validators.required],
    });

    this.todoForm.get('idCategory')?.valueChanges.subscribe((categoryId) => {
      this.loadSubcategories(categoryId);
    });

    this.loadSubcategories(todo.idCategory);
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

  onBack() {
    this.router.navigate(['./todos']);
  }
}
