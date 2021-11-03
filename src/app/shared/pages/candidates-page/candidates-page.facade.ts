import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidatesPageFacade {
  candidateList$ = this.candidatesService.getCandidates();

  englishLvls = [
    'Begginer',
    'Pre-Intermediate',
    'Intermediate',
    'Advanced',
    'Native',
  ];

  statuses = [
    'New',
    'Test',
    'Interview',
    'Tech Interview 1',
    'Waiting List',
    'Tech Interview 2',
    'Accepted to Sandbox',
    'Job Offer',
    'Declined',
    'Candidate rejected',
  ];

  constructor(private candidatesService: CandidatesService) {}
}
