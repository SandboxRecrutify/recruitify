import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableForInterviewersComponent } from './table-for-interviewers.component';

describe('TableForInterviewersComponent', () => {
  let component: TableForInterviewersComponent;
  let fixture: ComponentFixture<TableForInterviewersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableForInterviewersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableForInterviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
