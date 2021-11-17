import { DragNDropService } from './../../../services/drag-n-drop.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-for-staff',
  templateUrl: './table-for-staff.component.html',
  styleUrls: ['./table-for-staff.component.scss'],
})
export class TableForStaffComponent implements OnInit {
  interviewersTimeTable: any = [];
  today = new Date().toLocaleDateString();
  subs = new Subscription();

  constructor(
    private dragulaService: DragulaService,
    private http: HttpClient,
    private dragNDropService: DragNDropService
  ) {}

  ngOnInit(): void {
    this.http
      .get('/assets/interviewer-calendar.json')
      .subscribe((response) => (this.interviewersTimeTable = response));
  }
}
