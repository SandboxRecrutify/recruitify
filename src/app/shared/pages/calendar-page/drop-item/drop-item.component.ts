import { CandidateCalendar } from './../../../models/CandidateCalendar';
import { InterviewerCalendar } from './../../../models/InterviewerCalendar';
import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-item',
  templateUrl: './drop-item.component.html',
  styleUrls: ['./drop-item.component.scss'],
})
export class DropItemComponent implements OnInit {
  @Input() timetableTime: any;
  @Input() currentInterviewer: any;

  isPopVisible = false;

  displayedInterviewers!: InterviewerCalendar[];
  displayedCandidates: any;

  assignedCandidate!: any;
  dragedCandidate!: CandidateCalendar;

  constructor(private calendarPageFacade: CalendarPageFacade) {}

  ngOnInit(): void {
    this.calendarPageFacade.assignedCandidate$.subscribe(
      (response) => (this.assignedCandidate = response)
    );

    this.calendarPageFacade.displayedInterviewers$.subscribe((response) => {
      this.displayedInterviewers = response;
    });

    this.calendarPageFacade.displayedCandidates$.subscribe((response) => {
      this.displayedCandidates = response;
    });

    this.calendarPageFacade.dragedCandidate$.subscribe((response) => {
      this.dragedCandidate = response;
    });
  }

  setDragulaValue(assignedCandidateArr: any): string {
    const isCandidateAssigned = !assignedCandidateArr.length;
    return isCandidateAssigned ? 'calendar' : '';
  }

  setIsAvaliableToDrop(interviewerTime: number, dragedCandidateTime: number[]) {
    if (dragedCandidateTime) {
      const isTimeIncludes = dragedCandidateTime.includes(
        new Date(interviewerTime).getHours()
      );
      return isTimeIncludes;
    } else {
      return null;
    }
  }

  setPopTrigger(candidate: any) {
    return candidate ? 'click' : null;
  }

  onItemClick(candidate: any, time: number, interviewerId: number) {
    const assignedDate = new Date(time);
    const assignedCandidateData = {
      ...candidate,
      assignedDate,
      interviewerId,
    };
    if (candidate) {
      this.calendarPageFacade.assignedCandidate$.next(assignedCandidateData);
    }
  }

  onRemoveBtnClick(assignedCandiate: any) {
    const interviewer = this.displayedInterviewers.find(
      (interviewer) => interviewer.id === assignedCandiate.interviewerId
    );
    interviewer?.calendar[0].timetable.forEach((item) => {
      this.isPopVisible = false;

      if (item.candidate[0] && item.candidate[0].id === assignedCandiate.id) {
        item.candidate.pop();

        this.calendarPageFacade.displayedCandidates$.next([
          ...this.displayedCandidates,
          assignedCandiate,
        ]);
      }
    });
  }
}
