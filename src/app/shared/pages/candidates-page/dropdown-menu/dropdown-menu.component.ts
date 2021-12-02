import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CandidatesPageFacade } from './../candidates-page.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input() menuVisible: any;
  @Input() projectId!: string;

  isReasonSelectVisible: boolean = false;

  selectedStatus: string = '';
  selectedReason: string = '';

  testResult: string = '';

  setOfCandidatesId: Set<string> = new Set();

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private message: NzMessageService,
    private http: HttpClient
  ) {}

  isRecruiter: boolean = this.candidatesPageFacade.isRecruiter;
  isManager: boolean = this.candidatesPageFacade.isManager;
  declineReasons: string[] = this.candidatesPageFacade.declineReasons;
  candidateStatuses: string[] = this.candidatesPageFacade.candidateStatuses;
  candidateStatusesForManager: string[] =
    this.candidatesPageFacade.candidateStatusesForManager;

  ngOnInit(): void {
    this.candidatesPageFacade.checkedCandidatesIdSet$.subscribe((response) => {
      this.setOfCandidatesId = response;
    });
  }

  testResultSubmit() {
    if (this.setOfCandidatesId.size) {
      const reqBody = {
        rating: this.testResult,
        candidatesIds: [...this.setOfCandidatesId],
        projectId: this.projectId,
      };
      this.http
        .put(
          `testrecruitifytest.herokuapp.com/api/candidates/bulk/test_feedbacks?projectId=${this.projectId}`,
          { reqBody }
        )
        .subscribe((response) => {
          console.log(response);
        });

      this.testResult = '';
      this.message.success('Test result has been successfully updated');
    }
  }

  setReasonVisibility(event: any) {
    console.log(event.target);
  }

  setReasonSelectVisibility(value: any) {
    value === 'Denied'
      ? (this.isReasonSelectVisible = true)
      : (this.isReasonSelectVisible = false);
    console.log(value);
  }

  statusSubmit() {
    let status;
    if (this.selectedStatus === 'Accepted') {
      status = 0;
    } else if (this.selectedStatus === 'Denied') {
      status = 1;
    } else {
      status = 2;
    }

    const reqBody = {
      status: status,
      reason: this.selectedReason,
      candidatesIds: [...this.setOfCandidatesId],
      projectId: this.projectId,
    };
    this.http
      .put(
        `testrecruitifytest.herokuapp.com/api/candidates/bulk/test_feedbacks?projectId=${this.projectId}`,
        { reqBody }
      )
      .subscribe((response) => {
        console.log(response);
      });

    this.selectedStatus;
    this.selectedReason = '';
    this.isReasonSelectVisible = false;
    this.message.success('Test result has been successfully updated');
  }

  printEmailModal() {
    this.candidatesPageFacade.isEmailModalVisible$.next(true);
  }
}
