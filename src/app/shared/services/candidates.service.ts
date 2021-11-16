import { map } from 'rxjs/operators';
import { Candidate } from '../models/Candidate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const CANDIDATE_API = '/Candidates';
@Injectable()
export class CandidatesService extends ApiService {
  constructor(private httpClient: HttpClient) {
    super(httpClient, CANDIDATE_API, CandidatesService.name);
  }

  getCandidates(): Observable<Candidate[]> {
    return super.get({ odata: {} }).pipe(map((d: any) => d.value));
  }
  getCandidatesByProjectId(projectId: string): Observable<Candidate[]> {
    return super.get({ path: '/all/' + projectId });
  }
}
