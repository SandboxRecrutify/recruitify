import { ProjectsService } from '../../services/projects.service';
import { Injectable } from '@angular/core';

@Injectable()

export class ProjectsPageFacade {
  constructor(private projectsService: ProjectsService) {}

  projectsList$ = this.projectsService.getProjects()
}
