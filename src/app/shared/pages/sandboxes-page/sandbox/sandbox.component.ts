import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../sandboxes-list/sandboxes-list.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  index1 = 0;
  index2 = 0;

  @Input() card!: Card;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showCandidates() {
    this.router.navigate(['candidates']);
  }
}
