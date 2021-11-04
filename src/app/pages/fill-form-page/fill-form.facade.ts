import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { FillFormServices } from "src/app/services/fill-form.service";
import { Candidate } from "src/app/shared/models/Candidate";
import { EnglishLevel } from "src/app/shared/models/EnglishLevel";

@Injectable()
export class FillFormFacade{
    constructor(private fillFormServices: FillFormServices){
    }

    addCandidate(candidate: Candidate): Observable<boolean>  {
        return this.fillFormServices.addCandidate(candidate);
    }

    get englishLevel$(): Observable<any>{
        return of(Object.entries(EnglishLevel))
    }
}