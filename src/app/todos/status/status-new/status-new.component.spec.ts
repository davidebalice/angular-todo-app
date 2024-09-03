import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNewComponent } from './status-new.component';

describe('StatusNewComponent', () => {
  let component: StatusNewComponent;
  let fixture: ComponentFixture<StatusNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
