import { paths } from './../../../app-routing.constants';
import { Router } from '@angular/router';
import { Candidate } from './../../models/Candidate';
import { CandidatesPageFacade } from './candidates-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss']
})

export class CandidatesPageComponent implements OnInit {
  searchValue = '';
  visible = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  candidatesList: Candidate[] = [];

  constructor(private candidatesPageFacade: CandidatesPageFacade, private router: Router) { }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(value: boolean): void {
    this.candidatesList.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.candidatesList.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.candidatesList.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  listOfFilterLocation = this.candidatesPageFacade.listOfFilterLocation
  filterFnLocation = this.candidatesPageFacade.filterFnLocation
  listOfFilterSkill = this.candidatesPageFacade.listOfFilterSkill
  filterFnSkill = this.candidatesPageFacade.filterFnSkill
  listOfFilterStatus = this.candidatesPageFacade.listOfFilterStatus
  filterFnStatus = this.candidatesPageFacade.filterFnStatus

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.candidatesList = this.candidatesList.filter((candidate: Candidate) => candidate.lastname.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    this.candidatesPageFacade.candidateList$
      .subscribe(response => {
        this.candidatesList = response
      })
  }
}
