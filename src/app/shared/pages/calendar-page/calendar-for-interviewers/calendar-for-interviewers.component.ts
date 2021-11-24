import { CalendarPageFacade } from '../calendar-page.facade';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar-for-interviewers',
  templateUrl: './calendar-for-interviewers.component.html',
  styleUrls: ['./calendar-for-interviewers.component.scss'],
})
export class CalendarForInterviewersComponent implements OnInit {
  displayedWeekDays: Date[] = this.calendarPageFacade.getCurrentWeekDays();

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}

  onNextBtnClick(): void {
    this.displayedWeekDays = this.calendarPageFacade.getNextWeekDays(
      this.displayedWeekDays
    );
  }

  onPreviousBtnClick(): void {
    this.displayedWeekDays = this.calendarPageFacade.getPreviousWeekDays(
      this.displayedWeekDays
    );
  }
}
