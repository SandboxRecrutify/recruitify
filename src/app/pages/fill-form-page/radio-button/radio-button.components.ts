import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  // styleUrls: ['./radio-button.component.scss']
})

export class AppRadioButtonComponent implements OnInit {
  @Input() title: string = "";
  @Input() options: string[] = [];

  constructor() { }

  ngOnInit(): void {

  }
}