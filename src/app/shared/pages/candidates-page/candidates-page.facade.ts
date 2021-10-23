import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()

export class CandidatesPageFacade {
  listOfFilterLocation = [
    {text: 'Minsk', value: 'Minsk'},
    {text: 'Gomel', value: 'Gomel'},
    {text: 'Barcelona', value: 'Barcelona'},
  ]
  filterFnLocation = (list: string[], item: Candidate) => list.some(location => item.country.indexOf(location) !== -1)

  listOfFilterSkill = [
    {text: 'JS', value: 'JS'},
    {text: '.NET', value: '.NET'},
    {text: 'BA', value: 'BA'},
  ]
  filterFnSkill = (list: string[], item: Candidate) => list.some(skill => item.skill.indexOf(skill) !== -1)

  listOfFilterStatus = [
    {text: 'New', value: 'New'},
    {text: 'Interview', value: 'Interview'},
  ]
  filterFnStatus = (list: string[], item: Candidate) => list.some(status => item.status.indexOf(status) !== -1)

  constructor(private candidatesService: CandidatesService) {}

  candidateList$ = this.candidatesService.getCandidates()
}
