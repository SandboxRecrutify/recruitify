import { CalendarPageFacade } from './../pages/calendar-page/calendar-page.facade';
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
  dragedCandidateSkill$ = new BehaviorSubject('');
  dragedCandidateTime$ = new BehaviorSubject([]);

  dragedCandidate!: any;

  constructor(
    private dragulaService: DragulaService,
    private calendarService: CalendarService,
    private calendarPageFacade: CalendarPageFacade
  ) {
    calendarService.getCandidatesTimeTable().subscribe((responce) => {
      this.candidatesTimeTable = responce;
    });

    dragulaService.createGroup('calendar', {
      revertOnSpill: true,
    });

    // this.subs.add(
    //   dragulaService
    //     .dropModel('calendar')
    //     .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
    //       console.log('dropModel:');
    //       console.log(el);
    //       console.log(source);
    //       console.log(target);
    //       console.log(sourceModel);
    //       console.log(targetModel);
    //       console.log(item);
    //     })
    // );

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
        this.calendarPageFacade.isSaveBtnVisible$.next(true);
      })
    );

    this.subs.add(
      dragulaService.cancel('calendar').subscribe(() => {
        this.onCandidateDragCancel();
      })
    );
  }

  onCandidateDrag(el: Element) {
    this.dragedCandidate = this.candidatesTimeTable.find(
      (item: any) => +item.id === +el.id
    );

    this.dragedCandidateSkill$.next(this.dragedCandidate.skill);
    this.dragedCandidateTime$.next(this.dragedCandidate.bestTimeToConnect);
  }

  onCandidateDrop(el: Element, target: Element) {
    if (target.classList.contains('markedByInterviewer')) {
      // el.className = 'd-none';
      target.classList.add('assigned');
    }

    this.dragedCandidateSkill$.next('');
    this.dragedCandidateTime$.next([]);
  }

  onCandidateDragCancel() {
    this.dragedCandidateSkill$.next('');
    this.dragedCandidateTime$.next([]);
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
