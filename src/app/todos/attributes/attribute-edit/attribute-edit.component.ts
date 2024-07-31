import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { Attribute } from '../../../model/attribute.model';
import { AttributeService } from '../../../services/attribute.service';

@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrl: './attribute-edit.component.scss',
})
export class AttributeEditComponent implements OnInit, OnDestroy {
  id: number | undefined;
  attributeForm: FormGroup;
  attribute: Attribute;
  attribute$: Observable<Attribute> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  attributes$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private attributeService: AttributeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.attribute$ = this.attributeService.getById(this.id);

        this.attributeService
          .getById(this.id)
          .pipe(
            map((attribute) => {
              this.attribute = attribute;
              this.initForm(this.attribute);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.attributeForm.valid && !this.submitting) {
      this.submitting = true;
      this.attributeService
        .updateAttribute(this.id, this.attributeForm.value)
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
            console.log('Attribute updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating attribute', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['./products/attributes']);
  }

  private initForm(attribute: Attribute) {
    let attributeName = attribute.name;
    let attributeDescription = attribute.description;

    this.attributeForm = new FormGroup({
      name: new FormControl(attributeName, Validators.required),
      description: new FormControl(attributeDescription),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['./products/attributes']);
  }
}
