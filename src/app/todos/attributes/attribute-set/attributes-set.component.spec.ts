import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesSetComponent } from './attributes-set.component';

describe('AttributesSetComponent', () => {
  let component: AttributesSetComponent;
  let fixture: ComponentFixture<AttributesSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributesSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributesSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
