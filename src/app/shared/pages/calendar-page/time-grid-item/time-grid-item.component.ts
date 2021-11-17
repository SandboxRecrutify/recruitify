import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-grid-item',
  templateUrl: './time-grid-item.component.html',
  styleUrls: ['./time-grid-item.component.scss'],
})
export class TimeGridItemComponent implements OnInit {
  @Input() time: any;

  constructor() {}

  ngOnInit(): void {}
}
