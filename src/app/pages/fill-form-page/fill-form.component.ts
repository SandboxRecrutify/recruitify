import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EnumToArrayPipe } from 'src/app/shared/pipes/enumToArray.pipes';
import { FillFormFacade } from './fill-form.facade';


@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss'],
  providers: [FillFormFacade, EnumToArrayPipe]
})


export class FillFormComponent implements OnInit {
  validateForm!: FormGroup;
  englishLevel$: Observable<any>
  constructor(private fb: FormBuilder, private fillFormFacade: FillFormFacade) {
    this.englishLevel$ = fillFormFacade.englishLevel$
    fillFormFacade.englishLevel$.subscribe((next) => {
      console.log(next);
    })
  }

  submitForm() {
    console.log(this.validateForm.value)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      skype: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

}


