import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from './app-routing.constants';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth-guard';
import { CandidatesPageComponent } from './shared/pages/candidates-page/candidates-page.component';
import { FourOFourComponent } from './shared/pages/four-o-four/four-o-four.component';
import { ProfilePageComponent } from './shared/pages/profile-page/profile-page.component';
import { ProjectsPageComponent } from './shared/pages/projects-page/projects-page.component';

const mainRouter: Routes = [
  { path: paths.login, component: LoginPageComponent },
  {
    path: paths.projects,
    component: ProjectsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: paths.candidates,
    component: CandidatesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: paths.profile,
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: `${paths.profile}/:id`,
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: paths.index,
    redirectTo: paths.projects,
    pathMatch: 'full',
  },
  {
    path: paths.fof,
    component: FourOFourComponent,
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
  providers: [AuthGuard],
})
export class AppRoutingModule {}
