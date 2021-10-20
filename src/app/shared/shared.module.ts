import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { SandboxesPageComponent } from './pages/sandboxes-page/sandboxes-page.component';
import { SandboxesListComponent } from './pages/sandboxes-page/sandboxes-list/sandboxes-list.component';
import { SandboxComponent } from './pages/sandboxes-page/sandbox/sandbox.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ParticipantsComponent } from './pages/sandboxes-page/participants/participants.component';

@NgModule({
  declarations: [
    SharedComponent, RatingStarsComponent, SandboxesPageComponent, SandboxesListComponent, SandboxComponent, ParticipantsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NzRateModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzTabsModule
  ],
  exports: [RatingStarsComponent]
})
export class SharedModule { }
