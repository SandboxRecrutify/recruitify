import { UserService } from './../../../services/user.service';
import { Candidate } from './../../../models/Candidate';
import { Component, Input, OnInit } from '@angular/core';
import { UserRole } from 'src/app/shared/models/UserRole';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss'],
})
export class FilterDrawerComponent implements OnInit {
  @Input() drawerVisible: any;
  @Input() candidatesList!: Candidate[];

  isAdmin = this.userService.checkRole(UserRole.admin);

  listOfOption = [
    { label: '123', value: '123' },
    { label: '123', value: '123' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  closeDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }
}
