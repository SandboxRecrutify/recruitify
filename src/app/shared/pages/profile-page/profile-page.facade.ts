import { map } from 'rxjs/operators';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()

export class ProfilePageFacade {

  candidatesList$ = this.candidatesService.getCandidates()

  constructor(private candidatesService: CandidatesService, private router: ActivatedRoute) {}
}
