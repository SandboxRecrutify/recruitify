import { Component, OnInit } from '@angular/core';

export interface Card {
  title: string;
  status: string;
  start: string;
  finish: string;
  count: number
  manager:string
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
      count: 100,
      manager: 'John Smith'
    },
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA',
      status: 'Closed',
      start: ' 11.10.2021',
      finish: '11.12.2021',
      count: 100,
      manager: 'John Smith'
    },
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA ',
      status: 'Active',
      start: '11.10.2021',
      finish: ' 11.12.2021',
      count: 100,
      manager: 'John Smith'
    },
    {
      title: 'October 2021 Exadel Internship JS&.NET&BA ',
      status: 'Closed',
      start: '11.10.2021',
      finish: '11.12.2021',
      count: 100,
      manager: 'John Smith'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
