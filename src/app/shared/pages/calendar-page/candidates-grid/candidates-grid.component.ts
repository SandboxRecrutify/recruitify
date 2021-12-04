import { CalendarService } from './../../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.scss'],
})
export class CandidatesGridComponent implements OnInit {
  currentProjectId: string = '';
  displayedCandidates: any = [];
  candidatePrimarySkillName: string = '';

  constructor(
    private calendarPageFacade: CalendarPageFacade,
    private route: ActivatedRoute,
    public calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentProjectId = params.id;
      this.calendarService
        .getCandidatesForRecruiter$(this.currentProjectId)
        .subscribe((response) => {
          this.displayedCandidates = response;
          console.log(response);
        });
    });

    // this.calendarPageFacade.displayedCandidates$.subscribe((response) => {
    //   this.displayedCandidates = response;
    // });
  }
}
