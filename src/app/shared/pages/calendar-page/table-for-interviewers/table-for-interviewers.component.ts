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
  displayedWeekDays: Date[] = this.currentWeekDays;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}

  onNextBtnClick() {
    this.displayedWeekDays = this.calendarPageFacade.getNextWeekDays(
      this.displayedWeekDays
    );
  }

  onPreviousBtn() {
    this.displayedWeekDays = this.calendarPageFacade.getPreviousWeekDays(
      this.displayedWeekDays
    );
  }
}
