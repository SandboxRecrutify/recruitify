import { map, filter } from 'rxjs/operators';
import { Candidate } from '../models/Candidate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, QueryParams } from './api.service';

const CANDIDATE_API = '/Candidates';
@Injectable()
export class CandidatesService extends ApiService {
  constructor(private httpClient: HttpClient) {
    super(httpClient, CANDIDATE_API, CandidatesService.name);
  }

  getCandidates(filters: QueryParams): Observable<Candidate[]> {
    return super.get(filters).pipe(map((d: any) => d.value));
  }

  getCandidatesByProjectId(filters: QueryParams): Observable<Candidate[]> {
    return super.get(filters).pipe(map((d: any) => d.value));
  }

  createCandidate$(
    candidate: Candidate,
    projectId: string
  ): Observable<Candidate> {
    return super.post({ path: `?projectId=${projectId}` }, candidate);
  }
}
