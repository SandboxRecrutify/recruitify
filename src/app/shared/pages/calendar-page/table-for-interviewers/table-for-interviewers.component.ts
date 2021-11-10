import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-table-for-interviewers',
  templateUrl: './table-for-interviewers.component.html',
  styleUrls: ['./table-for-interviewers.component.scss'],
})
export class TableForInterviewersComponent implements OnInit {
  days = this.calendarPageFacade.days;
  time = this.calendarPageFacade.time;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private calendarPageFacade: CalendarPageFacade
  ) {}

  ngOnInit(): void {}
}
