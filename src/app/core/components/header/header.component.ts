import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { AppFacade } from 'src/app/app.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}

  onLogoutBtnClick() {
    this.appFacade.logout();
  }

  ngOnInit(): void {}
}
