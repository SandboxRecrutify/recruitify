import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../facade/facade.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private fc: FacadeService) {}

  ngOnInit(): void {
    console.log(this.fc);
  }
}
