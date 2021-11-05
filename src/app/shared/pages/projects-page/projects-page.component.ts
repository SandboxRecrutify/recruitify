import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectsPageFacade } from './projects-page.facade';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  searchText: string = '';

  projects: Project[] = [];
  projects$: Observable<Project[]>;

  filter: boolean = false;
  status: string = '';

  listOfOption: string[] = [
    '.Net',
    'QA',
    'JavaScript',
    'AutomationQA',
    'DevOps',
    'Java',
    'PHP',
    'ProjectManager',
    'BusinessAnalyst',
  ];
  listOfSelectedValue = [];

  constructor(private projectsPageFacade: ProjectsPageFacade) {
    this.projects$ = this.projectsPageFacade.getProjectsList$();
  }

  ngOnInit(): void {
    this.projects$.subscribe((response) => (this.projects = response));
  }

  switchFilter() {
    this.filter = !this.filter;
  }

  handleToggle(isVisible: boolean): void {
    this.projectsPageFacade.toggleCreateProjectDrawer$.next(isVisible);
  }
}
