import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-feedback-modal',
  templateUrl: './add-feedback-modal.component.html',
  styleUrls: ['./add-feedback-modal.component.scss'],
})
export class AddFeedbackModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() toggleModal = new EventEmitter<boolean>();
  constructor() {}

  onClose() {
    this.toggleModal.emit(false);
  }
  onSubmit() {
    // this.onClose()
  }
  ngOnInit(): void {}
}
