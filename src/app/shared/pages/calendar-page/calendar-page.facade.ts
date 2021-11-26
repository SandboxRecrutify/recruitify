import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CalendarPageFacade {
  isAssignedModalVisible$ = new BehaviorSubject(false);
  isEmailModalVisible$ = new BehaviorSubject(false);
  isSaveBtnVisible$ = new BehaviorSubject(false);
  assignedCandidate$ = new BehaviorSubject([]);
  isWorkingWeekends$ = new BehaviorSubject(false);
  clickedDay$ = new BehaviorSubject(new Date());

  timeLine = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
  ];

  today = new Date();
  nearestMonday = new Date(
    this.today.setDate(this.today.getDate() - this.today.getDay() + 1)
  );

  constructor() {}

  getCurrentWeekDays() {
    let daysArr = [this.nearestMonday];
    for (let i = 2; i <= 7; i++) {
      let nextDay = new Date(
        this.today.setDate(this.today.getDate() - this.today.getDay() + i)
      );
      daysArr.push(nextDay);
    }
    return daysArr;
  }

  getNextWeekDays(weekdaysArr: Date[]) {
    return weekdaysArr.map(
      (item) => new Date(item.getTime() + 24 * 7 * 60 * 60 * 1000)
    );
  }

  getPreviousWeekDays(weekdaysArr: Date[]) {
    return weekdaysArr.map(
      (item) => new Date(item.getTime() - 24 * 7 * 60 * 60 * 1000)
    );
  }
}
