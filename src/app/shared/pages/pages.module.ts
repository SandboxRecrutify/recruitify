import { SandboxesListComponent } from './sandboxes-page/sandboxes-list/sandboxes-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SandboxesPageComponent } from './sandboxes-page/sandboxes-page.component';
import { SandboxComponent } from './sandboxes-page/sandboxes-list/sandbox/sandbox.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    SandboxesPageComponent, SandboxesListComponent, SandboxComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NzButtonModule
  ]
})
export class PagesModule { }
