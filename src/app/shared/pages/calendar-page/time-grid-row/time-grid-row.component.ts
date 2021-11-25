import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-grid-row',
  templateUrl: './time-grid-row.component.html',
  styleUrls: ['./time-grid-row.component.scss'],
})
export class TimeGridRowComponent implements OnInit {
  @Input() day!: Date;
  time = this.calendarPageFacade.timeLine;
  workingWeekends!: boolean;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    this.calendarPageFacade.isWorkingWeekends$.subscribe(
      (response) => (this.workingWeekends = response)
    );
  }
}
