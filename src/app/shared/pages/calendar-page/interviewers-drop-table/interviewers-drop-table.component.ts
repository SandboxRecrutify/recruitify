import { CalendarPageFacade } from './../calendar-page.facade';
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

  clickedCandidate: any;

  constructor(
    private calendarService: CalendarService,
    private dragNDropService: DragNDropService,
    private calendarPageFacade: CalendarPageFacade
  ) {}

  ngDoCheck(): void {
    this.dragNDropService.dragedCandidateSkill$.subscribe((response) => {
      this.dragedCandidateSkill = response;
    });

    this.dragNDropService.dragedCandidateTime$.subscribe((response) => {
      this.dragedCandidateTime = response;
    });

    this.isWeekDay = !this.calendarService.checkDayIsWeekend();
  }

  ngOnInit(): void {
    this.calendarService.getInterviewersTimeTable().subscribe((responce) => {
      this.interviewersTimeTable = responce;
    });
  }

  setDragulaValue(
    interviewerSkill: string,
    dragedCandidateSkill: string,

    candidateArr: any
  ): string {
    const isEqualSkill =
      interviewerSkill === dragedCandidateSkill ||
      interviewerSkill === 'Recruiter';
    const isCandidateAssigned = candidateArr === 0;
    return isEqualSkill && isCandidateAssigned ? 'calendar' : '';
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
      this.calendarPageFacade.assignedCandidate$.next(candidate);
      this.calendarPageFacade.isAssignedModalVisible$.next(true);
    }
  }
}
