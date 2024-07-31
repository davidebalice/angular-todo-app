import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueNewComponent } from './value-new.component';

describe('ValueNewComponent', () => {
  let component: ValueNewComponent;
  let fixture: ComponentFixture<ValueNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValueNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
