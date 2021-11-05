import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-primary-skill-input',
  templateUrl: './primary-skill-input.component.html',
  styleUrls: ['./primary-skill-input.component.scss'],
})
export class PrimarySkillInputComponent implements OnInit {
  @Input()
  form!: FormGroup;
  @Input()
  index!: number;

  @Output()
  onPrimarySkillRemove = new EventEmitter<number>();

  constructor() {}

  remove($event: MouseEvent) {
    $event.stopPropagation();
    this.onPrimarySkillRemove.emit();
  }

  ngOnInit(): void {}
}
