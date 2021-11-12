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
  displayedWeekDays: Date[] = this.currentWeekDays;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}

  onNextButtonClick() {
    if (this.displayedWeekDays === this.currentWeekDays) {
      this.displayedWeekDays = this.nextWeekDays;
    } else if (this.displayedWeekDays === this.previousWeekDays) {
      this.displayedWeekDays = this.currentWeekDays;
    }
    console.log(this.previousWeekDays);
  }

  onPreviousButtonClick() {
    if (this.displayedWeekDays === this.currentWeekDays) {
      this.displayedWeekDays = this.previousWeekDays;
    } else if (this.displayedWeekDays === this.nextWeekDays) {
      this.displayedWeekDays = this.currentWeekDays;
    }
  }
}
