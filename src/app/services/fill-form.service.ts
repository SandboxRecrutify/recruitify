import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Candidate } from "../shared/models/Candidate";

@Injectable()
export class FillFormServices{
    constructor (private httpClient: HttpClient){
    }

    addCandidate(candidate: Candidate): Observable<boolean>  {
        return of(true);
    }
}