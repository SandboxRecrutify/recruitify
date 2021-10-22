import { pathes } from './app-routing.constants';
import { CandidatesPageComponent } from './shared/pages/candidates-page/candidates-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SandboxesPageComponent } from './shared/pages/sandboxes-page/sandboxes-page.component';

const mainRouter: Routes = [
  { path: pathes.login, component: LoginPageComponent },
  { path: pathes.projects, component: SandboxesPageComponent },
  { path: pathes.candidates, component: CandidatesPageComponent },
];

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: mainRouter,
  },
  {
    path: pathes.shared,
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
