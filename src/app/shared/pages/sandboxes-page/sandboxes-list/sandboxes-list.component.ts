import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/shared/models/Projects';
import { ProjectsPageFacade } from '../sandboxes-page.facade';

@Component({
  selector: 'app-sandboxes-list',
  templateUrl: './sandboxes-list.component.html',
  styleUrls: ['./sandboxes-list.component.scss']
})
export class SandboxesListComponent implements OnInit {
  cards: Projects[] = []


  constructor(private projectsPageFacade : ProjectsPageFacade) { }

  ngOnInit(): void {
    this.projectsPageFacade.projectsList$
      .subscribe(response => this.cards = response)
  }

}
