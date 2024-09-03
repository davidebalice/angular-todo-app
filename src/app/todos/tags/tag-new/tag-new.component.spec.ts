import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagNewComponent } from './tag-new.component';

describe('TagNewComponent', () => {
  let component: TagNewComponent;
  let fixture: ComponentFixture<TagNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
