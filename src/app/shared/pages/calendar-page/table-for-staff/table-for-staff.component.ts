import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-for-staff',
  templateUrl: './table-for-staff.component.html',
  styleUrls: ['./table-for-staff.component.scss'],
})
export class TableForStaffComponent implements OnInit {
  today = new Date().toLocaleDateString();
  today1 = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

  constructor() {}

  ngOnInit(): void {}
}
