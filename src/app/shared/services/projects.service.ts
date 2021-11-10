import { PrimarySkill } from './../models/Project';
import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProject } from '../models/CreateProject';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

const API_PATH = '/Projects';

@Injectable()
export class ProjectsService extends ApiService {
  constructor(http: HttpClient) {
    super(http, API_PATH, ProjectsService.name);
  }

  getProjects(): Observable<Project[]> {
     return super.get({ odata: {}}).pipe(map((d: any) => d.value));
    // return super.get({mock: '/projects.json'})
  //   return super.get({ odata: {'filter': "isActive",
  //   'orderby': 'name', 'skip': 1
  // } }).pipe(map((d: any) => d.value));
  }

  getProjectById(projectId: string): Observable<Project> {
    return super.get({ id: '' });
  }
  //get create project modal data
  getCreateProjectData(): Observable<CreateProject> {
    return super.get<CreateProject>({ mock: '/createProject.json' });
  }

  getPrimarySkills(): Observable<PrimarySkill[]> {
    return super.get<PrimarySkill[]>({ endpoint: '/primary_skills' });
  }
}
