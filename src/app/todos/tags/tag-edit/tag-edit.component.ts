import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { Tag } from '../../../model/tag.model';
import { TagService } from '../../../services/tag.service';
import { iconsData } from '../../../shared/iconsData';
import { TodosModule } from '../../todos.module';

@Component({
  selector: 'app-tag-edit',
  standalone: true,
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.scss',
  imports: [TodosModule],
})
export class TagEditComponent implements OnInit, OnDestroy {
  id: number = 0;
  tagForm: FormGroup | undefined;
  tag: Tag | undefined;
  tag$: Observable<Tag> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  tags$: Observable<any[]> | undefined;
  icons: string[] = iconsData;


  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.tag$ = this.tagService.getById(this.id);

        this.tagService
          .getById(this.id)
          .pipe(
            map((tag) => {
              this.tag = tag;
              this.initForm(this.tag);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.tagForm && this.tagForm.valid && !this.submitting) {
      this.submitting = true;
      this.tagService
        .updateTag(this.id, this.tagForm.value)
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
            console.log('Tag updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating tag', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['./todos/tags']);
  }

  private initForm(tag: Tag) {
    this.tagForm = new FormGroup({
      name: new FormControl(tag.name, Validators.required),
      color: new FormControl(tag.color, Validators.required),
      icon: new FormControl(tag.icon, Validators.required),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['./todos/tags']);
  }
}
