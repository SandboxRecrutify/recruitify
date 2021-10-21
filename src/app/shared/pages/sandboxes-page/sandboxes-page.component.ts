import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandboxes-page',
  templateUrl: './sandboxes-page.component.html',
  styleUrls: ['./sandboxes-page.component.scss'],
})
export class SandboxesPageComponent implements OnInit {
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = !this.isVisible;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
