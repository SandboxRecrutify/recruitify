import { filter } from 'rxjs/operators';
import { CandidatesFilters } from './candidates-table/candidates-table.component';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Project } from '../../models/Project';
import { UserRole } from '../../models/UserRole';
import { QueryParams } from '../../services/api.service';
import { ProjectsService } from '../../services/projects.service';
import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { UserService } from './../../services/user.service';
import { candidatesQueries } from './candidates-page.component';

@Injectable()
export class CandidatesPageFacade {
  projectLanguages = ['English', 'Russian'];

  englishLvls = [
    'Begginer',
    'Pre-Intermediate',
    'Intermediate',
    'Advanced',
    'Native',
  ];

  declineReasons = [
    'Bad feedback from the Recruiter',
    'Bad feedback from the Interviewer',
    'Bad feedback from the Mentor',
    'Wrong location',
    'Russian language knowledge',
    'Bad test result',
    'Candidate´s rejection',
  ];

  candidateStatuses = [
    'New',
    'Test',
    'Interview',
    'Entry Interview',
    'Finish Interview',
    'Accepted',
    'Declined',
    'Candidate rejected',
  ];
  feedbackTypes = [
    'Test',
    'Interview',
    'TechInterviewOneStep',
    'TechInterviewSecondStep',
    'Mentor',
  ];
  candidateStatusesForManager = ['Accepted', 'Denied', 'Questionable'];

  // candidateList$ = this.candidatesService.getCandidates();
  candidatesList$: BehaviorSubject<Candidate[]> = new BehaviorSubject<Candidate[]>([]);

  isRecruiter: boolean = this.userService.checkRole(UserRole.recruiter);
  isManager: boolean = this.userService.checkRole(UserRole.manager);

  isEmailModalVisible$ = new BehaviorSubject(false);

  constructor(
    private candidatesService: CandidatesService,
    private userService: UserService,
    private projectsService: ProjectsService
  ) {}

 getProjectData$(projectId: string): Observable<Project> {
    return this.projectsService.getProjectById(projectId);
  }


  getProjectCandidates$(filters?: candidatesQueries): Observable<Candidate[]> {
    return this.candidatesService.getCandidatesByProjectId(<QueryParams>{
      odata: {
        projectId: filters?.id
      },
    });
  }

  getAllCandidates(filters?: candidatesQueries) {
    const searchText = {
      property: filters?.query,
      value: `contains(tolower(name), '${filters?.query}') or contains(tolower(surname), '${filters?.query}')`,
    };
    const candidatesSort = filters?.orderBy ? {
      names: [filters.orderBy.map(el => `${el.property} ${el.order}`)],
      // order: [filters.orderBy.map(el => `${el.order}`)]
    } : {}
    const filter = [searchText]
    console.log(candidatesSort)
    this.candidatesService
      .getCandidates(<QueryParams>{
        odata: {
          orderby: candidatesSort,
          filter
        },
      })
      .subscribe(
        (candidates) => {
          this.candidatesList$.next(candidates);
        }
      );
  }
}
