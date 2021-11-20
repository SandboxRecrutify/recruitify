import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsTabsetComponent } from './skills-tabset.component';

describe('SkillsTabsetComponent', () => {
  let component: SkillsTabsetComponent;
  let fixture: ComponentFixture<SkillsTabsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsTabsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsTabsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
