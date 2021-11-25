import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-grid-item',
  templateUrl: './time-grid-item.component.html',
  styleUrls: ['./time-grid-item.component.scss'],
})
export class TimeGridItemComponent implements OnInit {
  today = new Date();
  @Input() day!: Date;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}

  getItemDay() {
    this.calendarPageFacade.clickedDay$.next(this.day);
  }
}
