import { CalendarPageFacade } from './../calendar-page.facade';
import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-for-recruiters',
  templateUrl: './calendar-for-recruiters.component.html',
  styleUrls: ['./calendar-for-recruiters.component.scss'],
})
export class CalendarForRecruitersComponent implements OnInit {
  datepickerValue!: Date;

  constructor(
    public calendarService: CalendarService,
    private calendarPageFacade: CalendarPageFacade
  ) {}

  ngOnInit(): void {
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

  onBtnSaveClick() {
    this.calendarPageFacade.isEmailModalVisible$.next(true);
  }
}
