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
import { UserService } from './services/user.service';

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

//pipes
import { SearchPipe } from './pipes/search.pipe';
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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { PrimarySkillInputComponent } from './components/create-project/primary-skill-input/primary-skill-input.component';
import { FilterDrawerComponent } from './pages/candidates-page/filter-drawer/filter-drawer.component';
import { DropdownMenuComponent } from './pages/candidates-page/dropdown-menu/dropdown-menu.component';
import { InternshipsComponent } from './pages/internships/internships.component';
import { CandidatesTableComponent } from './pages/candidates-page/candidates-table/candidates-table.component';
import { ProjectFiltersComponent } from './pages/projects-page/project-filters/project-filters.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TableForInterviewersComponent } from './pages/calendar-page/table-for-interviewers/table-for-interviewers.component';
import { TimeLineComponent } from './pages/calendar-page/time-line/time-line.component';
import { CalendarItemDirective } from './directives/calendar-item.directive';
import { TimeGridItemComponent } from './pages/calendar-page/time-grid-item/time-grid-item.component';
import { TableForStaffComponent } from './pages/calendar-page/table-for-staff/table-for-staff.component';
import { TimeGridRowComponent } from './pages/calendar-page/time-grid-row/time-grid-row.component';
import { CandidatesGridComponent } from './pages/calendar-page/candidates-grid/candidates-grid.component';
import { CandidateService } from './services/candidate.service';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
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
    SearchPipe,
    FilterPipe,
    PrimarySkillInputComponent,
    FilterDrawerComponent,
    DropdownMenuComponent,
    InternshipsComponent,
    CandidatesTableComponent,
    ProjectFiltersComponent,
    TableForInterviewersComponent,
    TimeLineComponent,
    CalendarItemDirective,
    TimeGridItemComponent,
    TableForStaffComponent,
    TimeGridRowComponent,
    CandidatesGridComponent,
  ],
  imports: [
    NzBreadCrumbModule,
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
    NzCheckboxModule,
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
    NzEmptyModule,
    NzTypographyModule,
    NzDividerModule,
    NzRadioModule,
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
    UserService,
    CandidateService,
  ],
})
export class SharedModule {}
