import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FillFormServices } from 'src/app/services/fill-form.service';
import { Candidate } from 'src/app/shared/models/Candidate';
import { EnglishLevel } from 'src/app/shared/models/EnglishLevel';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Injectable()
export class FillFormFacade {
  primarySkills$!: Observable<any>;
  constructor(
    private fillFormServices: FillFormServices,
    private projectsService: ProjectsService
  ) {}

  // addCandidate(candidate: Candidate): Observable<boolean> {
  //   return this.fillFormServices.addCandidate(candidate);
  // }

  get englishLevel$(): Observable<any> {
    return of(Object.entries(EnglishLevel));
  }

  getPrimarySkills$(id: string): Observable<any> {
    this.projectsService.getProjectById(id);
    return of([
      {
        id: 'aeb0e468-3774-11ec-83d4-97dbf3c3f8eb',
        name: '.Net',
        description: 'OOP, Design patterns, SQL, ASP.NET',
        testLink: 'https://exadel.com/tests/net',
      },
      {
        id: '9ff9ab3e-3775-11ec-92f5-134491be8f5a',
        name: 'QA',
        description: 'CSS, HTML, Java Script',
        testLink: 'https://exadel.com/tests/qa',
      },
    ]);
  }
}
