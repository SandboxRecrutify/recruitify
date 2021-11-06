import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatesPageFacade } from './candidates-page.facade';
import { UserService } from './../../services/user.service';
import { ProjectsPageFacade } from './../projects-page/projects-page.facade';
import { Candidate } from './../../models/Candidate';

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss'],
})
export class CandidatesPageComponent implements OnInit {
  searchValue = '';
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  drawerVisible = false;
  menuVisible = true;
  candidatesList: Candidate[] = [];
  currentProjectId!: string;
  currentProject: any;

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private projectsPageFacade: ProjectsPageFacade,
    private router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe(
      (params) => (this.currentProjectId = params.id)
    );

    this.projectsPageFacade.getProjectsList$().subscribe((response) => {
      this.currentProject = response.find(
        (project) => project.id === this.currentProjectId
      );
    });

    this.candidatesPageFacade.candidateList$.subscribe((response) => {
      this.candidatesList = response.filter((candidate: Candidate) => {
        let { projectResults } = candidate;
        return projectResults.some(
          (item) => item.projectId === this.currentProjectId
        );
      });
    });
  }

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
}
