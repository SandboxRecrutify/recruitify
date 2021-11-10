import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGridRowComponent } from './time-grid-row.component';

describe('TimeGridRowComponent', () => {
  let component: TimeGridRowComponent;
  let fixture: ComponentFixture<TimeGridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeGridRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
