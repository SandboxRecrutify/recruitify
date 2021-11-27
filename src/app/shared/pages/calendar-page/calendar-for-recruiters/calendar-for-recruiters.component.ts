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
  isBtnSaveVisible: boolean = false;

  constructor(
    public calendarService: CalendarService,
    private calendarPageFacade: CalendarPageFacade
  ) {}

  ngOnInit(): void {
    this.calendarService.datepickerValue$.subscribe((response) => {
      this.datepickerValue = response;
    });

    this.calendarPageFacade.isSaveBtnVisible$.subscribe(
      (response) => (this.isBtnSaveVisible = response)
    );
  }

  onNextDayButtonClick() {
    this.calendarService.getNextDay();
    this.isBtnSaveVisible = false;
  }

  onPreviousDayButtonClick() {
    this.calendarService.getPreviuosDay();
    this.isBtnSaveVisible = false;
  }

  onCalendarDateChange(event: Date) {
    this.calendarService.setPickedDay(event);
    this.isBtnSaveVisible = false;
  }

  onBtnSaveClick() {
    this.calendarPageFacade.isEmailModalVisible$.next(true);
    this.isBtnSaveVisible = false;
  }
}
