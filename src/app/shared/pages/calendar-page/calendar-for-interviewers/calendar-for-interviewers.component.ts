import { NzMessageService } from 'ng-zorro-antd/message';
import { CalendarPageFacade } from '../calendar-page.facade';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar-for-interviewers',
  templateUrl: './calendar-for-interviewers.component.html',
  styleUrls: ['./calendar-for-interviewers.component.scss'],
})
export class CalendarForInterviewersComponent implements OnInit {
  today = new Date();
  displayedWeekDays: Date[] = this.calendarPageFacade.getCurrentWeekDays();
  isBtnSaveVisible: boolean = false;
  switchWeekends = false;

  constructor(
    private calendarPageFacade: CalendarPageFacade,
    private popMessage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.calendarPageFacade.isSaveBtnVisible$.subscribe(
      (response) => (this.isBtnSaveVisible = response)
    );
  }

  onNextBtnClick(): void {
    this.displayedWeekDays = this.calendarPageFacade.getNextWeekDays(
      this.displayedWeekDays
    );
    this.isBtnSaveVisible = false;
  }

  onPreviousBtnClick(): void {
    this.displayedWeekDays = this.calendarPageFacade.getPreviousWeekDays(
      this.displayedWeekDays
    );
    this.isBtnSaveVisible = false;
  }

  onSaveBtnClick(): void {
    this.popMessage.success('Changes saved');
    this.isBtnSaveVisible = false;
  }

  printWeekends() {
    this.calendarPageFacade.isWorkingWeekends$.next(this.switchWeekends);
  }
}
