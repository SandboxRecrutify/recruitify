import { CalendarPageFacade } from '../calendar-page.facade';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar-for-interviewers',
  templateUrl: './calendar-for-interviewers.component.html',
  styleUrls: ['./calendar-for-interviewers.component.scss'],
})
export class CalendarForInterviewersComponent implements OnInit {
  currentWeek = this.calendarPageFacade.getCurrentWeekDays();
  displayedWeekDays: Date[] = this.currentWeek;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}

  onNextBtnClick() {
    this.displayedWeekDays = this.calendarPageFacade.getNextWeekDays(
      this.displayedWeekDays
    );
  }

  onPreviousBtnClick() {
    this.displayedWeekDays = this.calendarPageFacade.getPreviousWeekDays(
      this.displayedWeekDays
    );
  }
}
