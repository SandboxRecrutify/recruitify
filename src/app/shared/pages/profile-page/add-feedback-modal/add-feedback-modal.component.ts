import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-feedback-modal',
  templateUrl: './add-feedback-modal.component.html',
  styleUrls: ['./add-feedback-modal.component.scss'],
})
export class AddFeedbackModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() toggleModal = new EventEmitter<boolean>();
  @Input() editing: boolean = false;

  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      rating: new FormControl(null, Validators.required),
      textFeedback: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
      feedbackType: new FormControl('', Validators.required),
    });
  }

  onClose() {
    this.toggleModal.emit(false);
  }
  onSubmit() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

    // this.onClose()
  }
  ngOnInit(): void {}
}
