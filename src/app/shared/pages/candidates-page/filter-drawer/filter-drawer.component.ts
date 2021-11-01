import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss'],
})
export class FilterDrawerComponent implements OnInit {
  @Input() drawerVisible: any;

  constructor() {}

  // openDrawer(): void {
  //   this.drawerVisible = !this.drawerVisible;
  // }

  closeDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }

  ngOnInit(): void {}
}
