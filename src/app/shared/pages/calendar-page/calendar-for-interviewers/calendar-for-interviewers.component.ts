import { EmailService } from './../email.service';
import { LocalStorageService } from './../../../../services/local-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CalendarPageFacade } from '../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-for-interviewers',
  templateUrl: './calendar-for-interviewers.component.html',
  styleUrls: ['./calendar-for-interviewers.component.scss'],
})
export class CalendarForInterviewersComponent implements OnInit {
  public readonly USER_KEY = 'user';
  interviewersName = this.lsService.getItem(this.USER_KEY).name;

  today = new Date();
  isBtnSaveVisible: boolean = false;
  isWorkingWeekends!: boolean;
  countOfDisplayedDays!: number;
  displayedWeekDays!: Date[];

  constructor(
    private calendarPageFacade: CalendarPageFacade,
    private popMessage: NzMessageService,
    private lsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.calendarPageFacade.isSaveBtnVisible$.subscribe(
      (response) => (this.isBtnSaveVisible = response)
    );

    this.calendarPageFacade.isWorkingWeekends$.subscribe((response) => {
      this.isWorkingWeekends = response;

      const countOfDays = response ? 7 : 5;

      this.displayedWeekDays =
        this.calendarPageFacade.getCurrentWeekDays(countOfDays);
    });
  }

  onNextBtnClick(): void {
    this.displayedWeekDays = this.calendarPageFacade.getNextWeekDays(
      this.displayedWeekDays
    );
    this.calendarPageFacade.isSaveBtnVisible$.next(false);
  }

  onPreviousBtnClick(): void {
    this.displayedWeekDays = this.calendarPageFacade.getPreviousWeekDays(
      this.displayedWeekDays
    );
    this.calendarPageFacade.isSaveBtnVisible$.next(false);
  }

  onSaveBtnClick(): void {
    this.popMessage.success('Changes saved');
    this.calendarPageFacade.isSaveBtnVisible$.next(false);
  }

  printWeekends() {
    this.calendarPageFacade.isWorkingWeekends$.next(this.isWorkingWeekends);
  }
}
