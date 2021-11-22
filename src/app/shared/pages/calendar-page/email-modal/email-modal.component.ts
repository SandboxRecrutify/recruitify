import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss'],
})
export class EmailModalComponent implements OnInit {
  @Input() isModalVisible!: boolean;

  constructor() {}

  ngOnInit(): void {}

  handleOk(): void {
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
