import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRowComponent } from './list-row.component';

describe('ListRowComponent', () => {
  let component: ListRowComponent;
  let fixture: ComponentFixture<ListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
