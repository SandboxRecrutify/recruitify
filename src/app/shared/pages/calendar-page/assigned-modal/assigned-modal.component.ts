import { CalendarService } from './../../../services/calendar.service';
import { Component, Input, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-assigned-modal',
  templateUrl: './assigned-modal.component.html',
  styleUrls: ['./assigned-modal.component.scss'],
})
export class AssignedModalComponent implements OnInit, DoCheck {
  isModalVisible!: boolean;
  clickedCandidate!: any;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.calendarService.isModalVisible$.subscribe(
      (response) => (this.isModalVisible = response)
    );

    this.calendarService.assignedCandidate$.subscribe(
      (response) => (this.clickedCandidate = response)
    );
  }

  handleOk(): void {
    this.calendarService.isModalVisible$.next(false);
  }

  handleCancel(): void {
    this.calendarService.isModalVisible$.next(false);
  }
}
