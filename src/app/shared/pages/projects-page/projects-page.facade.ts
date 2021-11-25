import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateProject } from '../../models/CreateProject';
import { Project } from '../../models/Project';
import { QueryParams } from '../../services/api.service';
import { ProjectsService } from '../../services/projects.service';
import { ProjectsQueries } from './projects-page.component';

@Injectable()
export class ProjectsPageFacade {
  projectDetails$ = new Subject<Project>();
  toggleCreateProjectDrawer$: Subject<boolean> = new Subject<boolean>();
  // createProjectLoading$: BehaviorSubject<boolean> =
  //   new BehaviorSubject<boolean>(false);

  ProjectsList$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(
    []
  );

  constructor(
    private projectsService: ProjectsService,
    private message: NzMessageService
  ) {}

  getProjectsList(filters?: ProjectsQueries): void {
    const skills = filters?.primary?.map((skill) => ({
      property: skill,
      value: `primarySkills/any(p: p/name eq '${skill}')`,
    }));
    const status = { property: filters?.status, value: filters?.status };
    const searchText = {
      property: filters?.query,
      value: `contains(tolower(name), '${filters?.query}')`,
    };

    const orderby = filters?.orderBy
      ? {
          names: [filters?.orderBy?.property],
          order: filters?.orderBy?.order,
        }
      : { names: ['StartDate'], order: 'desc' };

    const filter = [skills, status, searchText];

    this.projectsService
      .getProjects(<QueryParams>{
        odata: {
          orderby,
          filter,
        },
      })
      .subscribe((projects) => {
        this.ProjectsList$.next(projects);
      });
  }

  getCreateProjectData$(): Observable<CreateProject> {
    return this.projectsService.getCreateProjectData();
  }

  createProject$(project: Project): Observable<Project> {
    return this.projectsService.createProject$(project);
  }

  editProject$(project: Project): Observable<Project> {
    return this.projectsService.editProject$(project);
  }

  deleteProject$(id: string): Observable<void> {
    return this.projectsService.deleteProject$(id);
  }

  prepareProjectForCreation(
    formValues: any,
    primarySkillsMap: Map<string, FormGroup>
  ): Project {
    const { dates, registrationDates, ...restForm } = formValues;

    return {
      ...restForm,
      startDate: dates[0],
      endDate: dates[1],
      startRegistrationDate: registrationDates[0],
      endRegistrationDate: registrationDates[1],
      primarySkills: Array.from(primarySkillsMap.entries()).map((el) => ({
        id: el[0],
        ...el[1].value,
      })),
    };
  }
}

//for search
//contains(tolower(name), 'search')
