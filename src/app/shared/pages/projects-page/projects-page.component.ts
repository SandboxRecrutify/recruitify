import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectsPageFacade } from './projects-page.facade';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  searchText: string = ''
  isVisible = false;
  projects: Project[] = [];

  handleToggle(isVisible: boolean): void {
    this.isVisible = isVisible;
  }

  constructor(private projectsPageFacade: ProjectsPageFacade) {}

  ngOnInit(): void {
    this.projectsPageFacade.projectsList$.subscribe(
      (response) => (this.projects = response)
    );

  }
}
