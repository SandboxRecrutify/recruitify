import { Injectable } from '@angular/core';
import { CandidateService } from '../services/candidate.service';

@Injectable()
export class FacadeService {
  constructor(private candidatesService: CandidateService) {}
  isHeaderVisible = true;
  setIsHeaderVisible(isHeaderVisible: boolean) {
    this.isHeaderVisible = isHeaderVisible;
  }
}
