import { Projects } from '../models/Projects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()

export class ProjectsService {
  constructor(private projects: HttpClient) { }

  getProjects(): Observable<Projects[]> {
    return this.projects.get<Projects[]>('assets/projects.json')
  }
}
