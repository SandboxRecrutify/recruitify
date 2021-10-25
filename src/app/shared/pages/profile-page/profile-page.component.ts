import { filter, map } from 'rxjs/operators';
import { ProfilePageFacade } from './profile-page.facade';
import { paths } from './../../../app-routing.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  candidate: any = {}

  constructor(private profilePageFacade: ProfilePageFacade, private toCandidatesPage: Router, private router: ActivatedRoute) {}

  goToCandidatesList() {
    this.toCandidatesPage.navigate([paths.candidates])
  }

  ngOnInit(): void {
    this.profilePageFacade.candidatesList$
      .subscribe(responce => {
        this.router.params.subscribe(params => {
          this.candidate = responce.find(item => item.id === params.id)
        })
      })
  }
}
