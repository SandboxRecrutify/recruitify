import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-time-grid-item',
  templateUrl: './time-grid-item.component.html',
  styleUrls: ['./time-grid-item.component.scss'],
})
export class TimeGridItemComponent implements OnInit {
  @Input() day!: Date;
  @Input() time!: string;

  today = new Date();
  yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  isFuture!: boolean;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    const currDate = dayjs();
    const currHour = currDate.hour();
    const currMin = currDate.minute();
    const currTimeArr = [currHour, currMin];

    const itemTimeArr = this.time.split(':');
    const itemHour = +itemTimeArr[0];
    const itemMin = +itemTimeArr[1];

    const itemDate = dayjs(this.day);
    this.isFuture = itemDate.isSame(dayjs(), 'day') && currHour > itemHour;
    console.log(this.isFuture);

    // console.log(this.time[0].split(':').map((item) => +item));
    // console.log(this.time.split(':').map((item) => +item));
    // const date = dayjs();
    // const currHour = date.hour().toString().padStart(2, '0');
    // const currMin = date.minute().toString().padStart(2, '0');
    // const currTime = `${currHour}:${currMin}`;
    // console.log(currTime);
  }

  getItemDay() {
    this.calendarPageFacade.clickedDay$.next(this.day);
  }
}
