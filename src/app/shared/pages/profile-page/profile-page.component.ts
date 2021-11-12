import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { paths } from './../../../app-routing.constants';
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
  tabs = ['Recruiters', 'Mentors', 'Interviewers'];

  constructor(
    private profilePageFacade: ProfilePageFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goToCandidatesList() {
    this.router.navigate([paths.candidates]);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.profilePageFacade
        .getCandidateById$(params.id)
        .subscribe((candidate) => {
          this.candidate = candidate;
        });
    });
  }

  printCandidatePrimarySkills(candidate?: Candidate) {
    return candidate?.primarySkills
      .map((skill) => skill.primarySkillName)
      .join(' | ');
  }

  log(candidate?: Candidate) {
    console.log(candidate);
  }
}
