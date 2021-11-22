import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  datepickerValue$ = new BehaviorSubject(new Date());

  constructor(private http: HttpClient) {}

  getInterviewersTimeTable() {
    return this.http.get('/assets/interviewer-calendar.json');
  }

  getCandidatesTimeTable() {
    return this.http.get('/assets/candidates-contact-time.json');
  }

  setPickedDay(newValue: Date) {
    this.datepickerValue$.next(newValue);
  }

  getNextDay() {
    let nextDay = new Date(
      this.datepickerValue$.value.getTime() + 24 * 60 * 60 * 1000
    );
    this.datepickerValue$.next(nextDay);
  }

  getPreviuosDay() {
    let nextDay = new Date(
      this.datepickerValue$.value.getTime() - 24 * 60 * 60 * 1000
    );
    this.datepickerValue$.next(nextDay);
  }

  checkDayIsWeekend() {
    const dayNumber = this.datepickerValue$.value.getDay();
    return dayNumber === 6 || dayNumber === 0;
  }
}
