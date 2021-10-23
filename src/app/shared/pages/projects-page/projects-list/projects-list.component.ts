import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/models/Project';
import { ProjectsPageFacade } from '../projects-page.facade';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @Input() cards: Project[] = []


  constructor() { }

  ngOnInit(): void {

  }

}
