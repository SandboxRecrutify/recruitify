import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/shared/models/Projects';
import { ProjectsPageFacade } from '../projects-page.facade';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  cards: Projects[] = []


  constructor(private projectsPageFacade : ProjectsPageFacade) { }

  ngOnInit(): void {
    this.projectsPageFacade.projectsList$
      .subscribe(response => this.cards = response)
  }

}
