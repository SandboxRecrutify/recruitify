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
  isReasonSelectVisible: boolean = false;
  selectedStatus: string = '';
  selectedReason: string = '';

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private message: NzMessageService
  ) {}

  isRecruiter: boolean = this.candidatesPageFacade.isRecruiter;
  isManager: boolean = this.candidatesPageFacade.isManager;
  declineReasons: string[] = this.candidatesPageFacade.declineReasons;
  candidateStatuses: string[] = this.candidatesPageFacade.candidateStatuses;
  candidateStatusesForManager: string[] =
    this.candidatesPageFacade.candidateStatusesForManager;

  ngOnInit(): void {}

  setReasonVisibility(event: any) {
    console.log(event.target);
  }

  setReasonSelectVisibility(value: any) {
    value === 'Denied'
      ? (this.isReasonSelectVisible = true)
      : (this.isReasonSelectVisible = false);
    console.log(value);
  }

  submitStatus() {
    this.selectedStatus ? this.printStatusSubmitMessage('success') : null;
    this.selectedStatus = '';
    this.selectedReason = '';
    this.isReasonSelectVisible = false;
  }

  printStatusSubmitMessage(type: string): void {
    this.message.create(type, `Status was successfully set`);
  }

  printEmailModal() {
    this.candidatesPageFacade.isEmailModalVisible$.next(true);
  }
}
