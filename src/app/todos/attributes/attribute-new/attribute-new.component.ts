import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { AttributeService } from '../../../services/attribute.service';


@Component({
  selector: 'app-attribute-new',
  templateUrl: './attribute-new.component.html',
  styleUrl: './attribute-new.component.scss'
})
export class AttributeNewComponent {
  attributeForm: FormGroup;
  submitting = false;
  imageFile: File | null = null;
  private destroy$ = new Subject<void>();
  attributes$: Observable<any[]>;


  constructor(
    private route: ActivatedRoute,
    private attributeService: AttributeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.attributeForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit() {
    if (this.attributeForm.valid && !this.submitting) {
      this.submitting = true;

      this.attributeService
        .addAttribute(this.attributeForm.value)
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
            console.log('Attribute added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding product', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['./products/attributes']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}