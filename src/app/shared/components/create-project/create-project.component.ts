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
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnChanges {
  @Input() isVisible!: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  data!: CreateProject;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private message: NzMessageService
  ) {}

  handleOk(): void {
    this.submitForm();
  }

  handleCancel(): void {
    this.onToggle.emit(false);
  }

  submitForm() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
      this.message.success('Project created successfully');
    }
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
      description: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnChanges(): void {}
}
