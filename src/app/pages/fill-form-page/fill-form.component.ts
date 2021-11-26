import { NzMessageService } from 'ng-zorro-antd/message';
import { CandidatesService } from './../../shared/services/candidates.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { EnumToArrayPipe } from 'src/app/shared/pipes/enumToArray.pipe';
import { FillFormFacade } from './fill-form.facade';
import { PrimarySkill } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss'],
  providers: [FillFormFacade, EnumToArrayPipe],
})
export class FillFormComponent implements OnInit {
  bestTimeToContact: number[] = this.fillFormFacade.bestTimeToContact;
  currentProjectSkills!: PrimarySkill[];
  currnetProjectId!: string;
  englishLevel$: Observable<any>;

  candidateForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    skype: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
    location: this.fb.group({
      city: ['', Validators.required],
      country: ['', Validators.required],
    }),
    englishLevel: ['', Validators.required],
    projectLanguage: ['', Validators.required],
    primarySkill: ['', Validators.required],
    goingToExadel: ['', Validators.required],
    additionalInfo: [''],
    additionalQuestions: [''],
    currentJob: [''],
    certificates: [''],
    bestTimeToConnect: [[], Validators.required],
    contacts: this.fb.group({
      contact0: [''],
      contact1: [''],
      contact2: [''],
      contact3: [''],
      contact4: [''],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private fillFormFacade: FillFormFacade,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private candidatesService: CandidatesService,
    private message: NzMessageService
  ) {
    this.englishLevel$ = fillFormFacade.englishLevel$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currnetProjectId = params.id;
      this.projectsService.getProjectById(params.id).subscribe((response) => {
        this.currentProjectSkills = response.primarySkills;
      });
    });
  }

  contactFields: number[] = [];

  onAddClick() {
    if (this.contactFields.length < 5) {
      this.contactFields.push(1);
    }
  }

  submitForm() {
    const candidateToSend = this.fillFormFacade.createCandidateObjToSend(
      this.candidateForm
    );
    // for (const i in this.candidateForm.controls) {
    //   if (this.candidateForm.controls.hasOwnProperty(i)) {
    //     this.candidateForm.controls[i].markAsDirty();
    //     this.candidateForm.controls[i].updateValueAndValidity();
    //   }
    // }

    if (this.candidateForm.valid) {
      this.candidatesService
        .createCandidate$(candidateToSend, this.currnetProjectId)
        .subscribe(
          (response) => {
            console.log(response);
            this.message.success(
              'Thanks! Our recruiter will contact you shortly!'
            );
          },
          () => {
            this.message.error('Something went wrong :(');
          }
        );
      this.candidateForm.reset();
    }
  }
}
