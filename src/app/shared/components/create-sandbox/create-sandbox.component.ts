import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-sandbox',
  templateUrl: './create-sandbox.component.html',
  styleUrls: ['./create-sandbox.component.scss'],
})
export class CreateSandboxComponent implements OnInit {
  //staff groups
  groups: any[] = [
    { name: 'manager', staffs: [] },
    { name: 'recruiter', staffs: [] },
    { name: 'interviewer', staffs: [] },
    { name: 'mentor', staffs: [] },
  ];
  // staff array
  staffs: any[] = [
    { id: 1, group: 'manager', name: 'John Smith' },
    //make another 10  staff objects
    { id: 2, group: 'recruiter', name: 'John Smith' },
    { id: 3, group: 'interviewer', name: 'Joe white' },
    { id: 4, group: 'mentor', name: 'smigt Smith' },
    { id: 5, group: 'manager', name: 'joanna' },
    { id: 6, group: 'recruiter', name: 'Alina' },
    { id: 7, group: 'interviewer', name: 'Liza' },
    { id: 8, group: 'mentor', name: 'Alex' },
    { id: 9, group: 'manager', name: 'Sergei' },
    { id: 10, group: 'recruiter', name: 'Vladislav' },
    { id: 11, group: 'interviewer', name: 'Sonya' },
    { id: 12, group: 'mentor', name: 'Alice' },
    { id: 13, group: 'manager', name: 'Shaha' },
  ];
  // primarySkills
  tOptions: any[] = [
    { label: '.Net', value: '.net' },
    { label: 'JS', value: 'js' },
    { label: 'BA', value: 'ba' },
  ];
  isVisible = true;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // this.isVisible = !this.isVisible;
    this.submitForm();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
    }
    console.log(this.form.value);
  }

  ngOnInit(): void {
    //map staff to groups
    this.staffs.forEach((staff) => {
      this.groups.forEach((group) => {
        if (staff.group === group.name) {
          group.staffs.push(staff);
        }
      });
    });
    // init form
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      primarySkills: [[], [Validators.required]],
      dates: [[new Date(), new Date()], [Validators.required]],
      plannedCandidatesCount: [0, [Validators.required]],
      staffs: [[], [Validators.required]],
      isActive: ['', [Validators.required]],
    });
  }
}
