import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, catchError, finalize, map, take } from 'rxjs';
import { DemoDialogComponent } from 'src/app/components/demo-dialog/demo-dialog.component';
import { AppConfig } from '../../app-config';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
})
export class PhotoComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  todoForm: FormGroup;
  todo: Todo;
  todo$: Observable<Todo> | undefined;
  submitting = false;
  file: any;
  imageUrl: string;

  get todoControls() {
    return (this.todoForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private http: HttpClient,
    public demoDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = +params['id'];

      if (this.editMode) {
        if (this.id !== undefined) {
          this.todo$ = this.todoService.getById(this.id);

          this.todoService
            .getById(this.id)
            .pipe(
              map((todo) => {
                this.todo = todo;
                this.initForm(this.todo);
                this.imageUrl = todo.imageUrl;
              })
            )
            .subscribe();
        }
      }
    });
  }

  uploadImage(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (!this.submitting) {
      this.submitting = true;
      this.todoService
        .uploadTodo(this.id, this.file)
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
            this.imageUrl = this.id + '_' + this.file.name;
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

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/todos/image/${imageUrl}`;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(todo: Todo) {
    let todoImageUrl = '';

    if (this.editMode && todo) {
      todoImageUrl = todo.imageUrl;
    }

    this.todoForm = new FormGroup({
      image: new FormControl(todoImageUrl, Validators.required),
    });
  }

  onBack() {
    this.router.navigate(['./todos']);
  }
}
