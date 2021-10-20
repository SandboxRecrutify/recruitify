import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../sandboxes-list/sandboxes-list.component';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {

  @Input() card!: Card;

  constructor() {}

  ngOnInit(): void {}
}
