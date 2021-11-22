import { CalendarService } from './../../../services/calendar.service';
import { DragNDropService } from './../../../services/drag-n-drop.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.scss'],
})
export class CandidatesGridComponent implements OnInit {
  @Input() displayedCandidates!: any;

  candidatesTimeTable: any = [];

  constructor(
    private http: HttpClient,
    private calendarService: CalendarService,
    private dragNDropService: DragNDropService
  ) {}

  ngOnInit(): void {
    this.calendarService.getCandidatesTimeTable().subscribe((responce) => {
      this.candidatesTimeTable = responce;
    });
  }
}
