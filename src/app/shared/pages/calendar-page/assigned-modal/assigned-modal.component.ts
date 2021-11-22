import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-modal',
  templateUrl: './assigned-modal.component.html',
  styleUrls: ['./assigned-modal.component.scss'],
})
export class AssignedModalComponent implements OnInit {
  isModalVisible!: boolean;
  clickedCandidate!: any;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    this.calendarPageFacade.isAssignedModalVisible$.subscribe(
      (response) => (this.isModalVisible = response)
    );

    this.calendarPageFacade.assignedCandidate$.subscribe(
      (response) => (this.clickedCandidate = response)
    );
  }

  handleDelete(): void {
    console.log('Delete assigned candidate');
    this.calendarPageFacade.isAssignedModalVisible$.next(false);
  }

  handleCancel(): void {
    this.calendarPageFacade.isAssignedModalVisible$.next(false);
  }
}
