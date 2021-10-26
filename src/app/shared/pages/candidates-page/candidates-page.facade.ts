import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidatesPageFacade {
  candidateList$ = this.candidatesService.getCandidates();

  listOfFilterLocation = [
    { text: 'Minsk', value: 'Minsk' },
    { text: 'Vitebsk', value: 'Vitebsk' },
    { text: 'Moscow', value: 'Moscow' },
  ];
  listOfFilterSkill = [
    { text: 'JS', value: 'JS' },
    { text: '.NET', value: '.NET' },
    { text: 'BA', value: 'BA' },
  ];
  listOfFilterStatus = [{ text: 'New', value: 'New' }];

  constructor(private candidatesService: CandidatesService) {}

  filterFnLocation = (filter: string[], candidateList: Candidate) =>
    filter.some((item) => candidateList.city.indexOf(item) !== -1);
  filterFnSkill = (filter: string[], candidateList: Candidate) =>
    filter.some((item) => candidateList.skill.indexOf(item) !== -1);
  filterFnStatus = (filter: string[], candidateList: Candidate) =>
    filter.some((item) => candidateList.status.indexOf(item) !== -1);
}
