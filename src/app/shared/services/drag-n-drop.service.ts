import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragNDropService {
  subs = new Subscription();

  constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup('calendar', {
      revertOnSpill: true,
    });
    this.subs.add(
      dragulaService.drag('calendar').subscribe(({ el }) => {
        // console.log(el);
      })
    );
    this.subs.add(
      dragulaService.over('calendar').subscribe(({ el, container, source }) => {
        container.classList.add('over');
      })
    );
    this.subs.add(
      dragulaService.out('calendar').subscribe(({ container }) => {
        container.classList.remove('over');
      })
    );
    this.subs.add(
      dragulaService.drop('calendar').subscribe(({ el, target }) => {
        if (target.classList.contains('avaliable')) {
          el.innerHTML = '';
          el.className = 'd-none';
          target.classList.add('assigned');
        }
      })
    );
  }
}
