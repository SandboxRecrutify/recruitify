import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxesPageComponent } from './sandboxes-page.component';

describe('SandboxesPageComponent', () => {
  let component: SandboxesPageComponent;
  let fixture: ComponentFixture<SandboxesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandboxesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
