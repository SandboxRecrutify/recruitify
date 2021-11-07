import { CandidatesPageFacade } from './../candidates-page.facade';
import { Candidate } from './../../../models/Candidate';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-table',
  templateUrl: './candidates-table.component.html',
  styleUrls: ['./candidates-table.component.scss'],
})
export class CandidatesTableComponent implements OnInit {
  @Input() candidatesList!: Candidate[];

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();

  constructor(private candidatesPageFacade: CandidatesPageFacade) {}

  ngOnInit(): void {}

  updateCheckedSet(id: string, checked: boolean): void {
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

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
    console.log(id);
  }

  refreshCheckedStatus(): void {
    this.checked = this.candidatesList.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.candidatesList.some((item) => this.setOfCheckedId.has(item.id)) &&
      !this.checked;
  }

  sortAlphabetically = (a: Candidate, b: Candidate) =>
    a.name.localeCompare(b.name);
  // sortNumber = (arr: any) => arr.sort((a, b) => (a.age > b.age ? 1 : -1));
}
