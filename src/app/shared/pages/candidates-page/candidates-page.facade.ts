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
  candidatesList$: BehaviorSubject<Candidate[]> = new BehaviorSubject<
    Candidate[]
  >([]);

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

  getAllCandidates(filters?: candidatesQueries) {
    console.log(filters);
    const location = filters?.location?.map((location) => {
      const arr = location.split(', ');
      return {
        property: location,
        value: `location/country eq '${arr[0]}' and location/city eq '${arr[1]}'`,
      };
    });
    const englishLevel = filters?.englishLevel?.map((level) => ({
      property: level,
      value: `englishLevel eq '${level}'`,
    }));
    const status = filters?.status?.map((status) => ({
      property: status,
      value: `projectResults/any(p: p/status eq '${status}')`,
    }));
    const primarySkill = filters?.primarySkill?.map((skill) => ({
      property: skill,
      value: `projectResults/any(p: p/primarySkill/name eq '${skill}')`,
    }));
    const searchText = {
      property: filters?.query,
      value: `contains(tolower(name), '${filters?.query}') or contains(tolower(surname), '${filters?.query}')`,
    };
    const candidatesSort = filters?.orderBy
    ? {
          names: [filters.orderBy.map((el) => `${el.property} ${el.order}`)],
        }
        : {};
        const filter = [searchText, location, englishLevel, status, primarySkill];
        console.log(candidatesSort);
    this.candidatesService
    .getCandidates(<QueryParams>{
      odata: {
        projectId: filters?.id,
        orderby: candidatesSort,
        filter,
      },
    })
    .subscribe((candidates) => {
      this.candidatesList$.next(candidates);
    });
  }
}

// getProjectCandidates$(filters?: candidatesQueries) {
//   this.candidatesService.getCandidates(<QueryParams>{
//     odata: {
//       projectId: filters?.id
//     },
//   }).subscribe( (candidates) => {
//     this.candidatesList$.next(candidates);
//     console.log(candidates)
//   })
// }
