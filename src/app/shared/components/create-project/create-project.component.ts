import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { paths } from 'src/app/app-routing.constants';
import { environment } from 'src/environments/environment';
import { CreateProject } from '../../models/CreateProject';
import { PrimarySkill } from '../../models/Project';
import { ProjectsPageFacade } from '../../pages/projects-page/projects-page.facade';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  primarySkills: Map<string, FormGroup> = new Map();
  isPrimarySkillsTouched: boolean = false;
  data: CreateProject | undefined;
  form!: FormGroup;
  editingId: string | undefined;
  isLoading = false;
  isDeleting = false;

  private subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private projectsFacade: ProjectsPageFacade,
    private route: ActivatedRoute,
    private router: Router
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

  handleCancel(): void {
    this.form.reset();
    this.form.patchValue({ isActive: true });
    this.primarySkills.clear();
    this.isPrimarySkillsTouched = false;
    this.projectsFacade.toggleCreateProjectDrawer$.next(false);
    this.router.navigate([paths.projects]);
    if (this.data) {
      this.data.primarySkills = this.data.primarySkills.map((skill) => {
        skill.checked = false;
        return skill;
      });
    }
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
      const toSend = this.projectsFacade.prepareProjectForCreation(
        this.form.value,
        this.data?.staffGroup!,
        this.primarySkills
      );
      if (this.editingId) {
        toSend.id = this.editingId;
        this.projectsFacade.editProject(toSend);
      } else {
        this.projectsFacade.createProject(toSend);
      }
    }
  }
  /// delete project
  deleteProject() {
    console.log('deleted');
    // this.projectsFacade.deleteProject(this.editingId!);
    // this.handleCancel();
  }

  ngOnInit(): void {
    //subscribe to projects service toggle this component
    this.subscriptions.push(
      this.projectsFacade.toggleCreateProjectDrawer$.subscribe((visible) => {
        this.isVisible = visible;
      })
    );

    // subscribe to primary skills and staff
    this.subscriptions.push(
      this.projectsFacade.getCreateProjectData$().subscribe((data) => {
        data.primarySkills = data.primarySkills.map((skill) => ({
          ...skill,
          checked: false,
        }));
        this.data = data;
      })
    );

    // init form
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(environment.CREATE_PROJECT_NAME_LENGTH),
        ],
      ],
      dates: [[], [Validators.required]],
      registrationDates: [[], [Validators.required]],
      plannedApplicationsCount: [null, [Validators.required]],
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

    // subscribe to query params data changes
    this.subscriptions.push(
      this.route.queryParams.subscribe((value) => {
        this.editingId = value.editingId;
      })
    );

    // subscribe to editing data changes
    this.subscriptions.push(
      this.projectsFacade.projectDetails$.subscribe((project) => {
        if (project) {
          this.form.patchValue({
            ...project,
            dates: [new Date(project.startDate), new Date(project.endDate)],
            registrationDates: [
              new Date(project.startRegistrationDate),
              new Date(project.endRegistrationDate),
            ],
            managers: project.managers.map((manager) => manager.userId),
            interviewers: project.interviewers.map(
              (interviewer) => interviewer.userId
            ),
            recruiters: project.recruiters.map((recruiter) => recruiter.userId),
            mentors: project.mentors.map((mentor) => mentor.userId),
          });
          project.primarySkills.forEach((skill) => {
            this.primarySkills.set(
              skill.id!,
              this.fb.group({
                name: [skill.name, [Validators.required]],
                description: [skill.description, [Validators.required]],
                testLink: [skill.testLink, [Validators.required]],
              })
            );
          });
          if (this.data) {
            this.data.primarySkills = this.data.primarySkills.map((skill) => {
              project.primarySkills.forEach((item) => {
                if (item.id === skill.id) {
                  skill.checked = true;
                }
              });
              return skill;
            });
          }
        }
      })
    );
    // subscribe to loadings
    this.subscriptions.push(
      this.projectsFacade.createProjectLoading$.subscribe((loading) => {
        this.isLoading = loading;
      })
    );
    this.subscriptions.push(
      this.projectsFacade.deleteProjectLoading$.subscribe((deleting) => {
        this.isDeleting = deleting;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
