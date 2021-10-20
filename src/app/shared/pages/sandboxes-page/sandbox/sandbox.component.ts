import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../sandboxes-list/sandboxes-list.component';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  index1 = 0;
  index2 = 0;

  showCandidates() {
    console.log('candidates page')
  }
  @Input() card!: Card;

  constructor() {}

  ngOnInit(): void {}
}
