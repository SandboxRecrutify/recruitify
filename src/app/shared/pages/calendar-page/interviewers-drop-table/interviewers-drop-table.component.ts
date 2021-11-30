import { CalendarPageFacade } from './../calendar-page.facade';
import { InterviewerCalendar } from './../../../models/InterviewerCalendar';
import { DragNDropService } from './../../../services/drag-n-drop.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewers-drop-table',
  templateUrl: './interviewers-drop-table.component.html',
  styleUrls: ['./interviewers-drop-table.component.scss'],
})
export class InterviewersDropTableComponent implements OnInit, DoCheck {
  isWeekDay!: boolean;

  displayedInterviewers!: InterviewerCalendar[];

  constructor(
    private dragNDropService: DragNDropService,
    private calendarPageFacade: CalendarPageFacade
  ) {}

  ngOnInit(): void {
    this.calendarPageFacade.displayedInterviewers$.subscribe((resp: any) => {
      this.displayedInterviewers = resp;
    });
  }

  ngDoCheck(): void {
    this.isWeekDay = !this.calendarPageFacade.checkDayIsWeekend();
  }
}
