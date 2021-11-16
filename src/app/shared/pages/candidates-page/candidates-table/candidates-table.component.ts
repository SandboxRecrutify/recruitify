import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paths } from 'src/app/app-routing.constants';
import { Candidate } from './../../../models/Candidate';
import { CandidatesPageFacade } from './../candidates-page.facade';

@Component({
  selector: 'app-candidates-table',
  templateUrl: './candidates-table.component.html',
  styleUrls: ['./candidates-table.component.scss'],
})
export class CandidatesTableComponent implements OnInit {
  @Input() candidatesList!: Candidate[];
  @Input() currentProjectId!: string;

  paths = paths;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  candidateStatuses: string[] = [];
  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private router: ActivatedRoute
  ) {
    this.candidateStatuses = candidatesPageFacade.candidateStatuses;
  }

  ngOnInit(): void {}

  // TODO chande feedback model.
  getFeedbackRate(candidate: Candidate, feedbackType: string) {
    try {
      let currentProject: any = candidate.projectResults.find(
        (item) => item.projectId === this.currentProjectId
      );
      let testFeedback = currentProject.feedbacks.find(
        (item: any) => item.type === feedbackType
      );
      return testFeedback.rating;
    } catch (error) {
      return '-';
    }
  }

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
}
