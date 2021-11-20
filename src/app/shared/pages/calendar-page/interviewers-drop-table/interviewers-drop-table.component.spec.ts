import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewersDropTableComponent } from './interviewers-drop-table.component';

describe('InterviewersDropTableComponent', () => {
  let component: InterviewersDropTableComponent;
  let fixture: ComponentFixture<InterviewersDropTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewersDropTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewersDropTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
