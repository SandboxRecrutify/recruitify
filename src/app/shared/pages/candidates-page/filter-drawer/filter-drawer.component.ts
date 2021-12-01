import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/models/CandidatesStatus';
import { EnglishLevel } from 'src/app/shared/models/EnglishLevel';
import { PrimarySkill } from 'src/app/shared/models/Project';
import { UserRole } from 'src/app/shared/models/UserRole';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CandidatesPageFacade } from '../candidates-page.facade';
import { Candidate } from './../../../models/Candidate';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss'],
})
export class FilterDrawerComponent implements OnInit {
  @Input() drawerVisible: any;
  @Input() candidatesList!: Candidate[];

  isAdmin = this.userService.checkGlobalRole(UserRole.admin);

  englishLevel = Object.entries(EnglishLevel);
  status = Object.entries(Status);
  rate = [1, 2, 3, 4];
  test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  primarySkills: PrimarySkill[] | undefined;
  locations: string[] | undefined;
  registrationDates: (string | Date)[] | undefined;

  listOfOption = [
    { label: '123', value: '123' },
    { label: '123', value: '123' },
  ];

  constructor(
    private userService: UserService,
    private projectsService: ProjectsService,
    private candidatesPageFacade: CandidatesPageFacade
  ) {}

  ngOnInit(): void {
    this.projectsService.getPrimarySkills().subscribe((response) => {
      this.primarySkills = response;
    });
    this.candidatesPageFacade.candidatesList$.subscribe((response) => {
      this.candidatesList = response;
      this.locations = [
        ...new Set(
          this.candidatesList.map(
            (el) => `${el.location.country}, ${el.location.city}`
          )
        ),
      ];
      this.registrationDates = [
        ...new Set(this.candidatesList.map((el) => el.registrationDate)),
      ];
    });
  }

  closeDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }
}
