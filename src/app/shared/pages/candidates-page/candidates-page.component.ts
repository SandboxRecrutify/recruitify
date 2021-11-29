import { CandidatesFilters } from './candidates-table/candidates-table.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { paths } from 'src/app/app-routing.constants';
import { Candidate } from './../../models/Candidate';
import { CandidatesPageFacade } from './candidates-page.facade';

export interface candidatesQueries extends CandidatesFilters {
  id?: string
  query?: string;
}
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

  filters: any = {}

  candidatesList: Candidate[] = [];
  currentProjectId = '';
  currentProjectName: string = '';

  constructor(
    public candidatesPageFacade: CandidatesPageFacade,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    // this.candidatesPageFacade.getAllCandidates()

    this.route.params.subscribe((params: Params) => {
      this.currentProjectId = params.id;
      if (params.id) {
        this.isLoading = true;
        this.candidatesPageFacade.getProjectCandidates$(<candidatesQueries>{
         id: params.id,
          }
        ).subscribe(
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
        this.isLoading = true;
        // this.router.navigate([paths.fof]);
        // this.message.error('Project not found!');
        this.candidatesPageFacade.candidatesList$.subscribe((response) => {
          this.candidatesList = response;
          this.isLoading = false;
        });
      }
    });
  }

  openDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }


  applyCandidatesFilters(filters: CandidatesFilters) {
    this.filters = { ...this.filters, ...filters};
    this.candidatesPageFacade.getAllCandidates(this.filters)
    // this.candidatesPageFacade.getProjectCandidates$(this.filters)
  }

  onSearchChange(search: candidatesQueries) {
    this.filters = { ...this.filters, query: search };
    this.candidatesPageFacade.getAllCandidates(this.filters)
  }

  onSearchClear() {
    this.searchValue = ''
    this.filters = { ...this.filters, query: this.searchValue };
    this.candidatesPageFacade.getAllCandidates(this.filters)
  }
}

