import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CandidateItem {
  name: string;
  location: string;
  skill: string;
  status: string;
  feedback1: number;
  feedback2: number;
}

@Injectable()

export class CandidateService {
  constructor(private candidates: HttpClient) { }

  getCandidates(): Observable<CandidateItem[]> {
    return this.candidates.get<CandidateItem[]>('assets/candidates.json')
  }
}
