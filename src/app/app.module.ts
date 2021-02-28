import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import {AdminModule} from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoaderService } from './shared/loader.service';
import { LoaderInterceptor } from './shared/loader-interceptor.service';
import { LoaderComponent } from './shared/loader/loader.component';

import { SharedService } from './shared/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AdminModule
  ],
  exports: [
    BsDatepickerModule,
    LoaderComponent
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
