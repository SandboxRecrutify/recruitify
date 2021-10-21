import { Injectable } from '@angular/core';

@Injectable()
export class FacadeService {
  constructor() {}
  isHeaderVisible = true;
  setIsHeaderVisible(isHeaderVisible: boolean) {
    this.isHeaderVisible = isHeaderVisible;
  }
}
