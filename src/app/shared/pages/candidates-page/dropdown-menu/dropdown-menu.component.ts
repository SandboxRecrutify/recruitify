import { UserService } from './../../../services/user.service';
import { CandidatesService } from './../../../services/candidates.service';
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

  selectedStatus: string = '';
  selectedReason: string = '';
  isReasonSelectVisible: boolean = false;

  testResult: string = '';
  daysForTestTask: string = '';

  setOfCandidatesId: Set<string> = new Set();

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private candidatesService: CandidatesService,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  isRecruiter: boolean = this.candidatesPageFacade.isRecruiter;
  isManager: boolean = this.candidatesPageFacade.isManager;

  declineReasons: string[] = this.candidatesPageFacade.declineReasons;
  candidateStatuses: string[] = this.candidatesPageFacade.candidateStatuses;
  candidateStatusesForManager: string[] =
    this.candidatesPageFacade.candidateStatusesForManager;

  ngOnInit(): void {
    console.log(
      this.userService.checkRoleInProject(this.projectId, 'Recruiter')
    );

    this.candidatesPageFacade.checkedCandidatesIdSet$.subscribe((response) => {
      this.setOfCandidatesId = response;
    });
  }

  setReasonSelectVisibility(value: any) {
    value === 'Denied'
      ? (this.isReasonSelectVisible = true)
      : (this.isReasonSelectVisible = false);
    console.log(value);
  }

  // printEmailModal() {
  //   this.candidatesPageFacade.isEmailModalVisible$.next(true);
  // }

  sendTestTask() {
    const reqBody = {
      candidatesIds: [...this.setOfCandidatesId],
      projectId: this.projectId,
    };

    this.candidatesService
      .senTestTask(this.projectId, { ...reqBody })
      .subscribe((response) => {
        console.log(response);
      });

    console.log(reqBody);
  }

  testResultSubmit() {
    if (this.setOfCandidatesId.size) {
      const reqBody = {
        rating: this.testResult,
        candidatesIds: [...this.setOfCandidatesId],
        projectId: this.projectId,
      };

      this.candidatesService
        .setTestResult(this.projectId, { ...reqBody })
        .subscribe((response) => {
          console.log(response);
        });

      this.testResult = '';
      this.message.success('Test result has been successfully updated');
    }
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

    this.candidatesService
      .setStatus(this.projectId, { ...reqBody })
      .subscribe((response) => {
        console.log(response);
      });

    this.selectedStatus;
    this.selectedReason = '';
    this.isReasonSelectVisible = false;
    this.message.success('Test result has been successfully updated');
  }
}
