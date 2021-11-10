import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableForStaffComponent } from './table-for-staff.component';

describe('TableForStaffComponent', () => {
  let component: TableForStaffComponent;
  let fixture: ComponentFixture<TableForStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableForStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableForStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
