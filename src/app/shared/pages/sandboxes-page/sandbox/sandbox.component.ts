import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Projects } from 'src/app/shared/models/Projects';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  cardIndex = 0;

  @Input() card!: Projects;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showCandidates() {
    this.router.navigate(['candidates']);
  }
}
