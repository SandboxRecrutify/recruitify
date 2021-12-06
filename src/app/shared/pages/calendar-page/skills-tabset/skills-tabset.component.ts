import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CalendarPageFacade } from './../calendar-page.facade';
import { CalendarService } from './../../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-tabset',
  templateUrl: './skills-tabset.component.html',
  styleUrls: ['./skills-tabset.component.scss'],
})
export class SkillsTabsetComponent implements OnInit {
  interviewersTimeTable: any = [];
  candidatesTimeTable: any = [];

  constructor(
    private calendarService: CalendarService,
    private calendarPageFacade: CalendarPageFacade,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.calendarService.getCandidatesTimeTable().subscribe((response) => {
      this.candidatesTimeTable = response;
    });

    this.calendarService.getInterviewersTimeTable().subscribe((response) => {
      this.interviewersTimeTable = response;
      this.setRecruiterAndAllCandidates();
    });
  }

  setTabNames() {
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

  setRecruiterAndAllCandidates() {
    this.calendarPageFacade.displayedInterviewers$.next(
      this.interviewersTimeTable.filter(
        (interviewer: any) => interviewer.skill === 'Recruiter'
      )
    );

    this.calendarPageFacade.displayedCandidates$.next(this.candidatesTimeTable);
  }

  setInterviewersAndCandidatesBySkill(tabName: any) {
    const interviewers = this.interviewersTimeTable.filter(
      (interviewer: any) => interviewer.skill === tabName
    );
    const candidates = this.candidatesTimeTable.filter(
      (interviewer: any) => interviewer.skill === tabName
    );
    this.calendarPageFacade.displayedInterviewers$.next(interviewers);
    this.calendarPageFacade.displayedCandidates$.next(candidates);
  }
}
