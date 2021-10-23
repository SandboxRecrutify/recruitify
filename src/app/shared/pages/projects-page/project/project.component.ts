import { Component, Input, OnInit } from '@angular/core';
import { paths } from 'src/app/app-routing.constants';
import {Router} from '@angular/router';
import { Projects } from 'src/app/shared/models/Projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  cardIndex = 0;

  @Input() card!: Projects;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showCandidates() {
    this.router.navigate([paths.candidates]);
  }
}
