import { Injectable } from '@angular/core';

@Injectable()
export class MainLayoutFacade {
  constructor() {}

  isHeaderVisible = true;
  setIsHeaderVisible(isHeaderVisible: boolean) {
    this.isHeaderVisible = isHeaderVisible;
  }
}
