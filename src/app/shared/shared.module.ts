import { CandidatesService } from './services/candidates.service';
import { CandidatesPageFacade } from './pages/candidates-page/candidates-page.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SandboxesPageComponent } from './pages/sandboxes-page/sandboxes-page.component';
import { SandboxesListComponent } from './pages/sandboxes-page/sandboxes-list/sandboxes-list.component';
import { SandboxComponent } from './pages/sandboxes-page/sandbox/sandbox.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ParticipantsComponent } from './pages/sandboxes-page/participants/participants.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ProjectsService } from './services/projects.service';
import { ProjectsPageFacade } from './pages/sandboxes-page/sandboxes-page.facade';

@NgModule({
  declarations: [
    SharedComponent,
    RatingStarsComponent,
    SandboxesPageComponent,
    SandboxesListComponent,
    SandboxComponent,
    ParticipantsComponent,
    CreateProjectComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NzRateModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSwitchModule,
  ],
  exports: [RatingStarsComponent],
  providers: [
    CandidatesService,
    CandidatesPageFacade,
    ProjectsService,
    ProjectsPageFacade,
  ],
})
export class SharedModule {}
