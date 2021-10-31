import { ProjectsService } from '../../services/projects.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';

@Injectable()
export class ProjectsPageFacade {
  constructor(private projectsService: ProjectsService) {}

  getProjectsList$(): Observable<Project[]> {
    return this.projectsService.getProjects();
  }
}
