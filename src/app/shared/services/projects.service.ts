import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProject } from '../models/CreateProject';

@Injectable()
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('assets/projects.json');
  }

  //get create project modal data
  getCreateProjectData(): Observable<CreateProject> {
    return this.http.get<CreateProject>('assets/createProject.json');
  }
}
