import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectsPageFacade } from './projects-page.facade';
import { ProjectsFilters } from './project-filters/project-filters.component';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  isFiltersVisible: boolean = false;
  searchText: string = '';

  projects: Project[] = [];

  constructor(private projectsPageFacade: ProjectsPageFacade) {}

  ngOnInit(): void {
    this.projectsPageFacade.getProjectsList$().subscribe((projects) => {
      this.projects = projects;
    });
  }

  toggleFiltersVisible(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }

  handleToggle(isVisible: boolean): void {
    this.projectsPageFacade.toggleCreateProjectDrawer$.next(isVisible);
  }

  applyProjectsFilters($event: ProjectsFilters) {
    this.projectsPageFacade.getProjectsList$($event).subscribe((projects) => {
      this.projects = projects;
    });
  }

  onSearchChange($event: string) {
    console.log($event);
  }
}
