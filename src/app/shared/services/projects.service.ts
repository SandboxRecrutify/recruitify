import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProject } from '../models/CreateProject';
import { ApiService } from './api.service';

@Injectable()
export class ProjectsService extends ApiService<Project> {
  constructor(http: HttpClient) {
    super(http)
  }

  getProjects() {
    // return super.readData<Project[]>('project');
    return super.readData<Project[]>('assets/projects.json');
  }

  //get create project modal data
  getCreateProjectData(): Observable<CreateProject> {
    return this.readData<CreateProject>('assets/createProject.json');
  }
}
