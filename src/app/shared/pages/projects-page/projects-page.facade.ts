import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateProject } from '../../models/CreateProject';
import { Project } from '../../models/Project';
import { QueryParams } from '../../services/api.service';
import { ProjectsService } from '../../services/projects.service';
import { ProjectsFilters } from './project-filters/project-filters.component';

@Injectable()
export class ProjectsPageFacade {
  projectDetails$ = new Subject<Project>();
  toggleCreateProjectDrawer$: Subject<boolean> = new Subject<boolean>();
  createProjectLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private projectsService: ProjectsService) {}

  getProjectsList$(filters?: ProjectsFilters): Observable<Project[]> {
    const skills = filters?.primary.map((p) => {
      return {
        property: 'primarySkills',
        value: `/any(p: p/name eq '${p}')`,
        operator: '',
      }
    });
    // console.log(skills)
    const queryParams = filters
      ? <QueryParams>{
          odata: {
            orderby: {
              names: [filters.orderBy.property],
              order: filters.orderBy.order,
            },
            filter: skills
              // { property: filters.status, operator: '', value: '' },
          },
        }
      : { odata: {} };

    return this.projectsService.getProjects(queryParams);
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

//primarySkills/any(p: p/name eq 'Java')
// startDate asc  | desc
// isActive | not isActive

//for search
//contains(name, 'searchText')
