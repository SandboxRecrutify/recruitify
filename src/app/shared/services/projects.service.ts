import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProject } from '../models/CreateProject';
import { ApiService } from './api.service';

const API_PATH = 'assets/';
@Injectable()
export class ProjectsService extends ApiService {
  constructor(http: HttpClient) {
    super(http, API_PATH, ProjectsService.name, true);
  }

  getProjects(): Observable<Project[]> {
    return super.get<Project[]>('projects.json');
  }

  //get create project modal data
  getCreateProjectData(): Observable<CreateProject> {
    return super.get<CreateProject>('createProject.json');
  }
}
