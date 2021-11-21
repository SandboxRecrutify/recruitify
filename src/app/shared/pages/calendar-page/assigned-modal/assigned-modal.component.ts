import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-modal',
  templateUrl: './assigned-modal.component.html',
  styleUrls: ['./assigned-modal.component.scss'],
})
export class AssignedModalComponent implements OnInit {
  @Input() isVisible!: any;
  @Input() clickedCandidate!: any;

  constructor() {}

  ngOnInit(): void {}

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
