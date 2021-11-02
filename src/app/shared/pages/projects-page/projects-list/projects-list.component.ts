import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/models/Project';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @Input() projects: Project[] = []
  @Input() searchText!: string
  @Input() status!: string
  isVisible: boolean = false


  constructor() { }

  ngOnInit(): void {

  }

}
