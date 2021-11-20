import { CalendarService } from './calendar.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragNDropService {
  subs = new Subscription();

  candidatesTimeTable: any = [];
  skill = new BehaviorSubject('');
  time = new BehaviorSubject([]);

  constructor(
    private dragulaService: DragulaService,
    private calendarService: CalendarService
  ) {
    calendarService.getCandidatesTimeTable().subscribe((responce) => {
      this.candidatesTimeTable = responce;
    });

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
        this.onCandidateDragCancel();
      })
    );
  }

  onCandidateDrag(el: Element) {
    let dragedCandidate = this.candidatesTimeTable.find(
      (item: any) => +item.id === +el.id
    );

    this.skill.next(dragedCandidate.skill);
    this.time.next(dragedCandidate.bestTimeToConnect);
  }

  onCandidateDrop(el: Element, target: Element) {
    if (target.classList.contains('markedByInterviewer')) {
      el.className = 'd-none';
      target.classList.add('assigned');
    }

    this.time.next([]);
    this.skill.next('');
  }

  onCandidateDragCancel() {
    this.time.next([]);
    this.skill.next('');
  }

  onCandidateOverAvaliableContainer(container: Element) {
    if (container.classList.contains('markedByInterviewer')) {
      container.classList.add('over');
    }
  }

  onCandidateOutOfAvaliableContainer(container: Element) {
    container.classList.remove('over');
  }
}
