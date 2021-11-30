import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.scss'],
})
export class CandidatesGridComponent implements OnInit {
  displayedCandidates: any = [];

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    this.calendarPageFacade.displayedCandidates$.subscribe((response) => {
      this.displayedCandidates = response;
    });
  }
}
