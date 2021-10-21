import { CandidatesPageComponent } from './pages/candidates-page/candidates-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const mainRouter: Routes = [{ path: 'login', component: LoginPageComponent }];

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
  {
    path: 'candidates',
    component: CandidatesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
