import { Component, OnInit } from '@angular/core';
import { Project} from '../../models/Project';
import { ProjectsPageFacade } from './projects-page.facade';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = !this.isVisible;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  projects: Project[] = []


  constructor(private projectsPageFacade : ProjectsPageFacade) { }

  ngOnInit(): void {
    this.projectsPageFacade.projectsList$
      .subscribe(response => this.projects = response)
  }
}
