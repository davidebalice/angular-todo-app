import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryNewComponent } from './subcategory-new.component';

describe('SubcategoryNewComponent', () => {
  let component: SubcategoryNewComponent;
  let fixture: ComponentFixture<SubcategoryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
