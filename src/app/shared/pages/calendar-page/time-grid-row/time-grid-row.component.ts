import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-grid-row',
  templateUrl: './time-grid-row.component.html',
  styleUrls: ['./time-grid-row.component.scss'],
})
export class TimeGridRowComponent implements OnInit {
  @Input('day') day!: number;

  time = this.calendarPageFacade.time;

  setIsWeekDay() {
    return this.day !== 0 && this.day !== 6;
  }

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    // console.log(this.day === 0 || this.day === 6);
    // console.log(this.day === 0 || this.day === 6);
    // console.log(this.setIsWeekEnd());
  }
}
