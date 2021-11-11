import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../models/Candidate';
import { ApiService } from './api.service';

const CANDIDATE_API = '/candidates';
@Injectable()
export class CandidateService extends ApiService {
  constructor(private httpClient: HttpClient) {
    super(httpClient, CANDIDATE_API, CandidateService.name);
  }

  getCandiateById(id: string): Observable<Candidate> {
    return super.get({id: '/' + id});
  }
}
