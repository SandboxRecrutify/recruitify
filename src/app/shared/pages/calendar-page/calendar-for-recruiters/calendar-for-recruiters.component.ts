import { NzMessageService } from 'ng-zorro-antd/message';
import { EmailService } from './../email.service';
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
  candidatesToSendEmail: string[] = [];

  constructor(
    public calendarService: CalendarService,
    private calendarPageFacade: CalendarPageFacade,
    private emailService: EmailService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.emailService.candidatesToSendEmail$.subscribe((repsonse) => {
      repsonse.length > 0
        ? this.calendarPageFacade.isSaveBtnVisible$.next(true)
        : this.calendarPageFacade.isSaveBtnVisible$.next(false);
    });

    this.calendarPageFacade.datepickerValue$.subscribe((response) => {
      this.datepickerValue = response;
    });

    this.emailService.candidatesToSendEmail$.subscribe(
      (response) => (this.candidatesToSendEmail = response)
    );

    this.calendarPageFacade.isSaveBtnVisible$.subscribe(
      (response) => (this.isBtnSaveVisible = response)
    );
  }

  onNextDayButtonClick() {
    this.calendarPageFacade.getNextDay();
    this.isBtnSaveVisible = false;
  }

  onPreviousDayButtonClick() {
    this.calendarPageFacade.getPreviuosDay();
    this.isBtnSaveVisible = false;
  }

  onCalendarDateChange(event: Date) {
    this.calendarPageFacade.setPickedDay(event);
    this.isBtnSaveVisible = false;
  }

  onSaveConfirm() {
    this.isBtnSaveVisible = false;
    this.emailService.sendEmails();
    this.message.success('Email successfully sent');
  }
}
