import { paths } from './../../../app-routing.constants';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private router: Router) { }

  goToCandidatesList() {
    this.router.navigate([paths.candidates])
  }

  ngOnInit(): void {
  }

}
