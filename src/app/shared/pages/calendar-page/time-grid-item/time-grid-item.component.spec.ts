import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGridItemComponent } from './time-grid-item.component';

describe('TimeGridItemComponent', () => {
  let component: TimeGridItemComponent;
  let fixture: ComponentFixture<TimeGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
