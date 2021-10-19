import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxesListComponent } from './sandboxes-list.component';

describe('SandboxesListComponent', () => {
  let component: SandboxesListComponent;
  let fixture: ComponentFixture<SandboxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandboxesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
