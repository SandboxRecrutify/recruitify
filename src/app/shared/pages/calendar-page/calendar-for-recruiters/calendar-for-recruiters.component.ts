import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-for-recruiters',
  templateUrl: './calendar-for-recruiters.component.html',
  styleUrls: ['./calendar-for-recruiters.component.scss'],
})
export class CalendarForRecruitersComponent implements OnInit {
  datepickerValue = new Date();

  constructor() {}

  ngOnInit(): void {}

  setDragulaValue(
    interviewerSkill: string,
    dragedCandidateSkill: string,
    interviewerTime: number,
    dragedCandidateTime: number[]
  ): string {
    const isTimeIncludes = dragedCandidateTime.includes(interviewerTime);
    const isEqualSkill = interviewerSkill === dragedCandidateSkill;
    return isTimeIncludes && isEqualSkill ? 'calendar' : '';
  }

  checkIsAvaliableToDrop(
    interviewerSkill: string,
    dragedCandidateSkill: string,
    interviewerTime: number,
    dragedCandidateTime: number[]
  ) {
    const isTimeIncludes = dragedCandidateTime.includes(interviewerTime);
    const isEqualSkill = interviewerSkill === dragedCandidateSkill;
    return isTimeIncludes && isEqualSkill;
  }

  onNextDayButtonClick() {
    this.datepickerValue = new Date(
      this.datepickerValue.getTime() + 24 * 60 * 60 * 1000
    );
  }

  onPreviousDayButtonClick() {
    this.datepickerValue = new Date(
      this.datepickerValue.getTime() - 24 * 60 * 60 * 1000
    );
  }
}
