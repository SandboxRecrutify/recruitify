import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { paths } from 'src/app/app-routing.constants';
import { Candidate } from './../../models/Candidate';
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
  setOfCheckedId = new Set<string>();
  drawerVisible = false;
  menuVisible = true;
  isLoading = false;

  candidatesList: Candidate[] = [];
  currentProjectId = '';
  currentProjectName: string = '';

  constructor(
    private candidatesPageFacade: CandidatesPageFacade,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentProjectId = params.id;
      if (params.id) {
        this.isLoading = true;
        this.candidatesPageFacade.getProjectCandidates$(params.id).subscribe(
          (candidates) => {
            this.candidatesList = candidates;
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );

        this.candidatesPageFacade
          .getProjectData$(params.id)
          .subscribe((project) => {
            this.currentProjectName = project.name;
          });
      } else {
        this.router.navigate([paths.fof]);
        this.message.error('Project not found!');
      }
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
