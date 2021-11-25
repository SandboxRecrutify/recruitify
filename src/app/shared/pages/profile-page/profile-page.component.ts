import { CandidateProjectResults } from './../../models/CandidateProjectResults';
import { Project } from 'src/app/shared/models/Project';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesPageFacade } from '../candidates-page/candidates-page.facade';
import { Candidate } from './../../models/Candidate';
import { ProfilePageFacade } from './profile-page.facade';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  animations: [
    trigger('showPage', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translate(0%' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class ProfilePageComponent implements OnInit {
  candidate: Candidate | undefined = undefined;
  projectLanguages: string[] = [];
  englishLvls: string[] = [];
  candidateStatuses: string[] = [];
  currentProjectId: string = '';
  prevProjects: any[] = [];
  isLoading = false;

  candidatesCurrentProject!: any;

  constructor(
    private profilePageFacade: ProfilePageFacade,
    private router: Router,
    private route: ActivatedRoute,
    private candidatesFacade: CandidatesPageFacade
  ) {
    this.candidateStatuses = this.candidatesFacade.candidateStatuses;
    this.projectLanguages = this.candidatesFacade.projectLanguages;
    this.englishLvls = this.candidatesFacade.englishLvls;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentProjectId = params.projectId;
      this.isLoading = true;
      this.profilePageFacade
        .getCandidateById$(params.id, params.projectId)
        .subscribe(
          (candidate) => {
            this.isLoading = false;
            this.candidate = candidate;
            console.log(candidate);
            this.candidatesCurrentProject = candidate.projectResults.find(
              (project) => {
                return project.projectId === this.currentProjectId;
              }
            );
            console.log(this.candidatesCurrentProject);
          },
          () => {
            this.isLoading = false;
          }
        );
      this.profilePageFacade
        .getPrevProjects$(params.id)
        .subscribe((prevProjects) => {
          this.prevProjects = prevProjects;
        });
    });
  }

  printCandidatePrimarySkills(candidate?: Candidate) {
    // return candidate?.primarySkills.map((skill) => skill.name).join(' | ');
    // return candidate?.projectResults.map((skill) => console.log(skill.name));
  }

  getTestResult() {
    return (
      this.candidate?.projectResults[0].feedbacks.find((feedback) => {
        //feedback type 0 is test result
        return feedback.type === 0;
      })?.rating || 'none'
    );
  }
}
