import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from '../pages/pages-routing.module';
import { PagesModule } from '../pages/pages.module';


@NgModule({
  declarations: [
    SharedComponent, RatingStarsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NzRateModule,
    NzIconModule,
    FormsModule,
    PagesModule
  ],
  exports: [RatingStarsComponent]
})
export class SharedModule { }
