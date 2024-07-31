import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarHeaderComponent } from './topbar-header.component';

describe('TopbarHeaderComponent', () => {
  let component: TopbarHeaderComponent;
  let fixture: ComponentFixture<TopbarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopbarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
