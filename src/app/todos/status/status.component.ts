import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { Status } from '../../model/status.model';
import { Todo } from '../../model/todo.model';
import { StatusService } from '../../services/status.service';
import { TodosModule } from '../todos.module';

@Component({
  selector: 'app-status',
  standalone: true,
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  imports: [TodosModule],
})
export class StatusComponent implements OnInit, OnDestroy {
  status: Status[] = [];
  selectedStatus: Status | undefined;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  subscription: Subscription | undefined;
  isLoading = true;

  constructor(
    private statusService: StatusService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.statusService.fetchStatus();
    this.subscription = this.statusService
      .getStatus()
      .subscribe((status) => {
        this.status = status;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectStatus(status: Status): void {
    this.selectedStatus = status;

    if (status) {
      this.router.navigate([`/todos/idcat/${status.id}`]);
    }
  }

  onNewStatus() {
    this.router.navigate(['/todos/status/new']);
  }

  onEditStatus(statusId: number) {
    this.router.navigate([`/todos/status/${statusId}/edit`]);
  }

  onBack() {
    this.router.navigate([`/todos/`]);
  }
  
  onDelete(statusId: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this status?`,
        item: title,
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.statusService.deleteStatus(statusId).subscribe({
            next: () => {
              this.statusService.fetchStatus();
            },
            error: (error) => {
              this.statusService.fetchStatus();
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
