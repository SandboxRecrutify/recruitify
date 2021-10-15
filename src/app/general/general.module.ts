import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeneralRoutingModule } from './general-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, GeneralRoutingModule],
})
export class GeneralModule {}
