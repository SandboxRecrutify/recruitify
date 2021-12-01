import { CalendarPageFacade } from './calendar-page.facade';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  candidatesToSendEmail$: BehaviorSubject<[]> = new BehaviorSubject([]);

  constructor() {}

  sendEmails() {}
}
