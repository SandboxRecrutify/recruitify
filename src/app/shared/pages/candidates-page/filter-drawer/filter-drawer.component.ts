import { CandidateLocation } from './../../../models/CandidateLocation';
import { Observable, of, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Status } from 'src/app/shared/models/CandidatesStatus';
import { EnglishLevel } from 'src/app/shared/models/EnglishLevel';
import { PrimarySkill } from 'src/app/shared/models/Project';
import { UserRole } from 'src/app/shared/models/UserRole';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CandidatesPageFacade } from '../candidates-page.facade';
import { Candidate } from './../../../models/Candidate';
import { UserService } from './../../../services/user.service';

export interface CandidatesTableFilters {
location?: string []
date?: (string | Date)[]
englishLevel?: string[]
primarySkill?: PrimarySkill[]
status?: string[]
test?: number[]
recruiter?: number[]
entryInterview?: number[]
mentor?: number[]
finalInterview?: number[]

}
@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss'],
})
export class FilterDrawerComponent implements OnInit, OnDestroy  {
  @Input() drawerVisible: any;
  @Input() candidatesList!: Candidate[];
  @Input() currentProjectId!: string;

  @Output() onCandidatesFilters: EventEmitter<CandidatesTableFilters> =
    new EventEmitter<CandidatesTableFilters>();

  subscription!: Subscription;

  isAdmin = this.userService.isAdmin();


  // englishLevel = Object.entries(EnglishLevel);
  englishLevel = [
    'Beginner',
    'PreIntermediate',
    'Intermediate',
    'Advanced',
    'Native',
  ];
  // status = Object.entries(Status)
  status = [
    'New',
    'Test',
    'RecruiterInterview',
    'TechInterviewOneStep',
    'TechInterviewSecondStep',
    'Accepted',
    'Declined',
    'WaitingList',
  ];
  rate = [1, 2, 3, 4];
  test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  primarySkills: PrimarySkill[] | undefined;
  locations: string[] | undefined


  locationsSelect: string[] = []
  filterDates: string[] = []
  englishLevelSelect: string[] = [];
  primarySkillsSelect: PrimarySkill[] = [];
  statusSelect: string[] = [];
  testResultSelect: number[] = [];
  recruiterRateSelect: number[] = [];
  entryInterviewRateSelect: number[] = [];
  mentorRateSelect: number[] = [];
  finalInterviewRateSelect: number[] = [];



  constructor(
    private userService: UserService,
    private projectsService: ProjectsService,
    private candidatesPageFacade: CandidatesPageFacade
  ) {}

  ngOnInit(): void {
    this.projectsService.getPrimarySkills().subscribe((response) => {
      this.primarySkills = response;
    });
    //to fix by new endpoint
    this.subscription = this.candidatesPageFacade.candidatesList$.subscribe(response => {
      this.candidatesList = response
      // if(!this.locations || this.locations.length === 0) {
        this.locations = [...new Set(this.candidatesList.map(el => `${el.location.country}, ${el.location.city}`))]
      // }
    })
  }

  closeDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }

  onDateChange(period: Date[]) {
    return this.filterDates = period.map(el => el.toISOString())
  }

  onSubmit() {

    const CandidatesTableFilters: CandidatesTableFilters  = {
      location: this.locationsSelect,
      date: this.filterDates,
      englishLevel: this.englishLevelSelect,
      primarySkill: this.primarySkillsSelect,
      status: this.statusSelect,
      test: this.testResultSelect,
      recruiter: this.recruiterRateSelect,
      entryInterview: this.entryInterviewRateSelect,
      mentor: this.mentorRateSelect,
      finalInterview: this.finalInterviewRateSelect
  }
    this.onCandidatesFilters.emit(CandidatesTableFilters);
    this.closeDrawer()
  }

  clearFilters() {
    this.locationsSelect = [],
    this.filterDates = [],
    this.englishLevelSelect = [],
    this.primarySkillsSelect = [],
    this.statusSelect = [],
    this.testResultSelect = [],
    this.recruiterRateSelect = [],
    this.entryInterviewRateSelect = [],
    this.mentorRateSelect = [],
    this.finalInterviewRateSelect = []
  }


  ngOnDestroy() {
   this.subscription.unsubscribe();
   }
}
