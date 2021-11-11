import { ProjectsService } from '../../services/projects.service';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Project } from '../../models/Project';
import { ProjectsFilters } from './project-filters/project-filters.component';

@Injectable()
export class ProjectsPageFacade {
  constructor(private projectsService: ProjectsService) {}

  getProjectsList$(): Observable<Project[]> {
    return this.projectsService.getProjects();
  }
  projectDetails$ = new Subject<Project>();
  toggleCreateProjectDrawer$: Subject<boolean> = new Subject<boolean>();
}

// export interface ProjectsFilters {
//   status: string;
//   primary: string[];
//   orderBy: ProjectsOrderBy
// }


// interface QueryParams {
//   path?: string
//   odata?: OData;
//   body?: any;
//   mock?: string;
// }
