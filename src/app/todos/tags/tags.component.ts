import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { Tag } from '../../model/tag.model';
import { Todo } from '../../model/todo.model';
import { TagService } from '../../services/tag.service';
import { TodosModule } from '../todos.module';

@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  imports: [TodosModule],
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: Tag[] = [];
  selectedTag: Tag | undefined;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  subscription: Subscription | undefined;
  isLoading = true;

  constructor(
    private tagService: TagService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tagService.fetchTags();
    this.subscription = this.tagService
      .getTags()
      .subscribe((tags) => {
        this.tags = tags;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectTag(tag: Tag): void {
    this.selectedTag = tag;

    if (tag) {
      this.router.navigate([`/todos/idcat/${tag.id}`]);
    }
  }

  onNewTag() {
    this.router.navigate(['/todos/tags/new']);
  }

  onEditTag(tagId: number) {
    this.router.navigate([`/todos/tags/${tagId}/edit`]);
  }

  onBack() {
    this.router.navigate([`/todos/`]);
  }
  
  onDelete(tagId: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this tag?`,
        item: title,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.tagService.deleteTag(tagId).subscribe({
            next: () => {
              this.tagService.fetchTags();
            },
            error: (error) => {
              this.tagService.fetchTags();
              console.error('Error handling deletion response', error);
            },
          });
        }
      },
      error: (err) => {
        console.error('Error closing dialog', err);
      },
    });
  }
}
