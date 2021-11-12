import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  deleteProjectLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private projectsService: ProjectsService,
    private message: NzMessageService
  ) {}

  getProjectsList$(): Observable<Project[]> {
    return this.projectsService.getProjects();
  }

  getCreateProjectData$(): Observable<CreateProject> {
    return this.projectsService.getCreateProjectData();
  }

  createProject(project: Project): void {
    this.createProjectLoading$.next(true);
    this.projectsService.createProject$(project).subscribe(
      (value) => {
        console.log(value);
        this.message.success('Project created successfully!');
        this.createProjectLoading$.next(false);
      },
      () => {
        this.message.error('Something went wrong!');
        this.createProjectLoading$.next(false);
      }
    );
  }
  editProject(project: Project): void {
    this.createProjectLoading$.next(true);
    this.projectsService.editProject$(project).subscribe(
      (value) => {
        console.log(value);
        this.message.success('Project updated successfully!');
        this.createProjectLoading$.next(false);
      },
      () => {
        this.message.error('Something went wrong!');
        this.createProjectLoading$.next(false);
      }
    );
  }
  deleteProject(id: string) {
    this.deleteProjectLoading$.next(true);
    this.projectsService.deleteProject$(id).subscribe(
      (value) => {
        console.log(value);
        this.message.success('Project deleted successfully!');
        this.deleteProjectLoading$.next(false);
      },
      () => {
        this.message.error('Something went wrong!');
        this.deleteProjectLoading$.next(false);
      }
    );
  }
}
