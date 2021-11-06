import { map } from 'rxjs/operators';
import { Candidate } from '../models/Candidate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const CANDIDATE_API = 'odata/Candidates';
@Injectable()
// export class CandidatesService extends ApiService {
//   constructor(private httpClient: HttpClient) {
//     super(httpClient, CANDIDATE_API, CandidatesService.name);
//   }

//   getCandidates(): Observable<Candidate[]> {
//     return super.get().pipe(map((d: any) => d.value));
//   }
// }
export class CandidatesService {
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http
      .get(
        'https://recruitifyexadel.herokuapp.com/odata/Candidates?$count=true'
      )
      .pipe(map((d: any) => d.value));
  }
}
