import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-calendar-for-recruiters',
  templateUrl: './calendar-for-recruiters.component.html',
  styleUrls: ['./calendar-for-recruiters.component.scss'],
})
export class CalendarForRecruitersComponent implements OnInit, DoCheck {
  datepickerValue!: Date;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.calendarService.datepickerValue$.subscribe((response) => {
      this.datepickerValue = response;
    });
  }

  onNextDayButtonClick() {
    this.calendarService.getNextDay();
  }

  onPreviousDayButtonClick() {
    this.calendarService.getPreviuosDay();
  }

  onCalendarDateChange(event: Date) {
    this.calendarService.setPickedDay(event);
  }
}
