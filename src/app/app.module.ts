import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NzCardModule } from 'ng-zorro-antd/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GeneralModule } from './general/general.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NzCardModule,
    GeneralModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
