import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Candidate, CandidatesLocation } from './../../models/Candidate';
import { CandidatesPageFacade } from './candidates-page.facade';

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss'],
})
export class CandidatesPageComponent implements OnInit {
  searchValue = '';
  checked = false;
  indeterminate = false;
  drawerVisible = false;
  menuVisible = true;
  setOfCheckedId = new Set<number>();
  candidatesList: Candidate[] = [];

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private router: Router
  ) {}

  openDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }

  sortAlphabetically = (a: Candidate, b: Candidate) =>
    a.name.localeCompare(b.name);

  // sortNumber = (arr: any) => arr.sort((a, b) => (a.age > b.age ? 1 : -1));

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(value: boolean): void {
    this.candidatesList.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.candidatesList.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.candidatesList.some((item) => this.setOfCheckedId.has(item.id)) &&
      !this.checked;
  }

  searchName() {
    this.candidatesList = this.candidatesList.filter(
      (candidate: Candidate) =>
        candidate.name.indexOf(this.searchValue) !== -1 ||
        candidate.surname.indexOf(this.searchValue) !== -1
    );
  }

  ngOnInit(): void {
    this.candidatesPageFacade.candidateList$.subscribe((response) => {
      this.candidatesList = response;
    });
  }
}
