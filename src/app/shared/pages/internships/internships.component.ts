import { QueryParams } from './../../services/api.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
})
export class InternshipsComponent implements OnInit {
  activeProjects!: Project[];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects(<QueryParams>{ odata: { status } })
      .subscribe((response) => {
        this.activeProjects = response.filter((project) => project.isActive);
      });
  }

  getProjectDuration(start: string | Date, end: string | Date) {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const diff = endDate.diff(startDate, 'week');
    return diff;
  }

  getNzCollapseTitle(skillName: string) {
    return `Requirements for ${skillName}`;
  }
}
