import { Component, OnInit } from '@angular/core';
export interface Staff {
  firstName: string
  lastName: string
}
export interface Card {
  title: string;
  status: string;
  start: string;
  finish: string;
  count: {registered: number, required: number}
  staff: Staff[]
}

@Component({
  selector: 'app-sandboxes-list',
  templateUrl: './sandboxes-list.component.html',
  styleUrls: ['./sandboxes-list.component.scss']
})
export class SandboxesListComponent implements OnInit {
  cards: Card[] = [
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA',
      status: 'Active',
      start: '11.10.2021',
      finish: '11.12.2021',
      count: {registered: 130, required: 400},
      staff: [{firstName: 'SCs', lastName: 'sdgsd'}]
    },
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA',
      status: 'Closed',
      start: ' 11.10.2021',
      finish: '11.12.2021',
      count: {registered: 200, required: 350},
      staff: [{firstName: 'SCs', lastName: 'sdgsd'}]
    },
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA ',
      status: 'Active',
      start: '11.10.2021',
      finish: ' 11.12.2021',
      count: {registered: 200, required: 200},
      staff: [{firstName: 'SCs', lastName: 'sdgsd'}]
    },
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA ',
      status: 'Closed',
      start: '11.10.2021',
      finish: '11.12.2021',
      count: {registered: 100, required: 125},
      staff: [{firstName: 'SCs', lastName: 'sdgsd'}]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
