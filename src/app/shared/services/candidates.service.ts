import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Candidate {
  name: string;
  location: string;
  skill: string;
  status: string;
  feedback1: number;
  feedback2: number;
}

@Injectable()

export class CandidatesService {
  constructor(private candidates: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.candidates.get<Candidate[]>('assets/candidates.json')
  }
}
