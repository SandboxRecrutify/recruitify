import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-grid-row',
  templateUrl: './time-grid-row.component.html',
  styleUrls: ['./time-grid-row.component.scss'],
})
export class TimeGridRowComponent implements OnInit {
  time = this.calendarPageFacade.time;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {}
}
