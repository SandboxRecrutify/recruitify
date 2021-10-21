import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private candidates: HttpClient) { }

  getCandidates() {
    this.candidates.get('assets/candidates.json')
      .subscribe(response => {
        console.log(response)
      })
  }
}
