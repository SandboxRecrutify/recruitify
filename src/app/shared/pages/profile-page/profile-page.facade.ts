import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/Candidate';
import { CandidateService } from '../../services/candidate.service';

@Injectable()
export class ProfilePageFacade {
  constructor(private candidateService: CandidateService) {}
  getCandiateById$(id: string): Observable<Candidate> {
    return this.candidateService.getCandiateById(id);
  }
}
