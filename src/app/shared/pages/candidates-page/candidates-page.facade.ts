import { UserService } from './../../services/user.service';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidatesPageFacade {
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
    'Tech Interview 1 ',
    'Tech Interview 2',
    'Accepted',
    'Declined',
    'Candidate rejected',
  ];

  candidateStatusesForManager = ['Accepted', 'Denied', 'Questionable'];

  constructor(
    private candidatesService: CandidatesService,
    private userServise: UserService
  ) {}

  candidateList$ = this.candidatesService.getCandidates();
  isRecruiter: boolean = this.userServise.isRecruiter();
  isManager: boolean = this.userServise.isManager();
}
