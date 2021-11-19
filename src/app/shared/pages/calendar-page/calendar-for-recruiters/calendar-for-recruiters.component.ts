import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-for-recruiters',
  templateUrl: './calendar-for-recruiters.component.html',
  styleUrls: ['./calendar-for-recruiters.component.scss'],
})
export class CalendarForRecruitersComponent implements OnInit {
  today = new Date().toLocaleDateString();
  subs = new Subscription();

  interviewersTimeTable: any;
  candidatesTimeTable: any = [];
  dragedCandidateSkill!: string;
  dragedCandidateTime: number[] = [];

  constructor(
    private dragulaService: DragulaService,
    private http: HttpClient
  ) {
    dragulaService.createGroup('calendar', {
      revertOnSpill: true,
    });
    this.subs.add(
      dragulaService.drag('calendar').subscribe(({ el }) => {
        this.onCandidateDrag(el);
      })
    );
    this.subs.add(
      dragulaService.over('calendar').subscribe(({ container }) => {
        this.onCandidateOverAvaliableContainer(container);
      })
    );
    this.subs.add(
      dragulaService.out('calendar').subscribe(({ container }) => {
        this.onCandidateOutOfAvaliableContainer(container);
      })
    );
    this.subs.add(
      dragulaService.drop('calendar').subscribe(({ el, target }) => {
        this.onCandidateDrop(el, target);
      })
    );
    this.subs.add(
      dragulaService.cancel('calendar').subscribe(() => {
        this.dragedCandidateSkill = '';
      })
    );
  }

  ngOnInit(): void {
    this.http
      .get('/assets/interviewer-calendar.json')
      .subscribe((response) => (this.interviewersTimeTable = response));

    this.http
      .get('/assets/candidates-contact-time.json')
      .subscribe((response) => {
        this.candidatesTimeTable = response;
      });
  }

  onCandidateDrag(el: Element) {
    let dragedCandidate = this.candidatesTimeTable.find(
      (item: any) => +item.id === +el.id
    );
    this.dragedCandidateSkill = dragedCandidate.skill;
    this.dragedCandidateTime = dragedCandidate.bestTimeToConnect;
  }

  onCandidateDrop(el: Element, target: Element) {
    if (target.classList.contains('markedByInterviewer')) {
      el.className = 'd-none';
      target.classList.add('assigned');
    }
    this.dragedCandidateSkill = '';
  }

  onCandidateOverAvaliableContainer(container: Element) {
    if (container.classList.contains('markedByInterviewer')) {
      container.classList.add('over');
    }
  }

  onCandidateOutOfAvaliableContainer(container: Element) {
    container.classList.remove('over');
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
}
