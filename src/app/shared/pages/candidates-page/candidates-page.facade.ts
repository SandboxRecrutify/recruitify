import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidatesPageFacade {
  candidateList$ = this.candidatesService.getCandidates();

  constructor(private candidatesService: CandidatesService) {}
}
