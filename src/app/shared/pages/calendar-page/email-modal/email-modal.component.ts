import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss'],
})
export class EmailModalComponent implements OnInit {
  isModalVisible!: boolean;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    this.calendarPageFacade.isEmailModalVisible$.subscribe(
      (response) => (this.isModalVisible = response)
    );
  }

  handleOk(): void {
    console.log('Send e-mail to candidates');
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
