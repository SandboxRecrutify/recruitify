import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { FacadeService } from './facade/facade.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { CandidateService } from './services/candidate.service';

@NgModule({
  declarations: [MainLayoutComponent, LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule,
    FormsModule,
    NzGridModule,
    ReactiveFormsModule,
  ],
  providers: [FacadeService, CandidateService],
})
export class CoreModule {}
