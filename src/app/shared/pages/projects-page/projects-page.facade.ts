import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateProject } from '../../models/CreateProject';
import { QueryParams } from '../../services/api.service';
import { Project, StaffRole } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ProjectsFilters } from './project-filters/project-filters.component';
import { ProjectsQueries } from './projects-page.component';
import { filter } from 'rxjs/operators';

@Injectable()
export class ProjectsPageFacade {
  projectDetails$ = new Subject<Project>();
  toggleCreateProjectDrawer$: Subject<boolean> = new Subject<boolean>();
  createProjectLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  deleteProjectLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  ProjectsList$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(
    private projectsService: ProjectsService,
    private message: NzMessageService
  ) {}

  getProjectsList(filters?: ProjectsQueries): void {
    const skills = filters?.primary?.map((skill) => ({
      property: skill,
      value: `primarySkills/any(p: p/name eq '${skill}')`,
    }));
    const status = { property: filters?.status, value: filters?.status};
    const searchText = {
      property: filters?.query,
      value: `contains(tolower(name), '${filters?.query}')`,
    };

    const orderby = filters?.orderBy
      ? {
          names: [filters?.orderBy?.property],
          order: filters?.orderBy?.order,
        }
      : {};

    const filter = [skills, status, searchText];

    this.projectsService.getProjects(<QueryParams>{
      odata: {
        orderby,
        filter
      },
    }).subscribe((projects) => {
      this.ProjectsList$.next(projects);
    });
  }

  getCreateProjectData$(): Observable<CreateProject> {
    return this.projectsService.getCreateProjectData();
  }

  createProject(project: Project): void {
    // TODO move it to componenet
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
    // TODO move it to componenet
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
    // TODO move it to componenet
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

  prepareProjectForCreation(
    formValues: any,
    staff: StaffRole,
    primarySkillsMap: Map<string, FormGroup>
  ): Project {
    const { dates, registrationDates, ...restForm } = formValues;

    return {
      ...restForm,
      startDate: dates[0],
      endDate: dates[1],
      registrationStartDate: registrationDates[0],
      registrationEndDate: registrationDates[1],
      managers: staff.managers.filter((manager) =>
        formValues.managers.includes(manager.userId)
      ),
      recruiters: staff.recruiters.filter((recruiter) =>
        formValues.recruiters.includes(recruiter.userId)
      ),
      interviewers: staff.interviewers.filter((interviewer) =>
        formValues.interviewers.includes(interviewer.userId)
      ),
      mentors: staff.mentors.filter((mentor) =>
        formValues.mentors.includes(mentor.userId)
      ),
      primarySkills: Array.from(primarySkillsMap.entries()).map((el) => ({
        id: el[0],
        ...el[1].value,
      })),
    };
  }
}

//for search
//contains(tolower(name), 'search')
