import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-for-interviewers',
  templateUrl: './table-for-interviewers.component.html',
  styleUrls: ['./table-for-interviewers.component.scss'],
})
export class TableForInterviewersComponent implements OnInit {
  time = this.calendarPageFacade.time;
  currentWeekDays = this.calendarPageFacade.getWeekDays();
  previousWeekDays = this.calendarPageFacade.getPreviousWeekDays();
  nextWeekDays = this.calendarPageFacade.getNextWeekDays();
  displayedWeekDays = [];

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}
}
