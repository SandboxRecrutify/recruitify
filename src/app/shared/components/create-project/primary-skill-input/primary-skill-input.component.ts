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
  onRemovePrimarySkill = new EventEmitter<number>();

  primarySkillsValiditySubscription!: Subscription;
  form!: FormGroup;
  isActive = true;

  constructor(private fb: FormBuilder) {}

  remove($event: MouseEvent) {
    $event.stopPropagation();
    this.onRemovePrimarySkill.emit();
  }

  ngOnInit(): void {
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
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      link: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  ngOnDestroy(): void {
    this.primarySkillsValiditySubscription.unsubscribe();
    // this.primarySkillsValidity$.unsubscribe();
  }
}
