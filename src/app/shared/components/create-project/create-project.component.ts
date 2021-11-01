import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { __values } from 'tslib';
import { CreateProject } from '../../models/CreateProject';
import { PrimarySkill } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { createProject } from '../../shared.config';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  primarySkills: PrimarySkill[] = [];
  isPrimarySkillsValid: boolean = false;
  isPrimarySkillsTouched: boolean = false;
  data!: CreateProject;
  form!: FormGroup;

  primarySkillsValidity$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private message: NzMessageService
  ) {}

  private checkPrimarySkillsValidity(): boolean {
    if (this.primarySkills.length === 0) {
      return false;
    }
    return this.primarySkills.every((skill) => {
      return skill.name && skill.description && skill.link;
    });
  }

  onPrimarySkillAdd() {
    this.isPrimarySkillsTouched = true;
    this.primarySkills.push({ name: '', description: '', link: '' });
  }

  onPrimarySkillChange(values: PrimarySkill, index: number) {
    Object.assign(this.primarySkills[index], values);
  }

  handleOk(): void {
    this.submitForm();
  }
  onPrimarySkillRemove(index: number) {
    this.primarySkills.splice(index, 1);
  }
  handleCancel(): void {
    this.onToggle.emit(false);
  }

  submitForm() {
    // check if any of the primary skills is invalid
    this.isPrimarySkillsValid = this.checkPrimarySkillsValidity();
    console.log('is primary skills valid', this.isPrimarySkillsValid);
    this.primarySkillsValidity$.next(this.isPrimarySkillsValid);

    this.isPrimarySkillsTouched = true;
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (
      this.form.valid &&
      this.isPrimarySkillsValid &&
      this.primarySkills.length > 0
    ) {
      this.message.success('Project created successfully');
    }
    // console.log(this.form.value);
  }

  ngOnInit(): void {
    this.projectsService
      .getCreateProjectData()
      .pipe(tap((data) => console.log(data)))
      .subscribe((data) => (this.data = data));
    // init form
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(createProject.name.maxLength),
        ],
      ],
      dates: [createProject.dates.defaultValue, [Validators.required]],
      plannedCandidatesCount: [null, [Validators.required]],
      isActive: [createProject.isActive.defaultValue, []],
      description: [
        '',
        [Validators.maxLength(createProject.description.maxLength)],
      ],
      recruiters: [[], [Validators.required]],
      managers: [[], [Validators.required]],
      interviewers: [[], [Validators.required]],
      mentors: [[], [Validators.required]],
    });
  }
}
