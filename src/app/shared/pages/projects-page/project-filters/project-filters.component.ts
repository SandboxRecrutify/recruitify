import { PrimarySkill } from './../../../models/Project';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateProject } from 'src/app/shared/models/CreateProject';
import { ProjectsService } from 'src/app/shared/services/projects.service';

export interface ProjectsOrderBy {
  property: string;
  orderBy: 'asc' | 'desc';
}
export interface ProjectsFilters {
  status: string;
  primary: string[];
  orderBy: ProjectsOrderBy
}
@Component({
  selector: 'app-project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss'],
})
export class ProjectFiltersComponent implements OnInit {
  @Input()
  isVisible: boolean = false;

  @Output() onFilters: EventEmitter<ProjectsFilters> =
    new EventEmitter<ProjectsFilters>();

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
  dateSortInput: ProjectsOrderBy = {property: 'startDate', orderBy: 'asc'}

  constructor(private projectsService: ProjectsService) {}
  primarySkillsChange(values: string[]) {
    this.primarySkillsInput = [...values];
  }
  onClose(): void {
    this.onToggleIsVisible.emit(false);
  }

  onSubmit(): void {
    // console.log(this.statusInput, this.primarySkillsInput, this.dateSortInput);

    const ProjectsFilters: ProjectsFilters = {
      status: this.statusInput,
      primary: this.primarySkillsInput,
      orderBy: this.dateSortInput,
    };
    this.onFilters.emit(ProjectsFilters);
    // console.log(ProjectsFilters);
  }

  ngOnInit(): void {
    this.projectsService.getPrimarySkills().subscribe((data) => {
      this.primarySkillsInput = data.map((skill) => skill.id!);
      this.data = data;
    });
  }
}
