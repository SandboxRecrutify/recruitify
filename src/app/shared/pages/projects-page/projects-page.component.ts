import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectsPageFacade } from './projects-page.facade';
import { ProjectsFilters } from './project-filters/project-filters.component';
import { filter } from 'rxjs/operators';

export interface ProjectsQueries extends ProjectsFilters {
  query?: string;
}

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  isFiltersVisible: boolean = false;
  searchText: string = '';
  filters: any = {};

  projects: Project[] = [];

  constructor(public projectsPageFacade: ProjectsPageFacade) {}

  ngOnInit(): void {
    this.projectsPageFacade.getProjectsList();
  }

  toggleFiltersVisible(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }

  handleToggle(isVisible: boolean): void {
    this.projectsPageFacade.toggleCreateProjectDrawer$.next(isVisible);
  }

  applyProjectsFilters(filters: ProjectsFilters) {
    this.filters = { ...this.filters, ...filters };
    this.projectsPageFacade.getProjectsList(this.filters);
  }

  onSearchChange(search: ProjectsQueries) {
    this.filters = { ...this.filters, query: search };
    this.projectsPageFacade.getProjectsList(this.filters);
  }
}
