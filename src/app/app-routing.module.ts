import { CandidatesPageComponent } from './pages/candidates-page/candidates-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SandboxesPageComponent } from './shared/pages/sandboxes-page/sandboxes-page.component';

const mainRouter: Routes = [
  { path: 'login', component: LoginPageComponent },

  { path: 'projects', component: SandboxesPageComponent },
  {
    path: 'candidates',
    component: CandidatesPageComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: mainRouter,
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
