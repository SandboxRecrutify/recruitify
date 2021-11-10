import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-for-interviewers',
  templateUrl: './table-for-interviewers.component.html',
  styleUrls: ['./table-for-interviewers.component.scss'],
})
export class TableForInterviewersComponent implements OnInit {
  time = this.calendarPageFacade.time;
  weekDays = this.calendarPageFacade.getWeekDays();

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}
}
