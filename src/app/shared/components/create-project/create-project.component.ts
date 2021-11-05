import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';
import { CreateProject } from '../../models/CreateProject';
import { PrimarySkill } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  primarySkills: Map<string, FormGroup> = new Map();
  isPrimarySkillsTouched: boolean = false;
  data: CreateProject | undefined;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private message: NzMessageService
  ) {}

  onPrimarySkillToggle(value: boolean, primarySkill: PrimarySkill) {
    this.isPrimarySkillsTouched = true;
    if (value) {
      this.primarySkills.set(
        primarySkill.id!,
        this.fb.group({
          name: [primarySkill.name, [Validators.required]],
          description: [primarySkill.description, [Validators.required]],
          testLink: [primarySkill.testLink, [Validators.required]],
        })
      );
    } else {
      this.primarySkills.delete(primarySkill.id!);
    }
  }

  onPrimarySkillRemove(id: string) {
    this.primarySkills.delete(id!);
    this.data?.primarySkills.find((skill) => {
      if (skill.id === id) {
        skill.checked = false;
        return true;
      }
      return false;
    });
  }

  handleOk(): void {
    this.submitForm();
  }
  handleCancel(): void {
    this.form.reset();
    this.primarySkills.clear();
    this.isPrimarySkillsTouched = false;
    this.onToggle.emit(false);
  }

  submitForm() {
    this.isPrimarySkillsTouched = true;
    let isPrimarySkillsValid = false;
    if (this.primarySkills.size > 0) {
      isPrimarySkillsValid = Array.from(this.primarySkills.values()).every(
        (skill) => skill.valid
      );
    }
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid && isPrimarySkillsValid) {
      this.message.success('Project created successfully');
    }
  }

  ngOnInit(): void {
    // subscribe to primary skills
    this.projectsService.getCreateProjectData().subscribe((data) => {
      data.primarySkills = data.primarySkills.map((skill) => ({
        ...skill,
        checked: false,
      }));
      this.data = data;
    });

    // init form
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(environment.CREATE_PROJECT_NAME_LENGTH),
        ],
      ],
      dates: [, [Validators.required]],
      plannedCandidatesCount: [null, [Validators.required]],
      isActive: [true, []],
      description: [
        '',
        [
          Validators.maxLength(
            environment.CREATE_PROJECT_NAME_DESCRIPTION_LENGTH
          ),
        ],
      ],
      recruiters: [[], [Validators.required]],
      managers: [[], [Validators.required]],
      interviewers: [[], [Validators.required]],
      mentors: [[], [Validators.required]],
    });
  }
}
