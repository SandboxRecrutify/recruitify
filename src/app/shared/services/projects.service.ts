import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/internal/operators';
import { filter, map } from 'rxjs/operators';
import { CreateProject } from '../models/CreateProject';
import { Project } from '../models/Project';
import { PrimarySkill } from './../models/Project';
import { ApiService } from './api.service';

const API_PATH = '/Projects';

@Injectable()
export class ProjectsService extends ApiService {
  constructor(http: HttpClient) {
    super(http, API_PATH, ProjectsService.name);
  }
  getProjects(): Observable<Project[]> {
    return super.get({ odata: {} }).pipe(map((d: any) => d.value));
    // return super.get({mock: '/projects.json'})
    //   return super.get({ odata: {'filter': "isActive",
    //   'orderby': 'name', 'skip': 1
    // } }).pipe(map((d: any) => d.value));
  }

  //get create project modal data
  getCreateProjectData(): Observable<CreateProject> {
    return super.get<CreateProject>({ path: '/primary_skills_and_staff' });
  }

  getPrimarySkills(): Observable<PrimarySkill[]> {
    return super.get<PrimarySkill[]>({ path: '/primary_skills' });
  }

  getProjectById(projectId: string): Observable<Project> {
    return super.get<Project[]>({ mock: '/projects.json' }).pipe(
      flatMap((projects) => projects),
      filter((project) => project.id === projectId)
    );
  }

  createProject(project: Project): Observable<Project> {
    return super.post<any, Project>({ path: '' }, project);
  }
}
