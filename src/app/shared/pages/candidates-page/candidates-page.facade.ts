import { Project } from 'src/app/shared/models/Project';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from './../../models/Candidate';
import { CandidatesService } from './../../services/candidates.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidatesPageFacade {
  englishLvls = [
    'Begginer',
    'Pre-Intermediate',
    'Intermediate',
    'Advanced',
    'Native',
  ];

  candidateList$ = this.candidatesService.getCandidates();
  currentProject!: Project[];
  currentProjectId!: string;

  constructor(
    private candidatesService: CandidatesService,
    private router: ActivatedRoute
  ) {}

  setCurrentProjetId() {
    this.router.params.subscribe(
      (params) => (this.currentProjectId = params.id)
    );
  }
}
