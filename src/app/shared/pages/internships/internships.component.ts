import { Project } from 'src/app/shared/models/Project';
import { ProjectsPageFacade } from './../projects-page/projects-page.facade';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
})
export class InternshipsComponent implements OnInit {
  activeProjects!: Project[];

  constructor(private projectsPageFacade: ProjectsPageFacade) {}

  ngOnInit(): void {
    this.projectsPageFacade.getProjectsList$().subscribe((response) => {
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
