import { ProjectsPageFacade } from './../projects-page/projects-page.facade';
import { Project } from 'src/app/shared/models/Project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Candidate, CandidatesLocation } from './../../models/Candidate';
import { CandidatesPageFacade } from './candidates-page.facade';

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss'],
})
export class CandidatesPageComponent implements OnInit {
  searchValue = '';
  checked = false;
  indeterminate = false;
  drawerVisible = false;
  menuVisible = true;
  setOfCheckedId = new Set<string>();
  candidatesList: Candidate[] = [];

  currentProjectId = this.candidatesPageFacade.setCurrentProjetId;
  currentProject: any;

  candidateEnglishLvls = this.candidatesPageFacade.englishLvls;

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private projectsPageFacade: ProjectsPageFacade,
    private router: ActivatedRoute
  ) {}

  openDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }

  searchName() {
    this.candidatesList = this.candidatesList.filter(
      (candidate: Candidate) =>
        candidate.name.indexOf(this.searchValue) !== -1 ||
        candidate.surname.indexOf(this.searchValue) !== -1
    );
  }

  ngOnInit(): void {
    this.candidatesPageFacade.candidateList$.subscribe((response) => {
      this.candidatesList = response;
    });
    // let currentProjectId: string;
    // this.router.params.subscribe((params) => (currentProjectId = params.id));
    // this.projectsPageFacade.getProjectsList$().subscribe((response) => {
    //   this.currentProject = response.find(
    //     (project) => project.id === currentProjectId
    //   );
    // });
    // this.candidatesPageFacade.candidateList$.subscribe((response) => {
    //   this.candidatesList = response;
    // .filter((candidate: Candidate) => {
    //   let { projectResults } = candidate;
    //   return projectResults.some(
    //     (item) => item.projectId === currentProjectId
    //   );
    // });
    // });
  }
}
