import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateProject } from '../../models/CreateProject';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';

@Injectable()
export class ProjectsPageFacade {
  projectDetails$ = new Subject<Project>();
  toggleCreateProjectDrawer$: Subject<boolean> = new Subject<boolean>();
  createProjectLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private projectsService: ProjectsService) {}

  getProjectsList$(): Observable<Project[]> {
    return this.projectsService.getProjects();
  }

  getCreateProjectData$(): Observable<CreateProject> {
    return this.projectsService.getCreateProjectData();
  }

  createProject(project: Project): void {
    this.createProjectLoading$.next(true);
    this.projectsService.createProject(project).subscribe(
      () => {
        this.createProjectLoading$.next(false);
      },
      () => {
        this.createProjectLoading$.next(false);
      }
    );
  }
}
