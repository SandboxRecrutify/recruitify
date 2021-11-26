import { NzMessageService } from 'ng-zorro-antd/message';
import { Candidate } from './../../shared/models/Candidate';
import { CandidatesService } from './../../shared/services/candidates.service';
import { CandidateService } from './../../shared/services/candidate.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  listTime: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  currentProjectSkills!: PrimarySkill[];
  currnetProjectId!: string;
  englishLevel$: Observable<any>;
  candidateToSend!: Candidate;

  constructor(
    private fb: FormBuilder,
    private fillFormFacade: FillFormFacade,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private candidatesService: CandidatesService,
    private message: NzMessageService
  ) {
    this.englishLevel$ = fillFormFacade.englishLevel$;
    fillFormFacade.englishLevel$.subscribe((next) => {
      console.log(next);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currnetProjectId = params.id;
      this.projectsService.getProjectById(params.id).subscribe((response) => {
        this.currentProjectSkills = response.primarySkills;
      });
    });
  }

  candidateForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contacts: this.fb.group({
      type: ['Skype'],
      value: ['', Validators.required],
    }),
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
  });

  submitForm() {
    if (this.candidateForm.valid) {
      this.candidateToSend = {
        ...this.candidateForm.value,
        contacts: [this.candidateForm.value.contacts],
      };

      console.log(this.candidateToSend);
    }

    this.candidatesService
      .createCandidate$(this.candidateToSend, this.currnetProjectId)
      .subscribe(
        (response) => {
          console.log(response);
          this.message.success('Success!');
        },
        () => {
          this.message.error('Something went wrong!');
        }
      );

    this.candidateForm.reset();
  }
}
