import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-calendar-for-recruiters',
  templateUrl: './calendar-for-recruiters.component.html',
  styleUrls: ['./calendar-for-recruiters.component.scss'],
})
export class CalendarForRecruitersComponent implements OnInit, DoCheck {
  datepickerValue!: Date;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.calendarService.datepickerValue$.subscribe((response) => {
      this.datepickerValue = response;
    });
  }

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
    this.calendarService.getNextDay();
  }

  onPreviousDayButtonClick() {
    this.calendarService.getPreviuosDay();
  }

  onCalendarDateChange(event: Date) {
    this.calendarService.setPickedDay(event);
  }
}
