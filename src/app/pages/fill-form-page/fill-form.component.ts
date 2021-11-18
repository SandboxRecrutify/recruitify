import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EnumToArrayPipe } from 'src/app/shared/pipes/enumToArray.pipe';
import { FillFormFacade } from './fill-form.facade';
import { PrimarySkill } from 'src/app/shared/models/Project';


interface SelectTime {
  value:any;
  isSelected:boolean;
}

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss'],
  providers: [FillFormFacade, EnumToArrayPipe],
})
export class FillFormComponent implements OnInit {
  // addLinks: AddLinks[]; 
  showInputField: boolean;
  selectedTimes: SelectTime[];
  currentProjectSkills!: PrimarySkill[];
  validateForm!: FormGroup;
  englishLevel$: Observable<any>;
  primarySkills$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private fillFormFacade: FillFormFacade,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {
    this.selectedTimes = [
      {
        value: 9,
        isSelected: false,
      },
      {
        value: 10,
        isSelected: false,
      },
      {
        value: 11,
        isSelected: false,
      },
      {
        value: 12,
        isSelected: false,
      },
      {
        value: 13,
        isSelected: false,
      },
      {
        value: 14,
        isSelected: false,
      },
      {
        value: 15,
        isSelected: false,
      },
      {
        value: 16,
        isSelected: false,
      },
      {
        value: 17,
        isSelected: false,
      },
      {
        value: 18,
        isSelected: false,
      },
      {
        value: 19,
        isSelected: false,
      },
      // {
      //   value: 'Call me any time',
      //   isSelected: false,
      // }
    ]

    this.englishLevel$ = fillFormFacade.englishLevel$;
    fillFormFacade.englishLevel$.subscribe((next) => {
      console.log(next);
    });

    this.primarySkills$ = fillFormFacade.primarySkills$;

    this.showInputField = false;
  }

  submitForm() {
    console.log(this.selectedTimes);
    console.log(this.validateForm.value);
  }

  selectedTimeChange(event: Event, selectedTime: SelectTime){
    const index = this.selectedTimes.findIndex(x => x.value == selectedTime.value);
    this.selectedTimes[index].isSelected = !this.selectedTimes[index].isSelected;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      skype: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      this.projectsService.getProjectById(params.id).subscribe((response) => {
        this.currentProjectSkills = response.primarySkills;
      });
    });
  }
}
