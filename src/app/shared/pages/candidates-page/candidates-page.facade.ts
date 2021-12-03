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
import { CreateFeedbackParams } from '../../models/CreateFeedbackParams';

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
    "Bad Recruiter's feedback",
    "Bad Interviewer's feedback",
    "Bad Mentor's feedback",
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
  candidateStatusesForManager = ['Accepted', 'Denied', 'Waiting list'];

  candidatesList$: BehaviorSubject<Candidate[]> = new BehaviorSubject<
    Candidate[]
  >([]);

  checkedCandidatesIdSet$ = new BehaviorSubject(new Set<string>());

  isRecruiter: boolean = this.userService.checkGlobalRole(UserRole.recruiter);
  isManager: boolean = this.userService.checkGlobalRole(UserRole.manager);

  isEmailModalVisible$ = new BehaviorSubject(false);

  constructor(
    private candidatesService: CandidatesService,
    private userService: UserService,
    private projectsService: ProjectsService
  ) {}

<<<<<<< HEAD
  createFeedback$(params: CreateFeedbackParams) {
    return this.candidatesService.createFeedback$(params);
  }

=======
>>>>>>> main
  getProjectData$(projectId: string): Observable<Project> {
    return this.projectsService.getProjectById(projectId);
  }

  createFeedback$(params:CreateFeedbackParams){
    return this.candidatesService.createFeedback$(params)
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
<<<<<<< HEAD
      : {};
    const filter = [searchText];
    // console.log(candidatesSort);
=======
        : {};
        const filter = [searchText, location, englishLevel, status, primarySkill];
        console.log(candidatesSort);
>>>>>>> main
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
