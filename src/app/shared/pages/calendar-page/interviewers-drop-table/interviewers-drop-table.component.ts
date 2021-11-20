import { DragNDropService } from './../../../services/drag-n-drop.service';
import { CalendarService } from './../../../services/calendar.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewers-drop-table',
  templateUrl: './interviewers-drop-table.component.html',
  styleUrls: ['./interviewers-drop-table.component.scss'],
})
export class InterviewersDropTableComponent implements OnInit, DoCheck {
  @Input() displayedInterviewers: any;

  dragedCandidateSkill: any = '';
  dragedCandidateTime: any = [];
  interviewersTimeTable: any;

  isWeekDay!: boolean;

  constructor(
    private calendarService: CalendarService,
    private dragNDropService: DragNDropService
  ) {}

  ngDoCheck(): void {
    this.dragNDropService.skill.subscribe((response) => {
      this.dragedCandidateSkill = response;
    });

    this.dragNDropService.time.subscribe((response) => {
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
    interviewerTime: number,
    dragedCandidateTime: number[]
  ): string {
    const isTimeIncludes = dragedCandidateTime.includes(interviewerTime);
    const isEqualSkill =
      interviewerSkill === dragedCandidateSkill ||
      interviewerSkill === 'Recruiter';
    return isTimeIncludes && isEqualSkill ? 'calendar' : '';
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
}
