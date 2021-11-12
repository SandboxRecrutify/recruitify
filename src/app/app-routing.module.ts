import { InternshipsComponent } from './shared/pages/internships/internships.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { CalendarPageComponent } from './shared/pages/calendar-page/calendar-page.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth-guard';
import { CandidatesPageComponent } from './shared/pages/candidates-page/candidates-page.component';
import { FourOFourComponent } from './shared/pages/four-o-four/four-o-four.component';
import { ProfilePageComponent } from './shared/pages/profile-page/profile-page.component';
import { ProjectsPageComponent } from './shared/pages/projects-page/projects-page.component';
import { FillFormComponent } from './pages/fill-form-page/fill-form.component';

// consts
import { paths } from './app-routing.constants';
import { AppGuard } from './app-guard';

const mainRouter: Routes = [
  {
    path: paths.login,
    component: LoginPageComponent,
    canActivate: [AuthGuard],
  },
  { path: paths.fillForm, component: FillFormComponent },
  { path: paths.start, component: StartPageComponent },
  { path: paths.internships, component: InternshipsComponent },
  {
    path: paths.projects,
    component: ProjectsPageComponent,
    canActivate: [AppGuard],
  },
  {
    path: `${paths.projects}/:id`,
    component: CandidatesPageComponent,
    canActivate: [AppGuard],
  },
  {
    path: paths.candidates,
    component: CandidatesPageComponent,
    canActivate: [AppGuard],
  },
  {
    path: `${paths.profile}/:id`,
    component: ProfilePageComponent,
    canActivate: [AppGuard],
  },
  {
    path: paths.calendar,
    component: CalendarPageComponent,
    canActivate: [AppGuard],
  },
  {
    path: paths.fof,
    component: FourOFourComponent,
  },
  {
    path: paths.index,
    redirectTo: paths.projects,
    pathMatch: 'full',
  },
  {
    path: paths.rest,
    redirectTo: paths.fof,
  },
];

const routes: Routes = [
  {
    path: paths.index,
    component: MainLayoutComponent,
    children: mainRouter,
  },
  {
    path: paths.shared,
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppGuard, AuthGuard],
})
export class AppRoutingModule {}
