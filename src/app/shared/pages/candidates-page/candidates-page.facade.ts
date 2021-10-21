import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()

export class CandidatesPageFacade {
  constructor(private candidatesService: CandidatesService) {}

  candidateList$ = this.candidatesService.getCandidates()
}
