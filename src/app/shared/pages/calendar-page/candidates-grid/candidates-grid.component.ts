import { CalendarService } from './../../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.scss'],
})
export class CandidatesGridComponent implements OnInit {
  currentProjectId: string = '';
  displayedCandidates: any;
  candidatePrimarySkillName: string = '';
  displayedInterviewerIsRecruiter!: boolean;

  constructor(
    private calendarPageFacade: CalendarPageFacade,
    private route: ActivatedRoute,
    public calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.calendarPageFacade.displayedCandidates$.subscribe((response) => {
      this.displayedCandidates = response;
    });

    this.calendarPageFacade.displayedInterviewers$.subscribe((response) => {
      if (response.length) {
        this.displayedInterviewerIsRecruiter =
          response[0].skill === 'Recruiter';
      }
    });
  }
}
