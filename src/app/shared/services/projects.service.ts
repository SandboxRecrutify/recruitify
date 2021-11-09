import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProject } from '../models/CreateProject';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';


const API_PATH = '/Projects'

@Injectable()
export class ProjectsService extends ApiService {
  constructor(http: HttpClient) {
    super(http, API_PATH, ProjectsService.name)
  }

  getProjects(): Observable<Project[]> {
      return super.get({mock: '/projects.json'})
      // return super.get({odata: {'orderby': 'name'}}).pipe(map((d:any) => d.value));

       }

  //get create project modal data
  getCreateProjectData(): Observable<CreateProject> {
   return super.get<CreateProject>({mock:'/createProject.json'});
  }
}
