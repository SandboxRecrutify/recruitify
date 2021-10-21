import { MainLayoutFacade } from './main-layout.facade';
import { Component, OnInit } from '@angular/core';
// import { FacadeService } from '../facade/facade.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  // constructor(private fc: FacadeService) {}
  constructor(private fc: MainLayoutFacade) {}

  ngOnInit(): void {
    console.log(this.fc);
  }
}
