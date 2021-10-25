import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { CreateProject } from '../../models/CreateProject';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnChanges {
  @Input() isVisible!: boolean;
  @Output() onOk = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  data!: CreateProject;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {}

  handleOk(): void {
    // this.isVisible = !this.isVisible;
    // this.onOk.emit();
    this.submitForm();
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  submitForm() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        console.log(this.form.controls[i].valid, this.form.controls[i].value);
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
    }
    // console.log(this.form.disable);
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.projectsService
      .getCreateProjectData()
      .subscribe((data) => (this.data = data));
    // init form
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      primarySkills: [[], [Validators.required]],
      dates: [[new Date(), new Date()], [Validators.required]],
      plannedCandidatesCount: [null, [Validators.required]],
      recruiters: [[], [Validators.required]],
      managers: [[], [Validators.required]],
      isActive: [false, []],
    });
  }

  ngOnChanges(): void {}
}
