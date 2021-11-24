import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { QueryParams } from '../../services/api.service';
import { ProjectsService } from '../../services/projects.service';
import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { UserService } from './../../services/user.service';

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
    'Tech Interview 1',
    'Tech Interview 2',
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

  constructor(
    private candidatesService: CandidatesService,
    private userServise: UserService,
    private projectsService: ProjectsService
  ) {}

  candidateList$ = this.candidatesService.getCandidates();
  isRecruiter: boolean = this.userServise.isRecruiter();
  isManager: boolean = this.userServise.isManager();

  getProjectCandidates$(projectId: string): Observable<Candidate[]> {
    return this.candidatesService.getCandidatesByProjectId(<QueryParams>{
      odata: {
        projectId
      }
    });
  }

  getProjectData$(projectId: string): Observable<Project> {
    return this.projectsService.getProjectById(projectId);
  }

  getAllCandidates() {
    return this.candidatesService.getCandidates();
  }
}
