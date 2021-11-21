import { CandidateCalendar } from './../../../models/CandidateCalendar';
import { InterviewerCalendar } from './../../../models/InterviewerCalendar';
import { filter } from 'rxjs/operators';
import { CalendarService } from './../../../services/calendar.service';

import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-skills-tabset',
  templateUrl: './skills-tabset.component.html',
  styleUrls: ['./skills-tabset.component.scss'],
})
export class SkillsTabsetComponent implements OnInit, DoCheck {
  constructor(private calendarService: CalendarService) {}

  interviewersTimeTable: any = [];
  candidatesTimeTable: any = [];

  displayedRecruiter: InterviewerCalendar[] = [];
  displayedCandidatesForRecruiter: CandidateCalendar[] = [];
  displayedInterviewers: InterviewerCalendar[] = [];
  displayedCandidates: CandidateCalendar[] = [];

  ngOnInit(): void {
    this.calendarService.getCandidatesTimeTable().subscribe((response) => {
      this.candidatesTimeTable = response;
    });
    this.calendarService.getInterviewersTimeTable().subscribe((response) => {
      this.interviewersTimeTable = response;
    });
  }

  ngDoCheck(): void {
    this.getRecruitersAndCandidates();
  }

  getTabNames() {
    const interviewersSkills = this.interviewersTimeTable.map(
      (item: any) => item.skill
    );
    const interviewersSkillsWithoutDuplicates = [
      ...new Set(interviewersSkills),
    ];
    const resultArrWithoutRecruiter =
      interviewersSkillsWithoutDuplicates.filter(
        (item) => item !== 'Recruiter'
      );

    return resultArrWithoutRecruiter;
  }

  getRecruitersAndCandidates() {
    this.displayedRecruiter = this.interviewersTimeTable.filter(
      (interviewer: any) => interviewer.skill === 'Recruiter'
    );
    this.displayedCandidatesForRecruiter = this.candidatesTimeTable;
  }

  getCandidatesAndInterviewersByTabName(tabName: any) {
    this.displayedInterviewers = this.interviewersTimeTable.filter(
      (interviewer: any) => interviewer.skill === tabName
    );
    this.displayedCandidates = this.candidatesTimeTable.filter(
      (interviewer: any) => interviewer.skill === tabName
    );
  }
}
