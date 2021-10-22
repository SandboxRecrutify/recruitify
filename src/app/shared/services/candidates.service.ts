import { Candidate } from '../models/Candidate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class CandidatesService {
  constructor(private candidates: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.candidates.get<Candidate[]>('assets/candidates.json')
  }
}
