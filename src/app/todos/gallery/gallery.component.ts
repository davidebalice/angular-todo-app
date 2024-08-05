import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppConfig } from '../../app-config';
import { DemoDialogComponent } from '../../components/demo-dialog/demo-dialog.component';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  todoForm: FormGroup;
  todo: Todo;
  todo$: Observable<Todo> | undefined;
  submitting = false;
  file: any;
  imageUrl: string;
  selectedFiles: File[] = [];
  uploadedImages: string[] = [];

  get todoControls() {
    return (this.todoForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public demoDialog: MatDialog,
    private imageDialog: MatDialog
  ) {}

  openDemoDialog() {
    this.demoDialog.open(DemoDialogComponent);
  }

  openImageDialog(imageUrl: string, directory: string): void {
    this.imageDialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl, directory: directory },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (this.id !== undefined) {
        this.todo$ = this.todoService.getById(this.id);

        this.todoService
          .getById(this.id)
          .pipe(
            map((todo) => {
              this.todo = todo;
              //this.initForm(this.todo);
            })
          )
          .subscribe();
      }
      this.loadImages();
      this.todoForm = this.fb.group({
        images: [null],
      });
    });
  }

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    const id = this.id;
    this.todoService.uploadGallery(id, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Images uploaded successfully:', response);
      },
      error: (error) => {
        console.error('Error uploading images:', error);
      },
      complete: () => {
        console.log('Upload process completed.');
        this.loadImages();
      },
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/todos/gallery/${imageUrl}`;
  }

  loadImages() {
    this.todoService.getImages(this.id).subscribe({
      next: (response) => {
        this.uploadedImages = response['gallery'];
      },
      error: (error) => {
        console.error('Error loading existing images:', error);
      },
    });
  }

  onBack() {
    this.router.navigate(['./todos']);
  }
}
