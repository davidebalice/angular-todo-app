import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { AttributeService } from 'src/app/services/attribute.service';
import { ValueService } from '../../../services/value.service';

@Component({
  selector: 'app-value-new',
  templateUrl: './value-new.component.html',
  styleUrl: './value-new.component.scss',
})
export class ValueNewComponent {
  valueForm: FormGroup;
  submitting = false;
  imageFile: File | null = null;
  private destroy$ = new Subject<void>();
  attributes$: Observable<any[]>;
  selectedIdAttribute: number = null;

  constructor(
    private route: ActivatedRoute,
    private valueService: ValueService,
    private router: Router,
    private formBuilder: FormBuilder,
    private attributeService: AttributeService
  ) {}

  ngOnInit(): void {
    this.loadAttributes();
    this.loadDefaultAttribute();
    this.valueForm = this.formBuilder.group({
      value: ['', Validators.required],
      attribute: this.formBuilder.group({
        id: new FormControl(this.selectedIdAttribute, Validators.required),
      }),
    });
  }

  loadAttributes(): void {
    this.attributeService.fetchAttributes();
    this.attributes$ = this.attributeService.getAttributes();
  }

  loadDefaultAttribute(): void {
    if (!this.selectedIdAttribute) {
      this.attributes$.subscribe((attributes) => {
        if (attributes.length > 0) {
          this.selectedIdAttribute = attributes[0].id;
          console.log(this.selectedIdAttribute);
          this.loadSubattributes(this.selectedIdAttribute);
        }
      });
    } else {
      this.loadSubattributes(this.selectedIdAttribute);
    }
  }

  onAttributeChange(attributeId: number): void {
    this.selectedIdAttribute = attributeId;
    this.loadSubattributes(attributeId);
    this.valueForm.get('attribute.id').setValue(attributeId);
  }

  loadSubattributes(attributeId: number): void {
    this.selectedIdAttribute = attributeId;
  }

  onSubmit() {
    if (this.valueForm.valid && !this.submitting) {
      this.submitting = true;

      this.valueService
        .addValue(this.valueForm.value)
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
            console.log('Value added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding product', error);
          },
        });
    }
  }

  onCancel() {
    this.onBack();
  }

  onBack() {
    this.router.navigate(['./products/values/'], {
      queryParams: { idAttribute: this.selectedIdAttribute },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
