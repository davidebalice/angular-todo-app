import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, catchError, take } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { AppConfig } from '../../app-config';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { DetailComponent } from '../detail/detail.component';
import { ListRowComponent } from '../list-row/list-row.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrl: './row.component.css',
  imports: [CommonModule, NgModule],

})
export class RowComponent implements OnInit {
  @Input() todo: Todo;
  fullStars: number = 0;
  halfStar: boolean = false;
  private subscription: Subscription;
  constructor(
    private todoService: TodoService,
    private router: Router,
    private listRowComponent: ListRowComponent,
    public dialog: MatDialog,
    private imageDialog: MatDialog
  ) {}

  openDialog(id: number): void {
    this.dialog.open(DetailComponent, {
      width: '90%',
      maxWidth: '1000px',
      height: '90%',
      maxHeight: '750px',
      data: { id: id },
    });
  }

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['/todos', this.todo.id]);
  }

  private fetchTodos() {
    this.subscription = this.todoService
      .fetchTodos()
      .pipe(
        take(1),
        catchError((error) => {
          console.error('Error fetching todos', error);
          throw error;
        })
      )
      .subscribe((todos) => {
        this.router.navigate(['/reload']).then(() => {
          this.router.navigate(['/todos']);
        });
        console.log('Updated todos after deletion', todos);
      });
  }

  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return '../../../assets/images/nophoto.jpg';
    }
    return `${AppConfig.apiUrl}/todos/image/${imageUrl}`;
  }

  onDelete(todoId: number, item: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this todo?',
        item: item,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription = this.todoService
          .deleteTodo(todoId)
          .pipe(
            catchError((error) => {
              if (error.error.message.includes('Demo')) {
                this.listRowComponent.openDemoDialog();
              }
              console.error('Error deleting todo', error);
              throw error;
            })
          )
          .subscribe({
            next: () => {
              this.fetchTodos();
            },
          });
      }
    });
  }

  onPhotoTodo(todoId: number) {
    console.log(todoId);
    this.router.navigate(['/todos/photo', todoId]);
  }

  onGalleryTodo(todoId: number) {
    this.router.navigate(['/todos/gallery', todoId]);
  }

  onAttributeTodo(todoId: number) {
    this.router.navigate(['/todos/set-attributes', todoId]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditTodo(todoId: number) {
    this.router.navigate([`/todos/${todoId}/edit`]);
  }

  generateStarsArray(difficulty: number): string[] {
    const maxStars = 5;
    let starsArray: string[] = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= difficulty) {
        starsArray.push('star');
      } else if (i - 0.5 <= difficulty) {
        starsArray.push('star_half');
      } else {
        starsArray.push('star_border');
      }
    }

    return starsArray;
  }

  openImageDialog(imageUrl: string, directory: string): void {
    this.imageDialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl, directory: directory },
    });
  }
}
