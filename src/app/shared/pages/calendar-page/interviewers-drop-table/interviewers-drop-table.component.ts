import { BehaviorSubject } from 'rxjs';
import { InterviewerCalendar } from './../../../models/InterviewerCalendar';
import { DragNDropService } from './../../../services/drag-n-drop.service';
import { CalendarService } from './../../../services/calendar.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewers-drop-table',
  templateUrl: './interviewers-drop-table.component.html',
  styleUrls: ['./interviewers-drop-table.component.scss'],
})
export class InterviewersDropTableComponent implements OnInit, DoCheck {
  @Input() displayedInterviewers!: InterviewerCalendar[];

  dragedCandidateSkill: string = '';
  dragedCandidateTime: number[] = [];
  interviewersTimeTable!: any;

  isWeekDay!: boolean;
  isModalVisible!: boolean;

  clickedCandidate: any;

  constructor(
    private calendarService: CalendarService,
    private dragNDropService: DragNDropService
  ) {}

  ngDoCheck(): void {
    this.dragNDropService.dragedCandidateSkill$.subscribe((response) => {
      this.dragedCandidateSkill = response;
    });

    this.dragNDropService.dragedCandidateTime$.subscribe((response) => {
      this.dragedCandidateTime = response;
    });

    this.isWeekDay = !this.calendarService.checkDayIsWeekend();

    this.calendarService.isModalVisible$.subscribe(
      (response) => (this.isModalVisible = response)
    );

    this.calendarService.assignedCandidate$.subscribe(
      (response) => (this.clickedCandidate = response)
    );
  }

  ngOnInit(): void {
    this.calendarService.getInterviewersTimeTable().subscribe((responce) => {
      this.interviewersTimeTable = responce;
    });
  }

  setDragulaValue(
    interviewerSkill: string,
    dragedCandidateSkill: string,
    interviewerTime: number,
    dragedCandidateTime: number[],
    candidateArr: any
  ): string {
    const isTimeIncludes = dragedCandidateTime.includes(interviewerTime);
    const isEqualSkill =
      interviewerSkill === dragedCandidateSkill ||
      interviewerSkill === 'Recruiter';
    const isCandidateAssigned = candidateArr === 0;
    return isTimeIncludes && isEqualSkill && isCandidateAssigned
      ? 'calendar'
      : '';
  }

  checkIsAvaliableToDrop(
    interviewerSkill: string,
    dragedCandidateSkill: string,
    interviewerTime: number,
    dragedCandidateTime: number[]
  ) {
    const isTimeIncludes = dragedCandidateTime.includes(interviewerTime);
    const isEqualSkill =
      interviewerSkill === dragedCandidateSkill ||
      interviewerSkill === 'Recruiter';
    return isTimeIncludes && isEqualSkill;
  }

  onItemClick(candidate: any) {
    if (candidate) {
      this.calendarService.assignedCandidate$.next(candidate);
      this.calendarService.isModalVisible$.next(true);
    }
  }
}
