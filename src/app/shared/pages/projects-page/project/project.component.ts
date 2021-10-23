import { Component, Input, OnInit } from '@angular/core';
import { paths } from 'src/app/app-routing.constants';
import {Router} from '@angular/router';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  cardIndex = 0;

  @Input() card!: Project;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showCandidates() {
    this.router.navigate([paths.candidates]);
  }
}