import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { PagesModule as SharedPagesModule } from './shared/pages/pages.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NzCardModule,
    PagesModule,
    SharedModule,
    FormsModule,
    SharedPagesModule


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
