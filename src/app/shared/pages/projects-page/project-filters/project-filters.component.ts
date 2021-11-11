import { PrimarySkill } from './../../../models/Project';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateProject } from 'src/app/shared/models/CreateProject';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss'],
})
export class ProjectFiltersComponent implements OnInit {
  @Input()
  isVisible: boolean = false;

  @Output()
  onToggleIsVisible = new EventEmitter<boolean>();

  data: PrimarySkill[] | undefined;
  statuses = [
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Closed',
      value: 'closed',
    },
    {
      name: 'All',
      value: 'all',
    },
  ];
  statusInput: string = 'all';
  primarySkillsInput: string[] = [];
  dateSortInput: string = 'newest';

  constructor(private projectsService: ProjectsService) {}
  primarySkillsChange(values: string[]) {
    this.primarySkillsInput = [...values];
  }
  onClose(): void {
    this.onToggleIsVisible.emit(false);
  }

  onSubmit(): void {
    console.log(this.statusInput, this.primarySkillsInput, this.dateSortInput);
  }

  ngOnInit(): void {
    this.projectsService.getPrimarySkills().subscribe((data) => {
      this.primarySkillsInput = data.map((skill) => skill.id!);
      this.data = data;
    });
  }
}
