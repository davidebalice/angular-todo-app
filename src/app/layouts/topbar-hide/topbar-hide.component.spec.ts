import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarHideComponent } from './topbar-hide.component';

describe('TopbarHideComponent', () => {
  let component: TopbarHideComponent;
  let fixture: ComponentFixture<TopbarHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarHideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopbarHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
