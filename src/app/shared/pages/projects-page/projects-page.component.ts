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
  isFiltersVisible: boolean = false;
  searchText: string = '';

  projects: Project[] = [];
  projects$: Observable<Project[]>;

  constructor(private projectsPageFacade: ProjectsPageFacade) {
    this.projects$ = this.projectsPageFacade.getProjectsList$();
  }

  ngOnInit(): void {
    this.projects$.subscribe((response) => (this.projects = response));
  }

  toggleFiltersVisible(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }

  handleToggle(isVisible: boolean): void {
    this.projectsPageFacade.toggleCreateProjectDrawer$.next(isVisible);
  }
}
