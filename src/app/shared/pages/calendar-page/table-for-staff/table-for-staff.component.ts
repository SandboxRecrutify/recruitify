import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-for-staff',
  templateUrl: './table-for-staff.component.html',
  styleUrls: ['./table-for-staff.component.scss'],
})
export class TableForStaffComponent implements OnInit {
  today = new Date().toLocaleDateString();
  subs = new Subscription();

  interviewersTimeTable: any = [];
  candidatesWithTimeToContact: any = [];
  dragedCandidateSkill!: string;
  dragedCandidateTime!: number[];
  avaliableInterviewersIdToDrop!: any;

  constructor(
    private dragulaService: DragulaService,
    private http: HttpClient // private dragNDropService: DragNDropService
  ) {
    dragulaService.createGroup('calendar', {
      revertOnSpill: true,
    });
    this.subs.add(
      dragulaService.drag('calendar').subscribe(({ el }) => {
        let dragedCandidate = this.candidatesWithTimeToContact.find(
          (item: any) => +item.id === +el.id
        );
        this.dragedCandidateSkill = dragedCandidate.skill;
        this.dragedCandidateTime = dragedCandidate.bestTimeToConnect;
      })
    );
    this.subs.add(
      dragulaService.over('calendar').subscribe(({ el, container, source }) => {
        if (container.classList.contains('markedByInterviewer')) {
          container.classList.add('over');
        }
      })
    );
    this.subs.add(
      dragulaService.out('calendar').subscribe(({ container }) => {
        container.classList.remove('over');
      })
    );
    this.subs.add(
      dragulaService.drop('calendar').subscribe(({ el, target }) => {
        if (target.classList.contains('markedByInterviewer')) {
          el.innerHTML = '';
          el.className = 'd-none';
          target.classList.add('assigned');
        }
        this.dragedCandidateSkill = '';
      })
    );
    this.subs.add(
      dragulaService.cancel('calendar').subscribe(() => {
        this.dragedCandidateSkill = '';
      })
    );
  }

  checkIsAvaliableToDrop(
    interviewerSkill: string,
    dragedCandidateSkill: string,
    interviewerTime: number,
    dragedCandidateTime: number[]
  ): string {
    console.log(interviewerTime);
    console.log(dragedCandidateTime);
    console.log(
      dragedCandidateTime ? dragedCandidateTime.includes(interviewerTime) : null
    );
    const isTimeIncludes = dragedCandidateTime
      ? dragedCandidateTime.includes(interviewerTime)
      : null;
    if (interviewerSkill === dragedCandidateSkill && isTimeIncludes) {
      return 'calendar';
    }
    return '';
  }

  ngOnInit(): void {
    this.http
      .get('/assets/interviewer-calendar.json')
      .subscribe((response) => (this.interviewersTimeTable = response));

    this.http
      .get('/assets/candidates-contact-time.json')
      .subscribe((response) => {
        this.candidatesWithTimeToContact = response;
      });
  }
}
