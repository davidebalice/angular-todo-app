import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';
import { AttributeService } from 'src/app/services/attribute.service';
import { Value } from '../../../model/value.model';
import { ValueService } from '../../../services/value.service';

@Component({
  selector: 'app-value-edit',
  templateUrl: './value-edit.component.html',
  styleUrl: './value-edit.component.scss',
})
export class ValueEditComponent implements OnInit, OnDestroy {
  id: number | undefined;
  attributes$: Observable<any[]>;
  valueForm: FormGroup;
  value: Value;
  value$: Observable<Value> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  subcategories$: Observable<any[]>;
  selectedIdAttribute: number = null;

  constructor(
    private route: ActivatedRoute,
    private attributeService: AttributeService,
    private valueService: ValueService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  loadAttributes(): void {
    this.attributeService.fetchAttributes();
    this.attributes$ = this.attributeService.getAttributes();
  }

  ngOnInit(): void {
    this.loadAttributes();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.value$ = this.valueService.getById(this.id);

        this.valueService
          .getById(this.id)
          .pipe(
            map((value) => {
              this.value = value;
              this.selectedIdAttribute = this.value.idAttribute;
              this.initForm(this.value);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    });
  }

  onAttributeChange(attributeId: number): void {
    this.selectedIdAttribute = attributeId;
    this.valueForm.get('attribute.id').setValue(attributeId);
  }

  onSubmit() {
    if (this.valueForm.valid && !this.submitting) {
      this.submitting = true;

      this.valueService
        .updateValue(this.id, this.valueForm.value)
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
            console.log('Value updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating value', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['./products/values']);
  }

  private initForm(value: Value) {
    this.selectedIdAttribute = value.idAttribute;

    this.valueForm = this.formBuilder.group({
      value: [value.value, Validators.required],
      idAttribute: [value.idAttribute, Validators.required],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['./products/values']);
  }
}
