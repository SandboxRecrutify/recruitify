import { CalendarPageFacade } from './calendar-page.facade';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {
  itemStatuses = this.calendarPageFacade.itemStatuses;
  days = this.calendarPageFacade.days;
  time = this.calendarPageFacade.time;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private calendarPageFacade: CalendarPageFacade
  ) {}

  setItemBusy(event: any) {
    this.render.addClass(event.target, 'time-grid_item--busy');
  }

  setItemFree(event: any) {
    event.preventDefault();
    this.render.removeClass(event.target, 'time-grid_item--busy');
  }

  ngOnInit(): void {}
}
