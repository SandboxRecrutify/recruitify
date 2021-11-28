import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../models/UserRole';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  isInterviewer = this.userService.checkRole(UserRole.interviewer);
  isRecruiter = this.userService.checkRole(UserRole.recruiter);

  ngOnInit(): void {}
}
