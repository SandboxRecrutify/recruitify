import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';

//facades
import { CalendarPageFacade } from './pages/calendar-page/calendar-page.facade';
import { ProfilePageFacade } from './pages/profile-page/profile-page.facade';
import { CandidatesPageFacade } from './pages/candidates-page/candidates-page.facade';
import { ProjectsPageFacade } from './pages/projects-page/projects-page.facade';

//services
import { CandidatesService } from './services/candidates.service';
import { ProjectsService } from './services/projects.service';

//components
import { SharedComponent } from './shared.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { CandidatesPageComponent } from './pages/candidates-page/candidates-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectsListComponent } from './pages/projects-page/projects-list/projects-list.component';
import { ProjectComponent } from './pages/projects-page/project/project.component';
import { ParticipantsComponent } from './pages/projects-page/participants/participants.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { FourOFourComponent } from './pages/four-o-four/four-o-four.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { FilterModalComponent } from './pages/candidates-page/filter-modal/filter-modal.component';

//pipes
import { FilterPipe } from './pipes/filter.pipe';

//nz-modules
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { PrimarySkillInputComponent } from './components/create-project/primary-skill-input/primary-skill-input.component';

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
    FourOFourComponent,
    CalendarPageComponent,
    CandidatesPageComponent,
    FilterModalComponent,
    FilterPipe,
    PrimarySkillInputComponent,
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
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSwitchModule,
    BrowserAnimationsModule,
    NzDropDownModule,
    NzResultModule,
    BrowserAnimationsModule,
    NzDrawerModule,
    NzCollapseModule,
    NzTabsModule,
    NzPopoverModule,
    NzSpaceModule,
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
