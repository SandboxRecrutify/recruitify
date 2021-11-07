import { ProfilePageFacade } from './profile-page.facade';
import { paths } from './../../../app-routing.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

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
  candidate: any = {};

  constructor(
    private profilePageFacade: ProfilePageFacade,
    private toCandidatesPage: Router,
    private router: ActivatedRoute
  ) {}

  tabNames = ['Recruiters', 'Mentors', 'Interviewers'];
  tabs = [1, 2, 3];

  goToCandidatesList() {
    this.toCandidatesPage.navigate([paths.candidates]);
  }

  ngOnInit(): void {
    this.profilePageFacade.candidatesList$.subscribe((response: any) => {
      this.router.params.subscribe((params) => {
        this.candidate = response.find((item: any) => item.id === params.id);
      });
    });
  }
}
