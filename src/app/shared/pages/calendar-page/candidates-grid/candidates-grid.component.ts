import { HttpClient } from '@angular/common/http';
import { CandidatesService } from './../../../services/candidates.service';
import { CalendarPageFacade } from './../calendar-page.facade';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.scss'],
})
export class CandidatesGridComponent implements OnInit {
  candidates = this.calendarPageFacade.candidatesContactTime;
  candidatesWithTimeToContact: any = [];

  constructor(
    private calendarPageFacade: CalendarPageFacade,
    private candidatesService: CandidatesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get('/assets/candidates-contact-time.json')
      .subscribe((response) => {
        this.candidatesWithTimeToContact = response;
      });
  }
}
