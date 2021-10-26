import { CalendarPageFacade } from './pages/calendar-page/calendar-page.facade';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageFacade } from './pages/profile-page/profile-page.facade';
import { CandidatesService } from './services/candidates.service';
import { CandidatesPageFacade } from './pages/candidates-page/candidates-page.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectsListComponent } from './pages/projects-page/projects-list/projects-list.component';
import { ProjectComponent } from './pages/projects-page/project/project.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ParticipantsComponent } from './pages/projects-page/participants/participants.component';
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
import { ProjectsPageFacade } from './pages/projects-page/projects-page.facade';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';

@NgModule({
  declarations: [
    SharedComponent,
    RatingStarsComponent,
    ProjectsPageComponent,
    ProjectsListComponent,
    ProjectComponent,
    ParticipantsComponent,
    CreateProjectComponent,
    ProfilePageComponent,
    CalendarPageComponent,
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
    BrowserAnimationsModule,
  ],
  exports: [RatingStarsComponent],
  providers: [
    CandidatesService,
    ProfilePageComponent,
    CandidatesPageFacade,
    CalendarPageFacade,
    ProfilePageFacade,
    ProjectsService,
    ProjectsPageFacade,
  ],
})
export class SharedModule {}
