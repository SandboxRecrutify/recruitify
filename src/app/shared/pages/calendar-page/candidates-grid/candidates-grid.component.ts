import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragEnter,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.scss'],
})
export class CandidatesGridComponent implements OnInit {
  constructor(private calendarPageFacade: CalendarPageFacade) {}

  candidates = this.calendarPageFacade.candidatesContactTime;

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.candidates, event.previousIndex, event.currentIndex);
  }

  entered(event: CdkDragEnter) {
    moveItemInArray(this.candidates, event.item.data, event.container.data);
  }
}
