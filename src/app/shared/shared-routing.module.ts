import { SandboxesPageComponent } from './pages/sandboxes-page/sandboxes-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './shared.component';

const routes: Routes = [{ path: '', component: SharedComponent },
{ path: 'sandboxes', component: SandboxesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
