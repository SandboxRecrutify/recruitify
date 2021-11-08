import { Project } from 'src/app/shared/models/Project';
import { CandidateProjectResults } from './../../../models/CandidateProjectResults';
import { Feedback } from './../../../models/Feedback';
import { ActivatedRoute } from '@angular/router';
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
  currentProjectId = this.candidatesPageFacade.getCurrentProjectId(this.router);

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {}

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

  lol(candidate: Candidate) {
    let currentProject: any = candidate.projectResults.find(
      (item) => item.projectId === this.currentProjectId
    );
    console.log(currentProject.feedbacks);
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
  // sortNumber = (arr: any) => arr.sort((a, b) => (a.age > b.age ? 1 : -1));
}
