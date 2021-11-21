import { UserService } from './../../services/user.service';
import { CalendarPageFacade } from './calendar-page.facade';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  isInterviewer = this.userService.isInterviewer();
  isRecruiter = this.userService.isRecruiter();

  ngOnInit(): void {}
}
