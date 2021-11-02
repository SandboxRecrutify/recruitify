import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private lsService: LocalStorageService) {}

  onLogoutBtnClick() {
    this.lsService.clear();
    window.location.reload();
  }

  ngOnInit(): void {}
}
