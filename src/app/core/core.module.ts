import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

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
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
