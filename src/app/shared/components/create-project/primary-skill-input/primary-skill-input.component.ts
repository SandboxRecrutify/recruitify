import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { PrimarySkill } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-primary-skill-input',
  templateUrl: './primary-skill-input.component.html',
  styleUrls: ['./primary-skill-input.component.scss'],
})
export class PrimarySkillInputComponent implements OnInit, OnDestroy {
  @Input()
  primarySkill!: PrimarySkill;
  @Input()
  index!: number;
  @Input()
  primarySkillsValidity$!: Subject<boolean>;

  @Output()
  onPrimarySkillRemove = new EventEmitter<number>();

  @Output()
  onPrimarySkillChange = new EventEmitter<PrimarySkill>();

  isAllDirty = false;
  form!: FormGroup;
  isActive = true;

  private primarySkillsValiditySubscription!: Subscription;
  private formChangesSubscription!: Subscription;

  constructor(private fb: FormBuilder) {}

  remove($event: MouseEvent) {
    $event.stopPropagation();
    this.onPrimarySkillRemove.emit();
  }

  ngOnInit(): void {
    // subscribe to Project create button click
    // and check validity of all primary skills
    this.primarySkillsValiditySubscription =
      this.primarySkillsValidity$.subscribe((validity) => {
        if (!validity) {
          for (const i in this.form.controls) {
            if (this.form.controls.hasOwnProperty(i)) {
              this.form.controls[i].markAsDirty();
              this.form.controls[i].updateValueAndValidity();
            }
          }
        }
      });
    //init form
    this.form = this.fb.group({
      name: [
        this.primarySkill.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      link: [
        this.primarySkill.link,
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        this.primarySkill.description,
        [Validators.required, Validators.maxLength(100)],
      ],
    });

    this.formChangesSubscription = this.form.valueChanges.subscribe(
      (values: PrimarySkill) => {
        //pass data to parent component
        this.onPrimarySkillChange.emit(values);
        // check if all fields are dirty
        let dirtyControlCount = 0;
        for (const i in this.form.controls) {
          if (
            this.form.controls.hasOwnProperty(i) &&
            this.form.controls[i].dirty
          ) {
            dirtyControlCount++;
          }
        }
        this.isAllDirty = dirtyControlCount === 3 ? true : false;
      }
    );
  }

  ngOnDestroy(): void {
    this.primarySkillsValiditySubscription.unsubscribe();
    this.formChangesSubscription.unsubscribe();
  }
}
